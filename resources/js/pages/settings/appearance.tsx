import { Head } from '@inertiajs/react';
import AppearanceTabs from '@/components/appearance-tabs';
import Heading from '@/components/heading';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { Check } from 'lucide-react';

export default function Appearance() {
    const { accentColor, updateAccentColor } = useAppearance();

    const colors = [
        { name: 'Predeterminado', value: '' },
        { name: 'Azul 1', value: '#0069c0' },
        { name: 'Azul 2', value: '#137fd9' },
        { name: 'Azul 3', value: '#6bbef9' },
        { name: 'Rosa 1', value: '#ff1f8e' },
        { name: 'Rosa 2', value: '#fd439f' },
    ];

    return (
        <>
            <Head title="Ajustes de apariencia" />

            <h1 className="sr-only">Ajustes de apariencia</h1>

            <div className="space-y-10">
                <section className="space-y-6">
                    <Heading
                        variant="small"
                        title="Tema"
                        description="Elige cómo quieres que se vea la aplicación"
                    />
                    <AppearanceTabs />
                </section>

                <section className="space-y-6">
                    <Heading
                        variant="small"
                        title="Color de énfasis"
                        description="Personaliza el color principal de la aplicación"
                    />
                    
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 max-w-lg">
                        {colors.map((color) => {
                            const isSelected = accentColor === color.value;
                            const selectedColor = color.value || '#000000';
                            const brightness = (parseInt(selectedColor.substring(1, 3), 16) * 299 + parseInt(selectedColor.substring(3, 5), 16) * 587 + parseInt(selectedColor.substring(5, 7), 16) * 114) / 1000;
                            const checkColor = brightness > 200 ? 'white' : 'white';
                            
                            return (
                                <button
                                    key={color.name}
                                    onClick={() => updateAccentColor(color.value)}
                                    className={cn(
                                        "group relative flex h-12 w-full items-center justify-center rounded-lg border-2 transition-all hover:scale-105",
                                        isSelected 
                                            ? "border-primary" 
                                            : "border-transparent bg-neutral-100 dark:bg-neutral-800"
                                    )}
                                    title={color.name}
                                >
                                    <div 
                                        className={cn(
                                            "h-6 w-6 rounded-full shadow-sm",
                                            !color.value ? "bg-zinc-900 dark:bg-zinc-100" : ""
                                        )}
                                        style={color.value ? { backgroundColor: color.value } : {}}
                                    />
                                    {isSelected && (
                                        <Check 
                                            className="absolute top-1 right-1 h-3 w-3 rounded-full p-0.5" 
                                            style={{ 
                                                backgroundColor: 'var(--primary-foreground)', 
                                                color: 'var(--primary)' 
                                            }} 
                                        />
                                    )}
                                    <span className="sr-only">{color.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </section>
            </div>
        </>
    );
}
