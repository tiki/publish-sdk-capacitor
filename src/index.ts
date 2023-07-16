import { registerPlugin } from '@capacitor/core';

import type { TikiSdkPlugin } from './definitions';

const Tiki = registerPlugin<TikiSdkPlugin>('TikiSdk', {
  web: () => import('./web').then(m => new m.TikiSdkWeb()),
});

export * from './definitions';
export { Tiki };
