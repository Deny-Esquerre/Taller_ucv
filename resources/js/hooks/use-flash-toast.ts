import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import type { FlashToast } from '@/types/ui';

export function useFlashToast(): void {
    const { flash } = usePage().props as any;

    useEffect(() => {
        if (flash?.toast) {
            const data = flash.toast as FlashToast;
            toast[data.type](data.message);
        }
    }, [flash]);
}
