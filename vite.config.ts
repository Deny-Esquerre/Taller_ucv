import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import wayfinder from '@laravel/vite-plugin-wayfinder';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        reactRouter({
            ssr: true,
            tsconfig: true,
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        // Solo cargar wayfinder si NO estamos en Vercel/Producción
        process.env.NODE_ENV !== 'production' && wayfinder({
            generateOnBuild: false,
        }),
    ].filter(Boolean),
});
