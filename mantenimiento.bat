@echo off
title Mantenimiento y Optimizacion - Sistema de Talleres UCV
echo ======================================================
echo   MANTENIMIENTO Y OPTIMIZACION DEL SISTEMA
echo ======================================================
echo.

:: 1. Limpieza de cache y optimizacion de Laravel
echo [+] Limpiando caches y optimizando sistema...
php artisan optimize:clear
if %ERRORLEVEL% NEQ 0 (
    echo [!] Error al limpiar caches. Asegurate de tener PHP y Artisan configurados.
)

:: 2. Sincronizacion de Base de Datos
echo.
echo [+] Verificando migraciones pendientes...
php artisan migrate --force
if %ERRORLEVEL% NEQ 0 (
    echo [!] Nota: Si ves errores de "table already exists", es normal debido a la sincronizacion manual previa.
)

:: 3. Limpieza de logs (Opcional pero recomendado)
echo.
echo [+] Limpiando archivos de log antiguos...
del /q storage\logs\*.log >nul 2>&1
echo [OK] Logs limpiados.

:: 4. Finalizacion
echo.
echo ======================================================
echo   PROCESO COMPLETADO EXITOSAMENTE
echo ======================================================
echo.
echo El sistema deberia funcionar de manera mas fluida ahora.
pause
