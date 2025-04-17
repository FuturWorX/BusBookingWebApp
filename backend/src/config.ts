import dotenv from "dotenv";
dotenv.config();


interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

interface config{
    firebase: FirebaseConfig;
}

const {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} = process.env as {
  [key: string]: string | undefined;
};


const config: config = {
  firebase: {
    apiKey: API_KEY as string,
    authDomain: AUTH_DOMAIN as string,
    projectId: PROJECT_ID as string,
    storageBucket: STORAGE_BUCKET as string,
    messagingSenderId: MESSAGING_SENDER_ID as string,
    appId: APP_ID as string,
    measurementId: MEASUREMENT_ID as string,
  },
};

export default config;


