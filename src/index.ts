import { registerPlugin } from '@capacitor/core';

import type { TikiSdk } from './definitions';

const Tiki = registerPlugin<TikiSdk>('TikiSdk', {
  web: () => import('./web').then(m => new m.TikiSdkWeb()),
});

export * from './definitions';
export { Tiki };
