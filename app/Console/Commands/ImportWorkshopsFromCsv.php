<?php

namespace App\Console\Commands;

use App\Models\Workshop;
use App\Models\User;
use Illuminate\Console\Command;

class ImportWorkshopsFromCsv extends Command
{
    protected $signature = 'workshops:import-csv {file? : Path to CSV file}';
    protected $description = 'Import workshops from CSV file';

    public function handle()
    {
        $file = $this->argument('file') ?? 'talleres_empleabilidad.csv';
        
        if (!file_exists($file)) {
            $this->error("File not found: {$file}");
            return 1;
        }

        $handle = fopen($file, 'r');
        $headers = fgetcsv($handle);
        
        $admin = User::where('role', 'admin')->first();
        if (!$admin) {
            $this->error('No admin user found');
            return 1;
        }

        $imported = 0;
        $skipped = 0;
        $rowNumber = 1;

        while (($row = fgetcsv($handle)) !== false) {
            $rowNumber++;
            
            $data = array_combine($headers, $row);
            
            $title = $data['Título del taller'] ?? null;
            if (empty($title)) {
                $skipped++;
                continue;
            }

            try {
                $dateStr = $data['Fecha del taller'] ?? null;
                $date = $this->parseDate($dateStr);
                
                if (!$date) {
                    $this->warn("Row $rowNumber: Invalid date '{$dateStr}', skipping");
                    continue;
                }

                $shiftType = $this->parseShift($data['Turno'] ?? '');
                $time = $this->parseTime($data['Hora'] ?? '');
                $modality = $this->parseModality($data['Ubicación / Link virtual'] ?? '');
                
                $speaker = $data['Nombre del ponente'] ?? null;
                if ($speaker && str_starts_with($speaker, 'Psi. ')) {
                    $speaker = substr($speaker, 4);
                }

                Workshop::create([
                    'user_id' => $admin->id,
                    'title' => $title,
                    'shift_date' => $date,
                    'shift_type' => $shiftType,
                    'shift_time' => $time,
                    'representative' => $data['Responsable'] ?? $admin->name,
                    'email' => $data['Email del responsable'] ?? $admin->email,
                    'modality' => $modality,
                    'meeting_link' => $modality === 'virtual' ? $data['Ubicación / Link virtual'] : null,
                    'location' => $modality === 'presencial' ? $data['Ubicación / Link virtual'] : null,
                    'year' => 2026,
                    'brand' => $data['Empresa / Marca'] ?? null,
                    'contact_name' => $data['Responsable'] ?? null,
                    'contact_position' => $data['Cargo del contacto'] ?? null,
                    'contact_email_b' => $data['Email del responsable'] ?? null,
                    'contact_phone' => $data['Teléfono'] ? (string)$data['Teléfono'] : null,
                    'speaker' => $speaker,
                    'speaker_linkedin' => $data['LinkedIn del ponente'] ?? null,
                    'status' => 'scheduled',
                ]);

                $imported++;
                $this->line("Imported: {$title} - {$date}");
            } catch (\Exception $e) {
                $this->warn("Row {$rowNumber}: " . $e->getMessage());
            }
        }

        fclose($handle);
        
        $this->info("Import completed: {$imported} imported, {$skipped} skipped");
        return 0;
    }

    private function parseDate($value)
    {
        if (!$value || $value === '') return null;
        
        $value = trim($value);
        
        if (preg_match('/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/', $value, $matches)) {
            return sprintf('%04d-%02d-%02d', $matches[3], $matches[2], $matches[1]);
        }
        
        $value = strtoupper($value);
        
        $months = [
            'ENERO' => '01', 'FEBRERO' => '02', 'MARZO' => '03', 'ABRIL' => '04',
            'MAYO' => '05', 'JUNIO' => '06', 'JULIO' => '07', 'AGOSTO' => '08',
            'SEPTIEMBRE' => '09', 'OCTUBRE' => '10', 'NOVIEMBRE' => '11', 'DICIEMBRE' => '12'
        ];
        
        foreach ($months as $monthName => $monthNum) {
            if (preg_match('/(\d{1,2})\s*DE\s*' . $monthName . '/', $value, $matches)) {
                return "2026-{$monthNum}-" . str_pad($matches[1], 2, '0', STR_PAD_LEFT);
            }
        }
        
        if (preg_match('/LUNES\s*(\d{1,2})/i', $value, $m)) return "2026-05-" . str_pad($m[1], 2, '0', STR_PAD_LEFT);
        if (preg_match('/MARTES\s*(\d{1,2})/i', $value, $m)) return "2026-05-" . str_pad($m[1], 2, '0', STR_PAD_LEFT);
        if (preg_match('/MIERCOLES\s*(\d{1,2})/i', $value, $m)) return "2026-05-" . str_pad($m[1], 2, '0', STR_PAD_LEFT);
        if (preg_match('/JUEVES\s*(\d{1,2})/i', $value, $m)) return "2026-05-" . str_pad($m[1], 2, '0', STR_PAD_LEFT);
        if (preg_match('/VIERNES\s*(\d{1,2})/i', $value, $m)) return "2026-05-" . str_pad($m[1], 2, '0', STR_PAD_LEFT);
        if (preg_match('/SABADO\s*(\d{1,2})/i', $value, $m)) return "2026-05-" . str_pad($m[1], 2, '0', STR_PAD_LEFT);
        if (preg_match('/DOMINGO\s*(\d{1,2})/i', $value, $m)) return "2026-05-" . str_pad($m[1], 2, '0', STR_PAD_LEFT);
        
        return null;
    }

    private function parseShift($value)
    {
        if (!$value) return 'morning';
        
        $value = strtolower(trim($value));
        if (str_contains($value, 'mañana') || str_contains($value, 'manana') || $value === 'mañana') return 'morning';
        if (str_contains($value, 'tarde') || $value === 'tarde') return 'afternoon';
        if (str_contains($value, 'noche') || $value === 'noche') return 'night';
        return 'morning';
    }

    private function parseTime($value)
    {
        if (!$value || $value === '') return null;
        
        $value = strtolower(trim($value));
        
        if (str_contains($value, 'mañana') || str_contains($value, 'manana')) return '09:00';
        if (str_contains($value, 'tarde')) return '14:00';
        if (str_contains($value, 'noche')) return '19:00';
        
        if (preg_match('/(\d{1,2}):?(\d{2})?\s*(am|pm)?/i', $value, $m)) {
            $hour = (int)$m[1];
            $min = isset($m[2]) ? $m[2] : '00';
            $period = strtolower($m[3] ?? '');
            
            if ($period === 'pm' && $hour < 12) $hour += 12;
            if ($period === 'am' && $hour === 12) $hour = 0;
            
            return sprintf('%02d:%s', $hour, $min);
        }
        
        return null;
    }

    private function parseModality($value)
    {
        if (!$value) return 'presencial';
        
        $value = strtolower(trim($value));
        if (str_contains($value, 'virtual') || str_contains($value, 'zoom') || str_contains($value, 'meet') || str_contains($value, 'plataforma')) return 'virtual';
        return 'presencial';
    }
}