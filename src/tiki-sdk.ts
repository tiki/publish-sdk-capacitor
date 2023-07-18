/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { LicenseRecord } from './license-record';
import type { PayableRecord } from './payable-record';
import type { ReceiptRecord } from './receipt-record';
import type { Tag } from './tag';
import type { TikiSdkPlugin } from './tiki-sdk-plugin';
import type { TitleRecord } from './title-record';
import type { Usecase } from './usecase';

export class TikiSdk {
  private plugin: TikiSdkPlugin;

  constructor(plugin: TikiSdkPlugin) {
    this.plugin = plugin;
  }

  address = async (): Promise<string> => (await this.plugin.address()).address;
  id = async (): Promise<string> => (await this.plugin.id()).id;

  isInitialized = async (): Promise<boolean> =>
    (await this.plugin.isInitialized()).isInitialized;
  initialize = (
    id: string,
    publishingId: string,
  ): Promise<{ id: string; address: string }> =>
    this.plugin.initialize({
      publishingId,
      id,
    });

  guard = (
    ptr: string,
    usecases: Usecase[],
    destinations?: string[],
  ): Promise<{ success: boolean; reason?: string }> =>
    this.plugin.guard({
      ptr,
      usecases: usecases.map(usecase => usecase.value),
      destinations,
    });

  createTitle = (
    ptr: string,
    tags: Tag[],
    description?: string,
  ): Promise<TitleRecord> =>
    this.plugin.createTitle({
      ptr,
      tags: tags.map(tag => tag.value),
      description,
    });
  getTitle = (ptr: string): Promise<TitleRecord> =>
    this.plugin.getTitle({ ptr });

  createLicense = (
    titleId: string,
    uses: { usecases: Usecase[]; destinations?: string[] }[],
    terms: string,
    expiry?: Date,
    description?: string,
  ): Promise<LicenseRecord> => {
    return this.plugin.createLicense({
      titleId,
      uses: uses.map(use => {
        return {
          usecases: use.usecases.map(usecase => usecase.value),
          destinations: use.destinations,
        };
      }),
      terms,
      expiry: expiry?.getTime(),
      description,
    });
  };

  getLicense = (id: string): Promise<LicenseRecord> =>
    this.plugin.getLicense({ id });

  getLicenses = (titleId: string): Promise<LicenseRecord[]> =>
    this.plugin.getLicenses({ titleId });

  createPayable = (
    licenseId: string,
    amount: string,
    type: string,
    expiry?: Date,
    description?: string,
    reference?: string,
  ): Promise<PayableRecord> =>
    this.plugin.createPayable({
      licenseId,
      amount,
      type,
      expiry: expiry?.getTime(),
      description,
      reference,
    });

  getPayable = (id: string): Promise<PayableRecord> =>
    this.plugin.getPayable({ id });

  getPayables = (licenseId: string): Promise<PayableRecord[]> =>
    this.plugin.getPayables({ licenseId });

  createReceipt = (
    payableId: string,
    amount: string,
    description?: string,
    reference?: string,
  ): Promise<ReceiptRecord> =>
    this.plugin.createReceipt({
      payableId,
      amount,
      description,
      reference,
    });

  getReceipt = (id: string): Promise<ReceiptRecord> =>
    this.plugin.getReceipt({ id });

  getReceipts = (payableId: string): Promise<ReceiptRecord[]> =>
    this.plugin.getReceipts({ payableId });
}
