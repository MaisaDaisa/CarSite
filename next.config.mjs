/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["firebasestorage.googleapis.com"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "geoauto.netlify.app",
			},
		],
	},

	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
	reactStrictMode: false,
};

export default nextConfig;
