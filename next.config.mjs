/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "raw.githubusercontent.com",
      "openweathermap.org",
      "fakestoreapi.com",
      "via.placeholder.com",
    ],
  },
};

export default nextConfig;
