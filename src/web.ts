/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { WebPlugin } from '@capacitor/core';

import type { LicenseRecord } from './license-record';
import type { PayableRecord } from './payable-record';
import type { ReceiptRecord } from './receipt-record';
import type { TikiSdkPlugin } from './tiki-sdk-plugin';
import type { TitleRecord } from './title-record';

export class TikiSdkWeb extends WebPlugin implements TikiSdkPlugin {
  id(): Promise<{ id: string }> {
    throw this.unimplemented('Mobile Only.');
  }

  address(): Promise<{ address: string }> {
    throw this.unimplemented('Mobile Only.');
  }

  isInitialized(): Promise<{ isInitialized: boolean }> {
    throw this.unimplemented('Mobile Only.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initialize(_: { id: string; publishingId: string }): Promise<{ id: string; address: string }> {
    throw this.unimplemented('Mobile Only.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  guard(_: {
    ptr: string;
    usecases: string[];
    destinations?: string[];
  }): Promise<{ success: boolean; reason?: string }> {
    throw this.unimplemented('Mobile Only.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTitle(_: { ptr: string }): Promise<TitleRecord> {
    throw this.unimplemented('Mobile Only.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createTitle(_: { ptr: string; tags: string[]; description?: string }): Promise<TitleRecord> {
    throw this.unimplemented('Mobile Only.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createLicense(_: {
    titleId: string;
    uses: { usecases: string[]; destinations?: string[] }[];
    terms: string;
    expiry: number | null;
    description?: string;
  }): Promise<LicenseRecord> {
    throw this.unimplemented('Mobile Only.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getLicense(_: { id: string }): Promise<LicenseRecord> {
    throw this.unimplemented('Mobile Only.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getLicenses(_: { titleId: string }): Promise<{ licenses: LicenseRecord[] }> {
    throw this.unimplemented('Mobile Only.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createPayable(_: {
    licenseId: string;
    amount: string;
    type: string;
    expiry: number | null;
    description?: string;
    reference?: string;
  }): Promise<PayableRecord> {
    throw this.unimplemented('Mobile Only.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getPayable(_: { id: string }): Promise<PayableRecord> {
    throw this.unimplemented('Mobile Only.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getPayables(_: { licenseId: string }): Promise<{ payables: PayableRecord[] }> {
    throw this.unimplemented('Mobile Only.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createReceipt(_: {
    payableId: string;
    amount: string;
    description?: string;
    reference?: string;
  }): Promise<ReceiptRecord> {
    throw this.unimplemented('Mobile Only.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getReceipt(_: { id: string }): Promise<ReceiptRecord> {
    throw this.unimplemented('Mobile Only.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getReceipts(_: { payableId: string }): Promise<{ receipts: ReceiptRecord[] }> {
    throw this.unimplemented('Mobile Only.');
  }

  token(): Promise<{
    accessToken?: string;
    tokenType?: string;
    expires?: number;
    refreshToken?: string;
    scope: string[];
  }> {
    throw this.unimplemented('Mobile Only.');
  }
}
