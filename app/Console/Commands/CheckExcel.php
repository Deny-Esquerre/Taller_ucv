<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use PhpOffice\PhpSpreadsheet\IOFactory;

class CheckExcel extends Command
{
    protected $signature = 'check:excel';
    protected $description = 'Check Excel file structure';

    public function handle()
    {
        $file = 'CALENDARIO DE FECHAS PARA TALLERES DE EMPLEABILIDAD.xlsx';
        
        $spreadsheet = IOFactory::load($file);
        $sheet = $spreadsheet->getActiveSheet();
        
        $headers = $sheet->toArray()[0];
        $this->info("Columnas:");
        foreach ($headers as $i => $v) {
            $this->line("$i: $v");
        }
        
        $this->info("\nPrimera fila de datos:");
        $row1 = $sheet->toArray()[1] ?? [];
        foreach ($row1 as $i => $v) {
            $this->line("$i: $v");
        }
        
        return 0;
    }
}