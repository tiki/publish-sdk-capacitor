/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { registerPlugin } from '@capacitor/core';

import { CommonTags } from './common-tags';
import { CommonUsecases } from './common-usecases';
import type { LicenseRecord } from './license-record';
import type { PayableRecord } from './payable-record';
import type { ReceiptRecord } from './receipt-record';
import { Tag } from './tag';
import { TikiSdk } from './tiki-sdk';
import type { TikiSdkPlugin } from './tiki-sdk-plugin';
import type { TitleRecord } from './title-record';
import { Usecase } from './usecase';

const plugin = registerPlugin<TikiSdkPlugin>('TikiSdk', {
  web: () => import('./web').then(m => new m.TikiSdkWeb()),
});
const instance: TikiSdk = new TikiSdk(plugin);

export { instance, Usecase, Tag, CommonUsecases, CommonTags };
export type {
  TikiSdk,
  LicenseRecord,
  ReceiptRecord,
  TitleRecord,
  PayableRecord,
};
