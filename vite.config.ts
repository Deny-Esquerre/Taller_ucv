import tailwindcss from '@tailwindcss/vite';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(async () => {
    let wayfinder = null;
    if (process.env.NODE_ENV !== 'production') {
        const { wayfinder: wf } = await import('@laravel/vite-plugin-wayfinder');
        wayfinder = wf;
    }

    return {
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.tsx'],
                ssr: 'resources/js/ssr.tsx',
                refresh: true,
            }),
            react({
                babel: {
                    plugins: ['babel-plugin-react-compiler'],
                },
            }),
            tailwindcss(),
            wayfinder && wayfinder({
                generateOnBuild: false,
            }),
        ].filter(Boolean),
    };
});

// Trigger new deploy
