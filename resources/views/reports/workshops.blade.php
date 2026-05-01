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
        /* Layout principal */
        .page-content {
            padding: 1.5cm;
        }
        /* Encabezado profesional */
        .header {
            margin-bottom: 30px;
        }
        .header-top {
            background-color: #233559;
            color: white;
            padding: 20px 25px;
            margin: -1.5cm -1.5cm 0 -1.5cm;
            width: calc(100% + 3cm);
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
            background: linear-gradient(90deg, #DC2626 0%, #ef4444 100%);
            margin: 0 -1.5cm;
            width: calc(100% + 3cm);
        }
        .summary-bar {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 10px 15px;
            margin-top: 20px;
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
        /* Tabla principal */
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
            padding: 10px 12px;
            vertical-align: middle;
        }
        table.data tr:nth-child(even) td {
            background-color: #fafbfc;
        }
        .workshop-title {
            font-weight: bold;
            color: #1e293b;
            font-size: 10px;
        }
        .speaker-name {
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
        }
        .status-completed { background-color: #dcfce7; color: #166534; }
        .status-scheduled { background-color: #dbeafe; color: #1e40af; }
        /* Pie de página */
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
    <!-- Encabezado de color institucional -->
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
                        Emitido el {{ $date }} · Documento de Uso Oficial
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
                        <div class="summary-label">Total de Talleres</div>
                        <div class="summary-value">{{ $workshops->count() }}</div>
                    </td>
                    <td class="summary-item">
                        <div class="summary-label">Finalizados</div>
                        <div class="summary-value" style="color: #166534;">{{ $workshops->where('status','completed')->count() }}</div>
                    </td>
                    <td class="summary-item">
                        <div class="summary-label">Programados</div>
                        <div class="summary-value" style="color: #1e40af;">{{ $workshops->where('status','scheduled')->count() }}</div>
                    </td>
                    <td class="summary-item">
                        <div class="summary-label">Presenciales</div>
                        <div class="summary-value">{{ $workshops->where('modality','presencial')->count() }}</div>
                    </td>
                    <td class="summary-item">
                        <div class="summary-label">Virtuales</div>
                        <div class="summary-value">{{ $workshops->where('modality','virtual')->count() }}</div>
                    </td>
                </tr>
            </table>
        </div>

        <!-- Tabla de datos -->
        <table class="data">
            <thead>
                <tr>
                    <th style="width: 14%;">Fecha</th>
                    <th style="width: 44%;">Taller</th>
                    <th style="width: 15%;">Modalidad</th>
                    <th style="width: 12%;">Estado</th>
                </tr>
            </thead>
            <tbody>
                @foreach($workshops as $workshop)
                <tr>
                    <td style="color: #334155; font-weight: 600;">
                        {{ \Carbon\Carbon::parse($workshop->shift_date)->format('d/m/Y') }}
                    </td>
                    <td>
                        <div class="workshop-title">{{ $workshop->title }}</div>
                        <div class="speaker-name">Expositor: {{ $workshop->speaker }}</div>
                    </td>
                    <td style="color: #475569;">{{ ucfirst($workshop->modality) }}</td>
                    <td>
                        <span class="badge {{ $workshop->status === 'completed' ? 'status-completed' : 'status-scheduled' }}">
                            {{ $workshop->status === 'completed' ? 'Finalizado' : 'Programado' }}
                        </span>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <!-- Pie de página fijo -->
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
