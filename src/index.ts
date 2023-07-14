import { registerPlugin } from '@capacitor/core';

import type { TikiSdkPlugin } from './definitions';

const TikiSdk = registerPlugin<TikiSdkPlugin>('TikiSdk', {
  web: () => import('./web').then(m => new m.TikiSdkWeb()),
});

export * from './definitions';
export { TikiSdk };
