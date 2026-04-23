<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class MakeAdminCommand extends Command
{
    protected $signature = 'make:admin {email} {--password=}';

    protected $description = 'Make a user admin';

    public function handle()
    {
        $email = $this->argument('email');
        $password = $this->option('password');
        
        $user = User::where('email', $email)->first();
        
        if (!$user) {
            $this->error("User not found: $email");
            return 1;
        }
        
        $user->role = 'admin';
        
        if ($password) {
            $user->password = Hash::make($password);
        }
        
        $user->save();
        
        $this->info("User {$email} is now admin" . ($password ? " with new password" : ""));
        return 0;
    }
}