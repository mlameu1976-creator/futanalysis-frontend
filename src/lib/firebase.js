import { initializeApp, getApps } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBT1gQl-gg349abcoMYyjwWhOYUFBbzX2c",
  authDomain: "futanalysis-794f5.firebaseapp.com",
  projectId: "futanalysis-794f5",
  storageBucket: "futanalysis-794f5.firebasestorage.app",
  messagingSenderId: "127736132127",
  appId: "1:127736132127:web:1cb1eed20c4bc6ea7a5b2a"
};

const VAPID_KEY = "BFyjV674_JLjOPXesYXIZulnsY9GEDdOji2Ay_uXZhfCyaDSTiUuzVJwI5aNzdLoAL_rntivw5RXq3HdwgN99bQ";

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export async function requestNotificationPermission() {
  try {
    if (typeof window === 'undefined') return null;
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return null;
    const messaging = getMessaging(app);
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    console.log('FCM Token:', token);
    return token;
  } catch (err) {
    console.error('Erro ao obter token:', err);
    return null;
  }
}

export function onForegroundMessage(callback) {
  if (typeof window === 'undefined') return;
  const messaging = getMessaging(app);
  return onMessage(messaging, callback);
}
