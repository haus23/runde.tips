import {
  type ServiceAccount,
  cert,
  getApps,
  initializeApp,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const svcAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
} satisfies ServiceAccount;

const apps = getApps();
const firebaseApp =
  apps.length > 0
    ? apps[0]
    : initializeApp({
        credential: cert(svcAccount),
      });

export const firestore = getFirestore(firebaseApp);
