import { WebPlugin } from '@capacitor/core';

import type { TikiSdkPlugin } from './definitions';

export class TikiSdkWeb extends WebPlugin implements TikiSdkPlugin {
  async createLicense(_: { value: string }): Promise<{ value: string }> {
    throw this.unimplemented("Mobile Only.")
  }
}
