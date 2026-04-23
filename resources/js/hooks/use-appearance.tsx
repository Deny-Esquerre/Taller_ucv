import { useSyncExternalStore } from 'react';

export type ResolvedAppearance = 'light' | 'dark';
export type Appearance = ResolvedAppearance | 'system';

export type UseAppearanceReturn = {
    readonly appearance: Appearance;
    readonly accentColor: string;
    readonly resolvedAppearance: ResolvedAppearance;
    readonly updateAppearance: (mode: Appearance) => void;
    readonly updateAccentColor: (color: string) => void;
};

const listeners = new Set<() => void>();
let currentAppearance: Appearance = 'light';
let currentAccentColor: string = '';

const prefersDark = (): boolean => {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const getStoredAppearance = (): Appearance => {
    if (typeof localStorage === 'undefined') return 'light';

    return (localStorage.getItem('appearance') as Appearance) || 'light';
};

const getStoredAccentColor = (): string => {
    if (typeof localStorage === 'undefined') return '';

    return localStorage.getItem('accent_color') || '';
};

const isDarkMode = (appearance: Appearance): boolean => {
    return appearance === 'dark' || (appearance === 'system' && prefersDark());
};

const getContrastColor = (hex: string): string => {
    if (!hex) return '';

    // Remove # if present
    const cleanHex = hex.replace('#', '');
    
    // Parse RGB
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    
    // Calculate brightness (YIQ formula)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    // We set a very high threshold (200) to ensure that all our custom 
    // vibrant colors (#0069c0, #137fd9, #6bbef9, #ff1f8e, #fd439f)
    // always use white text (oklch(0.985 0 0)) instead of dark text.
    return brightness > 200 ? 'oklch(0.145 0 0)' : 'oklch(0.985 0 0)';
};

const applyTheme = (appearance: Appearance, accentColor: string): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const isDark = isDarkMode(appearance);

    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';

    if (accentColor) {
        document.documentElement.style.setProperty('--primary', accentColor);
        document.documentElement.style.setProperty('--accent', accentColor);
        document.documentElement.style.setProperty('--sidebar-accent', accentColor);
        document.documentElement.style.setProperty('--sidebar-primary', accentColor);
        document.documentElement.style.setProperty('--chart-1', accentColor);
        
        const foreground = getContrastColor(accentColor);
        document.documentElement.style.setProperty('--primary-foreground', foreground);
        document.documentElement.style.setProperty('--accent-foreground', foreground);
        document.documentElement.style.setProperty('--sidebar-accent-foreground', foreground);
        document.documentElement.style.setProperty('--sidebar-primary-foreground', foreground);
        
        // Update ring color to match primary
        document.documentElement.style.setProperty('--ring', accentColor);
    } else {
        document.documentElement.style.removeProperty('--primary');
        document.documentElement.style.removeProperty('--accent');
        document.documentElement.style.removeProperty('--sidebar-accent');
        document.documentElement.style.removeProperty('--sidebar-primary');
        document.documentElement.style.removeProperty('--primary-foreground');
        document.documentElement.style.removeProperty('--accent-foreground');
        document.documentElement.style.removeProperty('--sidebar-accent-foreground');
        document.documentElement.style.removeProperty('--sidebar-primary-foreground');
        document.documentElement.style.removeProperty('--ring');
    }
};

const subscribe = (callback: () => void) => {
    listeners.add(callback);

    return () => listeners.delete(callback);
};

const notify = (): void => listeners.forEach((listener) => listener());

const mediaQuery = (): MediaQueryList | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
};

const handleSystemThemeChange = (): void => applyTheme(currentAppearance, currentAccentColor);

export function initializeTheme(): void {
    if (typeof window === 'undefined') {
        return;
    }

    if (!localStorage.getItem('appearance')) {
        localStorage.setItem('appearance', 'system');
        setCookie('appearance', 'system');
    }

    currentAppearance = getStoredAppearance();
    currentAccentColor = getStoredAccentColor();
    applyTheme(currentAppearance, currentAccentColor);

    // Set up system theme change listener
    mediaQuery()?.addEventListener('change', handleSystemThemeChange);
}

export function useAppearance(): UseAppearanceReturn {
    const appearance: Appearance = useSyncExternalStore(
        subscribe,
        () => currentAppearance,
        () => 'system',
    );

    const accentColor: string = useSyncExternalStore(
        subscribe,
        () => currentAccentColor,
        () => '',
    );

    const resolvedAppearance: ResolvedAppearance = isDarkMode(appearance)
        ? 'dark'
        : 'light';

    const updateAppearance = (mode: Appearance): void => {
        currentAppearance = mode;

        // Store in localStorage for client-side persistence...
        localStorage.setItem('appearance', mode);

        // Store in cookie for SSR...
        setCookie('appearance', mode);

        applyTheme(mode, currentAccentColor);
        notify();
    };

    const updateAccentColor = (color: string): void => {
        currentAccentColor = color;

        // Store in localStorage
        localStorage.setItem('accent_color', color);

        // Store in cookie
        setCookie('accent_color', color);

        applyTheme(currentAppearance, color);
        notify();
    };

    return { appearance, accentColor, resolvedAppearance, updateAppearance, updateAccentColor } as const;
}
