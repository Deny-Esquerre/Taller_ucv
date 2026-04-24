<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use PhpOffice\PhpSpreadsheet\IOFactory;

class DebugExcel extends Command
{
    protected $signature = 'debug:excel';
    protected $description = 'Debug Excel rows';

    public function handle()
    {
        $file = 'CALENDARIO DE FECHAS PARA TALLERES DE EMPLEABILIDAD.xlsx';
        
        $spreadsheet = IOFactory::load($file);
        $sheet = $spreadsheet->getActiveSheet();
        
        $rows = $sheet->toArray(null, true, true);
        
        for ($i = 2; $i <= min(10, count($rows)); $i++) {
            $this->info("Row $i:");
            $row = $rows[$i];
            $this->line("  Col 2 (SEMANAS): " . ($row[2] ?? 'empty'));
            $this->line("  Col 3 (MES): " . ($row[3] ?? 'empty'));
            $this->line("  Col 4 (SEMANA): " . ($row[4] ?? 'empty'));
            $this->line("  Col 5 (MARCA): " . ($row[5] ?? 'empty'));
            $this->line("  Col 6 (DIA): " . ($row[6] ?? 'empty'));
            $this->line("  Col 7 (HORA): " . ($row[7] ?? 'empty'));
            $this->line("  Col 8 (LUGAR): " . ($row[8] ?? 'empty'));
            $this->line("  Col 14 (TALLER): " . ($row[14] ?? 'empty'));
        }
        
        return 0;
    }
}