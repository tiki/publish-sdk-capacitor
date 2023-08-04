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
  getTitle = async (ptr: string): Promise<TitleRecord | undefined> => {
    const rsp = await this.plugin.getTitle({ ptr });
    if (rsp.id != null) return rsp;
    else return undefined;
  };

  createLicense = (
    titleId: string,
    uses: { usecases: Usecase[]; destinations?: string[] }[],
    terms: string,
    expiry?: Date,
    description?: string,
  ): Promise<LicenseRecord> => {
      console.log(`EXPIRY IS: ${expiry?.getTime() ?? null}`)
    return this.plugin.createLicense({
      titleId,
      uses: uses.map(use => {
        return {
          usecases: use.usecases.map(usecase => usecase.value),
          destinations: use.destinations,
        };
      }),
      terms,
      expiry: expiry?.getTime() ?? null,
      description,
    });
  };

  getLicense = async (id: string): Promise<LicenseRecord | undefined> => {
    const rsp = await this.plugin.getLicense({ id });
    if (rsp.id != null) return rsp;
    else return undefined;
  };

  getLicenses = async (titleId: string): Promise<LicenseRecord[]> =>
    (await this.plugin.getLicenses({ titleId })).licenses;

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
      expiry: expiry?.getTime() ?? null,
      description,
      reference,
    });

  getPayable = async (id: string): Promise<PayableRecord | undefined> => {
    const rsp = await this.plugin.getPayable({ id });
    if (rsp.id != null) return rsp;
    else return undefined;
  };

  getPayables = async (licenseId: string): Promise<PayableRecord[]> =>
    (await this.plugin.getPayables({ licenseId })).payables;

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

  getReceipt = async (id: string): Promise<ReceiptRecord | undefined> => {
    const rsp = await this.plugin.getReceipt({ id });
    if (rsp.id != null) return rsp;
    else return undefined;
  };

  getReceipts = async (payableId: string): Promise<ReceiptRecord[]> =>
    (await this.plugin.getReceipts({ payableId })).receipts;
}
