/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

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
