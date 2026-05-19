# Laravel + React (Inertia) Starter Kit

Este proyecto es una aplicación de gestión de talleres construida con Laravel 13, React 19, TypeScript y Tailwind CSS. Utiliza Inertia.js para conectar el frontend y el backend sin necesidad de una API REST tradicional.

## Tecnologías Principales

- **Backend:** Laravel 13 (PHP 8.3+)
- **Frontend:** React 19, TypeScript, Inertia.js
- **Estilos:** Tailwind CSS v4, shadcn/ui, Radix UI
- **Autenticación:** Laravel Fortify
- **Base de Datos:** SQLite (por defecto en local)
- **Herramientas de Construcción:** Vite 8

## Estructura del Proyecto

- `app/Http/Controllers`: Controladores que manejan la lógica de negocio y devuelven respuestas de Inertia.
- `app/Models`: Modelos Eloquent (`User`, `Workshop`, `BlockedDay`, `Permission`).
- `resources/js/pages`: Componentes React que actúan como páginas (rutas de frontend).
- `resources/js/components`: Componentes reutilizables de UI (incluyendo shadcn/ui).
- `routes/web.php`: Definición de rutas principales.
- `database/migrations`: Estructura de la base de datos.

## Comandos Clave

### Desarrollo
```bash
# Iniciar servidor de desarrollo (PHP + Vite + Queue + Logs)
composer dev

# Servidor de Vite únicamente
npm run dev

# Servidor de PHP únicamente
php artisan serve
```

### Construcción
```bash
# Compilar para producción
npm run build

# Compilar para producción con SSR
npm run build:ssr
```

### Base de Datos
```bash
# Ejecutar migraciones
php artisan migrate

# Poblar base de datos con seeders
php artisan db:seed
```

### Calidad de Código
```bash
# Formatear código PHP (Laravel Pint)
composer lint

# Formatear código JS/TS (Prettier)
npm run format

# Ejecutar tests
composer test
```

## Convenciones de Desarrollo

- **Inertia.js:** Utiliza `Inertia::render('Path/To/Page')` en controladores y `usePage()` o props en React para acceder a los datos.
- **TypeScript:** Tipado estricto en el frontend. Definiciones en `resources/js/types`.
- **Estilos:** Prioriza el uso de clases utilitarias de Tailwind CSS y componentes de `shadcn/ui`.
- **Rutas:** Las rutas de React están vinculadas 1:1 con las rutas de Laravel en `web.php` mediante el plugin `@laravel/vite-plugin-wayfinder`.
- **Idioma:** La aplicación está configurada en español (`lang/es`).

## Gestión de Talleres

El sistema permite:
- Gestionar usuarios y roles (Admin/User).
- Crear, editar, duplicar y eliminar talleres (`Workshops`).
- Marcar días bloqueados para evitar programaciones conflictivas.
- Exportar reportes de talleres y usuarios a PDF (DomPDF) y Excel (PhpSpreadsheet).
- Sistema de permisos granulares para roles.
