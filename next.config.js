/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/opportunities",
        destination: "http://168.138.150.34:8000/opportunities",
      },
      {
        source: "/nba-api/:path*",
        destination: "http://168.138.150.34:8001/:path*",
      },
      {
        source: "/mlb-api/:path*",
        destination: "http://168.138.150.34:8001/:path*",
      },
      {
        source: "/nfl-api/:path*",
        destination: "http://168.138.150.34:8001/:path*",
      },
      {
        source: "/nhl-api/:path*",
        destination: "http://168.138.150.34:8001/:path*",
      },
    ];
  },
};
module.exports = nextConfig;
