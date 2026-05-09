import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../prisma/client'

export async function GET(
  _req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: params.username },
      select: {
        id: true,
        name: true,
        username: true,
        avatar: true,
        bio: true,
        location: true,

        _count: {
          select: {
            followers: true,
            following: true,
          },
        },

        user_favorite_books: {
          take: 3,
          select: {
            id: true,
            rating: true,
            comment: true,
            book: {
              select: {
                id: true,
                title: true,
                cover_url: true,
                slug: true,
              },
            },
          },
        },

        user_favorite_movies: {
          take: 2,
          select: {
            id: true,
            rating: true,
            comment: true,
            movie: {
              select: {
                id: true,
                title: true,
                poster: true,
                slug: true,
              },
            },
          },
        },

        user_favorite_writers: {
          take: 2,
          select: {
            id: true,
            rating: true,
            comment: true,
            writer: {
              select: {
                id: true,
                name: true,
                picture_url: true,
                slug: true,
              },
            },
          },
        },

        user_favorite_directors: {
          take: 1,
          select: {
            id: true,
            rating: true,
            comment: true,
            director: {
              select: {
                id: true,
                name: true,
                picture_url: true,
                slug: true,
              },
            },
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const orbitItems = [
      ...user.user_favorite_books.map((f) => ({
        id: f.id,
        type: 'book' as const,
        title: f.book.title,
        imageUrl: f.book.cover_url ?? null,
        rating: f.rating,
        comment: f.comment,
        slug: f.book.slug,
      })),
      ...user.user_favorite_movies.map((f) => ({
        id: f.id,
        type: 'movie' as const,
        title: f.movie.title,
        imageUrl: f.movie.poster ?? null,
        rating: f.rating,
        comment: f.comment,
        slug: f.movie.slug,
      })),
      ...user.user_favorite_writers.map((f) => ({
        id: f.id,
        type: 'writer' as const,
        title: f.writer.name,
        imageUrl: f.writer.picture_url ?? null,
        rating: f.rating,
        comment: f.comment,
        slug: f.writer.slug,
      })),
      ...user.user_favorite_directors.map((f) => ({
        id: f.id,
        type: 'director' as const,
        title: f.director.name,
        imageUrl: f.director.picture_url ?? null,
        rating: f.rating,
        comment: f.comment,
        slug: f.director.slug,
      })),
    ]

    return NextResponse.json({
      id: user.id,
      name: user.name,
      username: user.username,
      avatar: user.avatar,
      bio: user.bio,
      location: user.location,
      followerCount: user._count.followers,
      followingCount: user._count.following,
      isFollowing: false,
      isOwn: false,
      orbitItems,
    })

  } catch (err) {
    console.error('[GET /api/users/[username]]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
