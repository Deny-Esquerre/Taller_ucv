import tailwindcss from '@tailwindcss/vite';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import wayfinder from '@laravel/vite-plugin-wayfinder';
import react from '@vitejs/plugin-react';

export default defineConfig({
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
        // Solo cargar wayfinder si NO estamos en Vercel/Producción
        process.env.NODE_ENV !== 'production' && wayfinder({
            generateOnBuild: false,
        }),
    ].filter(Boolean),
});

// Trigger new deploy
