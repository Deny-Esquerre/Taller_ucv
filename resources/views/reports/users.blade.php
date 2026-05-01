<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ $title }}</title>
    <style>
        @page {
            margin: 0cm;
        }
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            font-size: 10px;
            color: #1a202c;
            line-height: 1.5;
            margin: 0;
            padding: 0;
        }
        /* Encabezado profesional */
        .header-top {
            background-color: #233559;
            color: white;
            padding: 20px 1.5cm;
        }
        .header-top table {
            width: 100%;
        }
        .logo-text {
            font-size: 26px;
            font-weight: 900;
            color: #ffffff;
            letter-spacing: -0.5px;
        }
        .logo-text span {
            color: #fca5a5;
        }
        .tagline {
            font-size: 9px;
            color: rgba(255,255,255,0.6);
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-top: 2px;
        }
        .report-info {
            text-align: right;
        }
        .report-badge {
            display: inline-block;
            background-color: rgba(255,255,255,0.15);
            border: 1px solid rgba(255,255,255,0.3);
            color: white;
            font-size: 14px;
            font-weight: bold;
            padding: 6px 14px;
            border-radius: 4px;
        }
        .report-meta {
            font-size: 8px;
            color: rgba(255,255,255,0.6);
            margin-top: 6px;
        }
        .header-separator {
            height: 4px;
            background-color: #DC2626;
        }
        .page-content {
            padding: 20px 1.5cm 2cm 1.5cm;
        }
        .summary-bar {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 10px 15px;
            margin-bottom: 20px;
        }
        .summary-bar table {
            width: 100%;
        }
        .summary-item {
            text-align: center;
        }
        .summary-label {
            font-size: 8px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .summary-value {
            font-size: 16px;
            font-weight: bold;
            color: #233559;
        }
        table.data {
            width: 100%;
            border-collapse: collapse;
        }
        table.data th {
            background-color: #233559;
            color: rgba(255,255,255,0.9);
            text-align: left;
            padding: 10px 12px;
            text-transform: uppercase;
            font-size: 8px;
            font-weight: bold;
            letter-spacing: 0.8px;
        }
        table.data td {
            border-bottom: 1px solid #f1f5f9;
            padding: 11px 12px;
            vertical-align: middle;
        }
        table.data tr:nth-child(even) td {
            background-color: #fafbfc;
        }
        .user-name {
            font-weight: bold;
            color: #1e293b;
            font-size: 10px;
        }
        .user-email {
            color: #64748b;
            font-size: 8px;
            margin-top: 2px;
        }
        .badge {
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 7px;
            font-weight: bold;
            text-transform: uppercase;
            display: inline-block;
            background-color: #f1f5f9;
            color: #475569;
        }
        .role-admin { background-color: #fee2e2; color: #991b1b; }
        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: #f8fafc;
            border-top: 2px solid #233559;
            padding: 8px 1.5cm;
            font-size: 8px;
            color: #64748b;
        }
        .footer table {
            width: 100%;
        }
        .page-number:before {
            content: "Página " counter(page) " de " counter(pages);
        }
    </style>
</head>
<body>
    <div class="header-top">
        <table>
            <tr>
                <td>
                    <div class="logo-text">Talleres <span>UCV</span></div>
                    <div class="tagline">Universidad César Vallejo · Sistema de Gestión Académica</div>
                </td>
                <td class="report-info">
                    <div class="report-badge">{{ $title }}</div>
                    <div class="report-meta">
                        Emitido el {{ $date }} · Padrón Oficial de Usuarios
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div class="header-separator"></div>

    <div class="page-content">
        <!-- Barra de resumen -->
        <div class="summary-bar">
            <table>
                <tr>
                    <td class="summary-item">
                        <div class="summary-label">Total de Usuarios</div>
                        <div class="summary-value">{{ $users->count() }}</div>
                    </td>
                    <td class="summary-item">
                        <div class="summary-label">Administradores</div>
                        <div class="summary-value" style="color: #991b1b;">{{ $users->where('is_admin', true)->count() }}</div>
                    </td>
                    <td class="summary-item">
                        <div class="summary-label">Docentes</div>
                        <div class="summary-value" style="color: #233559;">{{ $users->where('is_admin', false)->count() }}</div>
                    </td>
                </tr>
            </table>
        </div>

        <table class="data">
            <thead>
                <tr>
                    <th style="width: 45%;">Información del Usuario</th>
                    <th style="width: 25%;">Rol en el Sistema</th>
                    <th style="width: 30%;">Fecha de Registro</th>
                </tr>
            </thead>
            <tbody>
                @foreach($users as $user)
                <tr>
                    <td>
                        <div class="user-name">{{ $user->name }}</div>
                        <div class="user-email">{{ $user->email }}</div>
                    </td>
                    <td>
                        <span class="badge {{ $user->is_admin ? 'role-admin' : '' }}">
                            {{ $user->is_admin ? 'Administrador' : 'Docente / Usuario' }}
                        </span>
                    </td>
                    <td style="color: #475569; font-weight: 500;">
                        {{ $user->created_at->format('d/m/Y') }}
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="footer">
        <table>
            <tr>
                <td style="text-align: left;">© {{ date('Y') }} Universidad César Vallejo — Todos los derechos reservados</td>
                <td style="text-align: center;" class="page-number"></td>
                <td style="text-align: right;">Plataforma de Talleres Académicos v2.0</td>
            </tr>
        </table>
    </div>
</body>
</html>
