/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Optimisations modernes
  images: {
    domains: ["res.cloudinary.com", "upload.wikimedia.org"], // ajoute tes sources d’images autorisées
    formats: ["image/avif", "image/webp"], // formats plus légers
  },

  experimental: {
    // ✅ active les nouvelles features expérimentales utiles
    optimizePackageImports: ["zustand"],  // optimise les imports de libs
  }
};

module.exports = nextConfig;
