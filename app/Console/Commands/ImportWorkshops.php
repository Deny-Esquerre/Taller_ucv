<?php

namespace App\Console\Commands;

use App\Models\Workshop;
use App\Models\User;
use Illuminate\Console\Command;
use PhpOffice\PhpSpreadsheet\IOFactory;

class ImportWorkshops extends Command
{
    protected $signature = 'workshops:import {file : Path to Excel file}';
    protected $description = 'Import workshops from Excel file';

    public function handle()
    {
        $file = $this->argument('file');
        
        if (!file_exists($file)) {
            $file = base_path($file);
        }
        
        if (!file_exists($file)) {
            $this->error("File not found: {$file}");
            return 1;
        }

        $this->info("Reading Excel file...");
        
        $spreadsheet = IOFactory::load($file);
        $sheet = $spreadsheet->getActiveSheet();
        
        $rows = $sheet->toArray(null, true, true);
        
        $this->info("Found " . count($rows) . " rows");

        $admin = User::where('role', 'admin')->first();
        if (!$admin) {
            $this->error('No admin user found');
            return 1;
        }

        $imported = 0;
        $skipped = 0;

        foreach ($rows as $index => $row) {
            if ($index < 2) continue;

            $title = $row[14] ?? null;
            
            if (empty($title)) {
                $skipped++;
                continue;
            }

            try {
                $date = $this->parseDate($row[6] ?? null);
                
                if (!$date) {
                    $this->warn("Row {$index}: Invalid date, skipping");
                    continue;
                }

                $shiftType = $this->parseShift($row[2] ?? '');

                Workshop::create([
                    'user_id' => $admin->id,
                    'title' => $title,
                    'shift_date' => $date,
                    'shift_type' => $shiftType,
                    'shift_time' => $this->parseTime($row[7] ?? null),
                    'representative' => $row[9] ?? $admin->name,
                    'email' => $row[11] ?? $admin->email,
                    'modality' => $this->parseModality($row[8] ?? ''),
                    'meeting_link' => null,
                    'location' => $row[8] ?? null,
                    'year' => 2026,
                    'brand' => $row[5] ?? null,
                    'contact_name' => $row[9] ?? null,
                    'contact_position' => $row[10] ?? null,
                    'contact_email_b' => $row[11] ?? null,
                    'contact_email_n' => $row[12] ?? null,
                    'contact_phone' => $row[13] ?? null,
                    'speaker' => $row[15] ?? null,
                    'speaker_linkedin' => $row[16] ?? null,
                    'drive_logo_photo' => $row[17] ?? null,
                    'drive_difusion' => $row[18] ?? null,
                    'inscription_link' => $row[19] ?? null,
                    'inscription_responses' => $row[20] ?? null,
                    'attendees_link' => $row[21] ?? null,
                    'attendee_responses' => $row[22] ?? null,
                    'event_photos' => $row[23] ?? null,
                    'comments' => $row[24] ?? null,
                    'status' => 'scheduled',
                ]);

                $imported++;
                $this->line("Imported: {$title} - {$date}");
            } catch (\Exception $e) {
                $this->warn("Row {$index}: " . $e->getMessage());
            }
        }

        $this->info("Import completed: {$imported} imported, {$skipped} skipped");
        return 0;
    }

    private function parseDate($value)
    {
        if (!$value || $value === '') return null;
        
        if ($value instanceof \DateTime) {
            return $value->format('Y-m-d');
        }

        if (is_numeric($value)) {
            return \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($value)->format('Y-m-d');
        }

        $value = trim($value);
        
        $date = date_create($value);
        if ($date) {
            return $date->format('Y-m-d');
        }
        
        return null;
    }

    private function parseShift($value)
    {
        if (!$value) return 'morning';
        
        $value = strtolower(trim($value));
        if (str_contains($value, 'mañana') || str_contains($value, 'manana') || $value === 'm') return 'morning';
        if (str_contains($value, 'tarde') || $value === 't') return 'afternoon';
        if (str_contains($value, 'noche') || $value === 'n') return 'night';
        return 'morning';
    }

    private function parseTime($value)
    {
        if (!$value || $value === '') return null;
        
        if ($value instanceof \DateTime) {
            return $value->format('H:i');
        }

        if (is_numeric($value)) {
            return \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($value)->format('H:i');
        }

        return trim($value);
    }

    private function parseModality($value)
    {
        if (!$value) return 'presencial';
        
        $value = strtolower(trim($value));
        if (str_contains($value, 'virtual') || str_contains($value, 'zoom') || str_contains($value, 'meet') || str_contains($value, 'teams')) return 'virtual';
        return 'presencial';
    }
}