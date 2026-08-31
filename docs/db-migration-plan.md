# DB Migration Plan: MySQL to AWS PostgreSQL

## 1. Service choice

**Recommendation: Amazon RDS for PostgreSQL.**

- This is a cost-sensitive side project. A `db.t4g.micro` instance with gp3 storage runs about $12-15/month, and a new AWS account gets free credits that cover roughly the first 12 months.
- It is community PostgreSQL, so the Prisma schema stays fully portable and there is no proprietary lock-in.
- The schema is foreign-key heavy (`onDelete: Cascade` relations throughout), which the managed community engine supports directly.

**Alternative: Aurora PostgreSQL Serverless v2.** It auto-scales and can scale to zero when idle, but the always-on floor is around $45/month and there is a resume delay after auto-pause. Choose it only if traffic is very spiky and mostly idle.

**Rejected: Aurora DSQL.** It does not support foreign-key constraints, and this schema depends on them.

## 2. Migration approach

This is an engine change (MySQL to PostgreSQL). However, Prisma abstracts the schema and the codebase contains no raw SQL queries (verified by grep for `queryRaw` / `executeRaw`). That means AWS Schema Conversion Tool (SCT) and Database Migration Service (DMS) are unnecessary overhead here. Use a Prisma-native migration instead.

### Phase A: Move to PostgreSQL locally first (no AWS yet) — DONE

Delivered on branch `SCRUM-25`.

1. Create a new branch.
2. Update `docker/docker-compose.yaml` to run `postgres:16` instead of (or alongside) the MySQL service.
3. In `prisma/schema.prisma`, change the datasource: `provider = "postgresql"`.
4. Delete the `prisma/migrations/` directory. Every existing migration contains MySQL-specific DDL; you will regenerate a single clean initial migration.
5. Apply the small schema fixes required for PostgreSQL:
   - `User` model: change `@@map("user")` to `@@map("users")`. `user` is a reserved word in PostgreSQL and only works when quoted. Update all references to the table name (`src/app/Context/authProvider.tsx`, API routes, `prisma/seed.ts`).
   - `Podcast.min_price`: currently `Decimal` with no precision. Add an explicit `@db.Decimal(10, 2)` so PostgreSQL does not default to `Decimal(65, 30)`.
   - Everything else maps cleanly: `@db.VarChar`, `@db.Text`, `DateTime`, `Boolean`, `@default(autoincrement())`, `@updatedAt`.
6. Run `npx prisma migrate dev --name init`, then `npx prisma generate`, then `npx prisma db seed`.
7. Run the app against local PostgreSQL and fix anything that breaks. Commit.

Also done during Phase A:

- `src/app/api/search/route.ts`: added `mode: "insensitive"` to the `contains` filters. PostgreSQL `LIKE` is case-sensitive; the previous MySQL collation was not.
- `prisma/seed.ts`: after seeding, realign the identity sequences. The seed inserts rows with explicit `id` values, which leaves each table's sequence at its initial value; on PostgreSQL the next auto-generated id then collides with seeded rows and the first real signup fails. The seed now runs `setval(pg_get_serial_sequence(...), MAX(id))` for every affected table.

Two pre-existing bugs were found and left untouched (they exist on `main`, unrelated to the engine change): `src/app/api/user/route.ts` uses `prisma.userFavoriteBook` (should be `userFavoriteBooks`), and `searchResult/SearchResult.tsx` renders `<BookSection/>` without its required `books` prop.

### Phase B: Move the data — SKIPPED

Verified against the running MySQL container before deciding:

- **Static / seed content** (Book, Movie, Writer, Director, Host, Podcast, Genre, and their join tables) is fully reproduced by `npx prisma db seed` — the seed files are the source of truth, nothing to copy from MySQL.
- **Favorites**: MySQL held 12 book / 12 movie / 11 writer favorites, which is exactly what the seed inserts. No runtime-created favorites, no follows.
- **Users**: MySQL had 5 rows — the 3 demo users from the seed plus 2 genuine signups (`johndoe`, `norana`) with real bcrypt hashes.

The only data not covered by the seed was those 2 user accounts. The decision was to **not migrate them** — re-register any account that is still wanted. No migration script, `pgloader` run, or manual copy was performed.

If a real production MySQL database with meaningful user data appears later, revisit this: copy the dynamic tables (User, UserFavoriteBooks, UserFavoriteMovies, UserFavoriteWriters, UserFavoriteDirectors, UserFavoritePodcasts, Follow) with a two-client Node script or `pgloader`, in foreign-key order, preserving IDs, then re-run the sequence realignment.

### Phase C: Provision RDS and cut over — TODO

1. Provision the RDS PostgreSQL instance (settings in section 3).
2. Update `.env`: `DATABASE_URL="postgresql://USER:PASS@ENDPOINT:5432/kabooki?sslmode=require"`.
3. Run `npx prisma migrate deploy`, then `npx prisma db seed`. There is no separate user data to load (Phase B was skipped).
4. Smoke test the app against RDS.
5. Cut the app over. Keep the MySQL container and a dump until the new database is proven.

## 3. RDS provisioning settings

First check the latest available major version:

```bash
aws rds describe-db-engine-versions --engine postgres \
  --query "DBEngineVersions[].EngineVersion"
```

Provision with production-sane defaults:

- Engine `postgres`, latest major version, instance class `db.t4g.micro`.
- `--storage-type gp3 --allocated-storage 20`.
- `--storage-encrypted` with a customer-managed KMS key.
- `--manage-master-user-password` (stores and rotates the password in Secrets Manager). Use a custom `--master-username`, not `postgres`.
- `--backup-retention-period 7`.
- `--enable-performance-insights --performance-insights-retention-period 7`.
- `--deletion-protection`.
- `--enable-cloudwatch-logs-exports '["postgresql"]'`.
- Custom parameter group with `rds.force_ssl=1` to enforce TLS.
- Network: the correct choice is `--no-publicly-accessible`, reaching the database through SSM port forwarding, a bastion host, or a VPN. The pragmatic choice for a solo developer is publicly accessible with a security group locked to your own IP address only, never `0.0.0.0/0`.
- Multi-AZ: skip it for a side project (it roughly doubles the cost). Enable it if uptime becomes important.

### Connection pooling note

Next.js server components combined with a `db.t4g.micro` instance (around 100 max connections) can exhaust the connection pool. Mitigate by setting `?connection_limit=5` in `DATABASE_URL`, or add RDS Proxy or PgBouncer if you hit "too many connections" errors.
