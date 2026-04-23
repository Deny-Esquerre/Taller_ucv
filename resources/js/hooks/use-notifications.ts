import { useCallback } from 'react';

export function useNotifications() {
    const requestPermission = useCallback(async () => {
        if (!('Notification' in window)) return false;
        
        if (Notification.permission === 'granted') return true;
        
        if (Notification.permission !== 'denied') {
            const permission = await Notification.permission;
            return permission === 'granted';
        }
        
        return false;
    }, []);

    const sendNotification = useCallback((title: string, body: string) => {
        if (!('Notification' in window) || Notification.permission !== 'granted') {
            // Si no hay permiso, pedimos de nuevo silenciosamente para la próxima
            Notification.requestPermission();
            return;
        }

        new Notification(title, {
            body,
            icon: '/favicon.ico', // Puedes cambiar esto por el logo de la UCV
        });
    }, []);

    return { requestPermission, sendNotification };
}
