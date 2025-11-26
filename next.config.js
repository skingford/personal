import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `@use "src/styles/variables" as *;`,
  },
};

export default withNextIntl(nextConfig);
