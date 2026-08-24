"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Box, Button, Callout, Container, Flex, Heading, Text, TextField } from "@radix-ui/themes";

const SignupPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const signupResponse = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password }),
      });

      const signupData = await signupResponse.json();

      if (!signupResponse.ok) {
        setError(signupData.error ?? "Something went wrong");
        return;
      }

      const loginResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!loginResponse.ok) {
        router.push("/login");
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
          Create an account
        </Heading>
        <Text as="p" size="2" color="gray" mb="5">
          Join to start tracking your favorite books and movies.
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
                Name
              </Text>
              <TextField.Root
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                required
              />
            </label>

            <label>
              <Text as="div" size="2" weight="medium" mb="1">
                Username
              </Text>
              <TextField.Root
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="jane.doe"
                required
              />
            </label>

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
                placeholder="At least 8 characters"
                required
              />
            </label>

            <label>
              <Text as="div" size="2" weight="medium" mb="1">
                Confirm password
              </Text>
              <TextField.Root
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </label>

            <Button type="submit" size="3" mt="2" disabled={loading} style={{ cursor: "pointer" }}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </Flex>
        </form>

        <Text as="p" size="2" color="gray" mt="4" align="center">
          Already have an account? <Link href="/login">Log in</Link>
        </Text>
      </Box>
    </Container>
  );
};

export default SignupPage;
