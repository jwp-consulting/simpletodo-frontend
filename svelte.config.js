import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: [
        preprocess({
            scss: {
                prependData: '@use "src/variables.scss" as *;',
            },
        }),
    ],

    kit: {
        adapter: adapter({
            pages: "build",
            assets: "build",
            fallback: null,
            precompress: false,
        }),

        // hydrate the <div id="svelte"> element in src/app.html
        target: "#svelte",

        vite: {
            css: {
                preprocessorOptions: {
                    scss: {
                        additionalData: '@use "src/variables.scss" as *;',
                    },
                },
            },
            build: {
                target: ["es2020"],
            },
            server: {
                proxy: {
                    "/api": {
                        target: "http://localhost:8000",
                        changeOrigin: true,
                        rewrite: (path) => path.replace(/^\/api/, ""),
                    },
                    "/graphql": {
                        target: "http://localhost:8000",
                        changeOrigin: true,
                    },
                    "/ws": {
                        target: "ws://localhost:8000",
                        ws: true,
                    },
                },
            },
        },
    },
};

export default config;
