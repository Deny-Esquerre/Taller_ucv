<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>403 - Acceso denegado</title>
        <link rel="icon" href="/images/UCV%20Icono%20de%20Navegador.jpeg" type="image/jpeg">
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
                darkMode: 'class',
                theme: {
                    extend: {
                        fontFamily: { sans: ['"Instrument Sans"', 'sans-serif'] },
                        colors: {
                            background: '#09090b',
                            foreground: '#fafafa',
                            muted: '#27272a',
                            'muted-foreground': '#a1a1aa',
                            border: '#27272a',
                            primary: '#DC2626',
                        }
                    }
                }
            }
        </script>
        <style>
            body { background-color: #09090b; }
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-8px); }
            }
            .float-animation { animation: float 3s ease-in-out infinite; }
        </style>
    </head>
    <body class="font-sans antialiased bg-background text-foreground min-h-screen flex items-center justify-center">
        <div class="text-center px-4">
            <div class="float-animation mb-8">
                <div class="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-red-500/10 border border-red-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-red-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                </div>
            </div>

            <h1 class="text-7xl font-bold text-foreground/10 tracking-tighter mb-2">403</h1>
            <h2 class="text-xl font-semibold text-foreground mb-3">Acceso restringido</h2>
            <p class="text-sm text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
                No tienes los permisos necesarios para acceder a esta sección. Si crees que esto es un error, contacta al administrador del sistema.
            </p>

            <div class="flex items-center justify-center gap-3">
                <a href="/dashboard" class="inline-flex items-center gap-2 h-10 px-6 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    Volver al inicio
                </a>
            </div>
        </div>
    </body>
</html>
