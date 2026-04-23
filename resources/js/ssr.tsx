import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { createRoot } from 'react-dom/client';
import { HttpException } from '@solidjs/router';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx', { eager: true });

        return pages[`./pages/${name}.tsx`];
    },
});

createServer((page) =>
    createRoot(document.getElementById('app') as HTMLElement, page)
);