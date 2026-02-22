import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                pathname: '**',
            },
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'res.cloudinary.com' } // Assuming your backend uses Cloudinary
        ],
        unoptimized: true,
    },
};

export default nextConfig;