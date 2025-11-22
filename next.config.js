import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `@use "${path.join(process.cwd(), 'src/styles/variables')}" as *;`,
  },
};

export default nextConfig;
