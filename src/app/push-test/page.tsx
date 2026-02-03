'use client'; // must be first line

import { useState } from 'react';
import { useEffect } from 'react';

// Convert Base64 VAPID key to ArrayBuffer (compatible with PushManager.subscribe)
export function urlBase64ToArrayBuffer(base64String: string): ArrayBuffer {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = atob(base64);
  const buffer = new ArrayBuffer(rawData.length);
  const view = new Uint8Array(buffer);

  for (let i = 0; i < rawData.length; i++) {
    view[i] = rawData.charCodeAt(i);
  }

  return buffer;
}

const PushTestPage: React.FC = () => {
  const [status, setStatus] = useState<string>('');

  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service worker registered:', registration);
        })
        .catch(err => console.error('SW registration failed:', err));
    }
  }, []);


  const handleSubscribe = async () => {
    try {
      // 1️⃣ Register Service Worker
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);

      // 2️⃣ Request Notification permission (must be in user gesture)
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setStatus('Notification permission denied');
        return;
      }
      console.log('Permission granted');

      // 3️⃣ Subscribe to push
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToArrayBuffer('BGmR2oWmH4T2SyXwDmT4qPBfFWvXK86tDjte3ggbb9ufmdAIXFeTPX9NFqQe78dZipxL3TmuDYN13JyJbalyyYE'),
      });
      console.log('Subscription created:', subscription);

      // 4️⃣ Send subscription to backend
      const response = await fetch('/api/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription),
      });

      if (!response.ok) throw new Error('Failed to store subscription');

      setStatus('Subscribed successfully! ✅');
    } catch (err: any) {
      console.error(err);
      setStatus('Subscription failed: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Push Notification Test</h1>
      <button onClick={handleSubscribe}>Subscribe to Push</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default PushTestPage;
