"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Box, Button, Callout, Container, Flex, Heading, Text, TextField } from "@radix-ui/themes";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="1" className="py-16">
      <Box className="mx-auto max-w-[400px] rounded-2xl border p-6 shadow-sm">
        <Heading as="h1" size="6" mb="1">
          Log in
        </Heading>
        <Text as="p" size="2" color="gray" mb="5">
          Welcome back. Enter your details to continue.
        </Text>

        {error && (
          <Callout.Root color="red" mb="4">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" weight="medium" mb="1">
                Email
              </Text>
              <TextField.Root
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>

            <label>
              <Text as="div" size="2" weight="medium" mb="1">
                Password
              </Text>
              <TextField.Root
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </label>

            <Button type="submit" size="3" mt="2" disabled={loading} style={{ cursor: "pointer" }}>
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </Flex>
        </form>

        <Text as="p" size="2" color="gray" mt="4" align="center">
          Don&apos;t have an account? <Link href="/signup">Sign up</Link>
        </Text>
      </Box>
    </Container>
  );
};

export default LoginPage;
