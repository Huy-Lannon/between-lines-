// Firebase Messaging Service Worker for Background Notifications
// This handles push notifications when the app is closed

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Initialize Firebase in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyDFhEAdg7noM1f8CrdOi14O6c5f9JsU2gk",
  authDomain: "betweenlines-dbe2b.firebaseapp.com",
  projectId: "betweenlines-dbe2b",
  storageBucket: "betweenlines-dbe2b.firebasestorage.app",
  messagingSenderId: "451292270485",
  appId: "1:451292270485:web:03160fdf9c8f682ff7b09c",
  measurementId: "G-7RV67SWFEJ"
});

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages (when app is closed)
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);
  
  const notificationTitle = payload.notification?.title || 'Between Lines';
  const notificationOptions = {
    body: payload.notification?.body || 'A quiet thought for today.',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'daily-reminder',
    requireInteraction: false,
    data: {
      url: 'https://huy-lannon.github.io/'
    }
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification clicked');
  
  event.notification.close();
  
  // Open the app when notification is clicked
  event.waitUntil(
    clients.openWindow(event.notification.data.url || 'https://huy-lannon.github.io/')
  );
});
