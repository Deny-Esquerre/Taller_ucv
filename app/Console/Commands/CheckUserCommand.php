<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class CheckUserCommand extends Command
{
    protected $signature = 'check:user {email}';

    public function handle()
    {
        $email = $this->argument('email');
        $user = User::where('email', $email)->first();
        
        if (!$user) {
            $this->error("User not found: $email");
            return 1;
        }
        
        $this->info("User found:");
        $this->info("  Email: " . $user->email);
        $this->info("  Name: " . $user->name);
        $this->info("  Role: " . ($user->role ?? 'NULL'));
        $this->info("  Password starts with: " . substr($user->password, 0, 10));
        
        if (\Illuminate\Support\Facades\Hash::check('admin123', $user->password)) {
            $this->info("  Password 'admin123': CORRECT");
        } elseif (\Illuminate\Support\Facades\Hash::check('password', $user->password)) {
            $this->info("  Password 'password': CORRECT");
        } else {
            $this->warn("  Password 'admin123' or 'password': INCORRECT");
        }
        
        return 0;
    }
}