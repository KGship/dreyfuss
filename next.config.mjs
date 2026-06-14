/** @type {import('next').NextConfig} */
const nextConfig = {
  // The design_handoff folder is reference-only; never compile it.
  pageExtensions: ["ts", "tsx", "js", "jsx"],
};

export default nextConfig;
