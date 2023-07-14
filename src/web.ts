import { WebPlugin } from '@capacitor/core';

import type { TikiSdkPlugin } from './definitions';

export class TikiSdkWeb extends WebPlugin implements TikiSdkPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}

//TODO option a) pull in the tiki js sdk and wrap, or b) just mark them all as unimplemented.
