/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack(config) {
      config.module.rules.push({
        test: /\.afm$/,
        type: "asset/resource",
        generator: {
          filename: "static/fonts/[name][ext]",
        },
      });
      return config;
    },
  };
  
  export default nextConfig; // Use export default em vez de module.exports