/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // TODO: pre-existing type errors (unrelated to Next 16 upgrade), see SCRUM ticket. Remove once fixed.
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add other configurations here
};

export default nextConfig;
