/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
	reactStrictMode: false,
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
