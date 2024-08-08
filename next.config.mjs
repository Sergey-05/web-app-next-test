/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        ppr: 'incremental',
    },
    reactStrictMode: true,
    swcMinify: true,
    output: 'export',
};

export default nextConfig;
