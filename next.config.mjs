/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["firebasestorage.googleapis.com"],
	},

	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
	reactStrictMode: false,
};

export default nextConfig;
