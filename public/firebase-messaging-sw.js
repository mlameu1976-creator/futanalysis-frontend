importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBT1gQl-gg349abcoMYyjwWhOYUFBbzX2c",
  authDomain: "futanalysis-794f5.firebaseapp.com",
  projectId: "futanalysis-794f5",
  storageBucket: "futanalysis-794f5.firebasestorage.app",
  messagingSenderId: "127736132127",
  appId: "1:127736132127:web:1cb1eed20c4bc6ea7a5b2a"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Mensagem recebida em background:', payload);
  const { title, body, icon } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: icon || '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    data: payload.data,
    actions: [
      { action: 'open', title: 'Ver ao vivo' }
    ]
  });
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/opportunities/live')
  );
});
