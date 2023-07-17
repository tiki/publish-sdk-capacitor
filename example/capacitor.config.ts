import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mytiki.sdk.capacitor.example',
  appName: 'Tiki SDK',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
