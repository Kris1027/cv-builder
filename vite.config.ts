import path from 'path';
import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

const htmlCsp = (): Plugin => ({
    name: 'html-csp',
    transformIndexHtml: {
        order: 'post',
        handler(html) {
            const csp = [
                "default-src 'self'",
                "script-src 'self'",
                "style-src 'self' 'unsafe-inline'",
                "img-src 'self' data: blob:",
                "font-src 'self'",
                "connect-src 'self'",
                "worker-src 'self' blob:",
                "object-src 'none'",
                "base-uri 'self'",
                "form-action 'self'",
            ].join('; ');

            return html.replace(
                '<head>',
                `<head>\n    <meta http-equiv="Content-Security-Policy" content="${csp}">`,
            );
        },
    },
});

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
    plugins: [
        tanstackRouter({
            target: 'react',
            autoCodeSplitting: true,
        }),
        react(),
        tailwindcss(),
        ...(command === 'build' ? [htmlCsp()] : []),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (
                        id.includes('node_modules/motion') ||
                        id.includes('node_modules/framer-motion')
                    ) {
                        return 'motion';
                    }
                    if (id.includes('node_modules/@radix-ui')) {
                        return 'radix';
                    }
                },
            },
        },
    },
}));
