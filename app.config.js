import 'dotenv/config';


let localConfig = {};
try {
  localConfig = require('./app.config.local');
} catch (e) {
  
}

const getFirebaseConfig = () => {
  if (process.env.FIREBASE_CONFIG) {
    try {
      return JSON.parse(process.env.FIREBASE_CONFIG);
    } catch (e) {
      console.warn('Error parsing FIREBASE_CONFIG, falling back to individual env vars');
    }
  }

  return {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };
};

const firebaseConfig = getFirebaseConfig();

export default {
  ...localConfig,
  name: 'Monefiy',
  slug: 'monefiy',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.yourcompany.monefiy'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF'
    },
    package: 'com.yourcompany.monefiy'
  },
  web: {
    favicon: './assets/favicon.png'
  },
  plugins: [
    "expo-secure-store"
  ],
  extra: {
    firebase: firebaseConfig,
    eas: {
      projectId: process.env.EAS_PROJECT_ID
    }
  },
  hooks: {
    postPublish: [
      {
        file: 'sentry-expo/upload-sourcemaps',
        config: {
          organization: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT
        }
      }
    ]
  }
}; 