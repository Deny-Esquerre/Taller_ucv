# 📋 Tablero Scrum - Sistema de Gestión de Talleres

Este tablero refleja el progreso del desarrollo del Sistema de Gestión de Talleres (Laravel 13 + React 19).

---

## 🚀 Épicas (Epics)

- **[E1] Core Workshop Management:** Gestión centralizada de talleres.
- **[E2] Scheduling & Constraints:** Control de fechas, horarios y bloqueos.
- **[E3] Access & Security:** Roles, permisos y administración de usuarios.
- **[E4] Reporting & Data:** Exportaciones e importaciones de datos.
- **[E5] System Automation:** Tareas programadas y comandos de consola.
- **[E6] UX & Appearance:** Interfaz, perfiles y personalización.

---

## 🏃 Sprint Actual: Sprint 1 - MVP & Core Auth (Semanas 1-2)
**Objetivo:** Consolidar la funcionalidad base y el acceso seguro.

### 🔴 To Do
- [ ] **[E6] Tarea 6.3:** Soporte para cambio de Apariencia (Modo Claro/Oscuro) en UI.
- [ ] **[E1] Tarea 1.3:** Refinar Dashboard (Añadir widgets de resumen rápido).

### 🟡 In Progress
- [ ] **[E3] Tarea 3.1:** Implementar Interfaz de Gestión de Permisos Granulares.
- [ ] **[E6] Tarea 6.1:** Mejora de la UI del Perfil de Usuario (React components).

### 🟢 Done
- [x] **[E1] Tarea 1.1:** CRUD completo de Talleres (Backend + UI inicial).
- [x] **[E3] Tarea 3.2:** Lógica de Roles (Middleware `admin`).
- [x] **[E3] Tarea 3.4:** CRUD de Usuarios para Administradores.
- [x] **[E6] Tarea 6.2:** Cambio de Contraseña y Seguridad Base.

---

## 📋 Backlog (Próximos Sprints)

### 📅 Sprint 2: Operaciones Avanzadas & Reportes
- [ ] **[E2] Tarea 2.1:** Bloqueo de Días en Calendario (Prevención de colisiones).
- [ ] **[E1] Tarea 1.4:** Duplicación de Talleres.
- [ ] **[E1] Tarea 1.2:** Historial de Talleres (Vistas de solo lectura).
- [ ] **[E4] Tarea 4.1:** Exportación a PDF (Talleres y Usuarios).
- [ ] **[E4] Tarea 4.3:** Exportación a Excel (Talleres y Usuarios).
- [ ] **[E1] Tarea 1.5:** Marcado manual de "Completado" (Lógica de negocio).

### 🤖 Sprint 3: Automatización & Pulido
- [ ] **[E5] Tarea 5.1:** Comando `SendWorkshopReminders` (Notificaciones).
- [ ] **[E5] Tarea 5.2:** Comando `ImportWorkshops` (Migración de datos).
- [ ] **[E2] Tarea 2.2:** Gestión de Turnos (Mañana, Tarde, Noche) con validaciones.
- [ ] **[E5] Tarea 5.3:** Notificaciones automáticas al bloquear días.
- [ ] **[E1] Tarea 1.6:** Refactorización de Controladores para mayor robustez.

---

## 🛠️ Notas Técnicas
- **Stack:** Laravel 13, React 19, Inertia.js, Tailwind v4.
- **Base de Datos:** SQLite.
- **Componentes:** shadcn/ui.
- **Rutas:** Laravel Wayfinder.

---
*Última actualización: 20 de mayo de 2026*
