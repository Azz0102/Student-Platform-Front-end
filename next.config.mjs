import removeImports from "next-remove-imports";

const nextConfig = removeImports({
    async redirects() {
        return [
            {
                source: "/user",
                destination: "/user/dashboard",
                permanent: true,
            },
        ];
    },
    experimental: {
        esmExternals: "loose",
    },
});

export default nextConfig;
