self.addEventListener('push', (event) => {
    console.log('Push event received:', event);
 let title = 'New Notification';
  let body = '';
  if (event.data) {
    try {
      const data = JSON.parse(event.data.text());
      title = data.title || title;
      body = data.body || '';
    } catch(e) {
      body = event.data.text();
    }
  }
  event.waitUntil(
    self.registration.showNotification(title, { body })
  );
});