/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
        removeConsole: true,
    },
    images: {
        domains: ['varun-next-ecommerce.s3.amazonaws.com'], // Add your S3 domain here
    },
};

export default nextConfig;
