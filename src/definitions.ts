/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { LicenseRecord } from './license-record';
import type { PayableRecord } from './payable-record';
import type { ReceiptRecord } from './receipt-record';
import type { TitleRecord } from './title-record';
import type { Use } from './use';

export interface TikiSdkPlugin {
  id(): Promise<{ id: string }>;
  address(): Promise<{ address: string }>;

  isInitialized(): Promise<{ isInitialized: boolean }>;
  initialize(options: {
    id: string;
    publishingId: string;
  }): Promise<{ id: string; address: string }>;

  guard(options: {
    ptr: string;
    usecases: string[];
    destinations?: string[];
  }): Promise<{ success: boolean; reason?: string }>;

  createTitle(options: {
    ptr: string;
    tags: string[];
    description?: string;
  }): Promise<TitleRecord>;
  getTitle(options: { ptr: string }): Promise<TitleRecord>;

  createLicense(options: {
    titleId: string;
    uses: Use[];
    terms: string;
    expiry?: number;
    description?: string;
  }): Promise<LicenseRecord>;
  getLicense(options: { id: string }): Promise<LicenseRecord>;
  getLicenses(options: { titleId: string }): Promise<LicenseRecord[]>;

  createPayable(options: {
    licenseId: string;
    amount: string;
    type: string;
    expiry?: number;
    description?: string;
    reference?: string;
  }): Promise<PayableRecord>;
  getPayable(options: { id: string }): Promise<PayableRecord>;
  getPayables(options: { licenseId: string }): Promise<PayableRecord[]>;

  createReceipt(options: {
    payableId: string;
    amount: string;
    description?: string;
    reference?: string;
  }): Promise<ReceiptRecord>;
  getReceipt(options: { id: string }): Promise<ReceiptRecord>;
  getReceipts(options: { payableId: string }): Promise<ReceiptRecord[]>;
}
