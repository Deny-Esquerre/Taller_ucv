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
        console.log('Intentando enviar notificación:', title, body);
        console.log('Permission:', Notification?.permission);
        
        if (!('Notification' in window)) {
            console.log('Navegador no soporta notificaciones');
            return;
        }
        
        if (Notification.permission === 'granted') {
            console.log('Enviando notificación...');
            new Notification(title, {
                body,
                icon: '/favicon.ico',
            });
        } else if (Notification.permission === 'default') {
            console.log('Pidiendo permiso...');
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification(title, { body, icon: '/favicon.ico' });
                }
            });
        } else {
            console.log('Permiso denegado');
        }
    }, []);

    return { requestPermission, sendNotification };
}
