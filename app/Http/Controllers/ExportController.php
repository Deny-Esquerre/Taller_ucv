<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Workshop;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ExportController extends Controller
{
    public function exportWorkshopsPdf()
    {
        $workshops = Workshop::with('user')->orderBy('shift_date', 'desc')->get();
        $date = Carbon::now()->format('d/m/Y H:i');
        
        $pdf = Pdf::loadView('reports.workshops', [
            'workshops' => $workshops,
            'date' => $date,
            'title' => 'Reporte General de Talleres'
        ]);

        return $pdf->download('reporte_talleres_' . Carbon::now()->format('Ymd_His') . '.pdf');
    }

    public function exportUsersPdf()
    {
        $users = User::orderBy('name')->get();
        $date = Carbon::now()->format('d/m/Y H:i');

        $pdf = Pdf::loadView('reports.users', [
            'users' => $users,
            'date' => $date,
            'title' => 'Reporte General de Usuarios'
        ]);

        return $pdf->download('reporte_usuarios_' . Carbon::now()->format('Ymd_His') . '.pdf');
    }

    public function exportWorkshopsExcel()
    {
        $workshops = Workshop::with('user')->orderBy('shift_date', 'desc')->get();
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Talleres UCV');

        // 1. Encabezado Institucional (Título)
        $sheet->setCellValue('A1', 'SISTEMA DE GESTIÓN DE TALLERES UCV');
        $sheet->mergeCells('A1:F1');
        $sheet->getStyle('A1')->applyFromArray([
            'font' => ['bold' => true, 'size' => 16, 'color' => ['rgb' => 'FFFFFF']],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '233559']]
        ]);

        $sheet->setCellValue('A2', 'Reporte Generado: ' . Carbon::now()->format('d/m/Y H:i'));
        $sheet->mergeCells('A2:F2');
        $sheet->getStyle('A2')->applyFromArray([
            'font' => ['italic' => true, 'size' => 10, 'color' => ['rgb' => '666666']],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER]
        ]);

        // 2. Encabezados de Tabla
        $headers = ['Título del Taller', 'Expositor', 'Fecha', 'Turno', 'Modalidad', 'Estado'];
        $column = 'A';
        foreach ($headers as $header) {
            $sheet->setCellValue($column . '4', $header);
            $column++;
        }

        // Estilo Encabezados Tabla
        $sheet->getStyle('A4:F4')->applyFromArray([
            'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => 'DC2626']],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_LEFT]
        ]);

        // 3. Datos
        $row = 5;
        foreach ($workshops as $workshop) {
            $sheet->setCellValue('A' . $row, $workshop->title);
            $sheet->setCellValue('B' . $row, $workshop->speaker);
            $sheet->setCellValue('C' . $row, Carbon::parse($workshop->shift_date)->format('d/m/Y'));
            $sheet->setCellValue('D' . $row, ucfirst($workshop->shift_type));
            $sheet->setCellValue('E' . $row, ucfirst($workshop->modality));
            $sheet->setCellValue('F' . $row, ucfirst($workshop->status));

            // Cebra (Zebra striping)
            if ($row % 2 == 0) {
                $sheet->getStyle('A' . $row . ':F' . $row)->getFill()
                    ->setFillType(Fill::FILL_SOLID)
                    ->getStartColor()->setRGB('F8FAFC');
            }
            $row++;
        }

        // 4. Auto-ajuste de columnas y bordes
        foreach (range('A', 'F') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        $sheet->getStyle('A4:F' . ($row - 1))->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);

        $writer = new Xlsx($spreadsheet);
        $fileName = 'reporte_talleres_' . Carbon::now()->format('Ymd_His') . '.xlsx';

        return new StreamedResponse(function() use ($writer) {
            $writer->save('php://output');
        }, 200, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition' => 'attachment; filename="' . $fileName . '"',
        ]);
    }

    public function exportUsersExcel()
    {
        $users = User::orderBy('name')->get();
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Usuarios UCV');

        // 1. Encabezado Institucional
        $sheet->setCellValue('A1', 'SISTEMA DE GESTIÓN DE TALLERES UCV - PADRÓN DE USUARIOS');
        $sheet->mergeCells('A1:D1');
        $sheet->getStyle('A1')->applyFromArray([
            'font' => ['bold' => true, 'size' => 16, 'color' => ['rgb' => 'FFFFFF']],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '233559']]
        ]);

        $sheet->setCellValue('A2', 'Generado: ' . Carbon::now()->format('d/m/Y H:i'));
        $sheet->mergeCells('A2:D2');
        $sheet->getStyle('A2')->applyFromArray([
            'font' => ['italic' => true, 'size' => 10, 'color' => ['rgb' => '666666']],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER]
        ]);

        // 2. Encabezados de Tabla
        $sheet->setCellValue('A4', 'Nombre Completo');
        $sheet->setCellValue('B4', 'Correo Electrónico');
        $sheet->setCellValue('C4', 'Rol en Sistema');
        $sheet->setCellValue('D4', 'Fecha de Registro');

        $sheet->getStyle('A4:D4')->applyFromArray([
            'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => 'DC2626']],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_LEFT]
        ]);

        // 3. Datos
        $row = 5;
        foreach ($users as $user) {
            $sheet->setCellValue('A' . $row, $user->name);
            $sheet->setCellValue('B' . $row, $user->email);
            $sheet->setCellValue('C' . $row, $user->is_admin ? 'Administrador' : 'Docente / Usuario');
            $sheet->setCellValue('D' . $row, $user->created_at->format('d/m/Y H:i'));

            if ($row % 2 == 0) {
                $sheet->getStyle('A' . $row . ':D' . $row)->getFill()
                    ->setFillType(Fill::FILL_SOLID)
                    ->getStartColor()->setRGB('F8FAFC');
            }
            $row++;
        }

        // 4. Auto-ajuste
        foreach (range('A', 'D') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        $sheet->getStyle('A4:D' . ($row - 1))->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);

        $writer = new Xlsx($spreadsheet);
        $fileName = 'reporte_usuarios_' . Carbon::now()->format('Ymd_His') . '.xlsx';

        return new StreamedResponse(function() use ($writer) {
            $writer->save('php://output');
        }, 200, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition' => 'attachment; filename="' . $fileName . '"',
        ]);
    }
}
