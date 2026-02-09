self.addEventListener('push', (event) => {
    console.log('Push event received:', event);
    
    let title = "Ready for today's picture of the day?";
    let body = "New picture of the day is available. Click to view!";
    if (event.data) { 
        body = event.data.text();
    }
    const options = {
        body: body,
        data: {
            url: 'https://ui-server-six.vercel.app/'
        }
    };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked:', event.notification.tag);
    event.notification.close();
    const url = event.notification.data.url;
    event.waitUntil(
        clients.matchAll({type: 'window', includeUncontrolled: true}).
        then((windowClients) => {
            for (let client of windowClients) {
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});