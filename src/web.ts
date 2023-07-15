import { WebPlugin } from '@capacitor/core';

import type { TikiSdk } from './definitions';

export class TikiSdkWeb extends WebPlugin implements TikiSdk {
    echo(_: { value: number }): Promise<{ value: number }> {
        throw this.unimplemented("Mobile only.")
    }
}

