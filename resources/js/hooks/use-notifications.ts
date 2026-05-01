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
        console.log('=== sendNotification llamado ===');
        console.log('Titulo:', title);
        console.log('Cuerpo:', body);
        console.log('Notification in window:', 'Notification' in window);
        
        if (!('Notification' in window)) {
            console.log('Navegador no soporta notificaciones');
            alert(`Notificación: ${title} - ${body}`);
            return;
        }
        
        console.log('Permiso actual:', Notification.permission);
        
        if (Notification.permission === 'granted') {
            console.log('Permiso granted, creando notificación...');
            const notif = new Notification(title, {
                body,
                icon: '/favicon.ico',
            });
            console.log('Notificación creada:', notif);
        } else if (Notification.permission === 'default') {
            console.log('Pidiendo permiso...');
            Notification.requestPermission().then(permission => {
                console.log('Nuevo permiso:', permission);
                if (permission === 'granted') {
                    new Notification(title, { body, icon: '/favicon.ico' });
                }
            });
        } else {
            console.log('Permiso denegado');
            alert(`Notificación (denegado): ${title} - ${body}`);
        }
    }, []);

    return { requestPermission, sendNotification };
}
