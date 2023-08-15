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

/**
 * The primary class for interacting with the SDK.
 */
export class TikiSdk {
  private plugin: TikiSdkPlugin;

  /**
   * Constructs a new instance of the TikiSdk class. Do not construct
   * directly, use {@link instance}.
   *
   * @param {TikiSdkPlugin} plugin - The plugin instance for interfacing
   * with native platform implementations
   */
  constructor(plugin: TikiSdkPlugin) {
    this.plugin = plugin;
  }

  /**
   * Retrieves the address associated with the instance.
   *
   * @async
   * @returns {Promise<string>} A Promise that resolves to the initialized
   * address.
   */
  address = async (): Promise<string> => (await this.plugin.address()).address;

  /**
   * Retrieves the user's identifier associated with the instance.
   *
   * @async
   * @returns {Promise<string>} A Promise that resolves to the initialized
   * user identifier.
   */
  id = async (): Promise<string> => (await this.plugin.id()).id;

  /**
   * Checks if the SDK has been initialized.
   *
   * @async
   * @returns {Promise<boolean>} A Promise that resolves to true if the SDK
   * is initialized, otherwise false.
   */
  isInitialized = async (): Promise<boolean> => (await this.plugin.isInitialized()).isInitialized;

  /**
   * Initializes the SDK with the required identifiers.
   *
   * @param {string} id - The user's identifier.
   * @param {string} publishingId - Get a free publishingId at
   * [console.mytiki.com](https://console.mytiki.com).
   * @returns {Promise<{ id: string; address: string }>} A Promise that
   * resolves to an object containing the initialized user identifier
   * and address.
   */
  initialize = (id: string, publishingId: string): Promise<{ id: string; address: string }> =>
    this.plugin.initialize({
      publishingId,
      id,
    });

  /**
   * Checks if a valid license exists for specific use cases and destinations.
   *
   * @param {string} ptr - The pointer record (PTR) for the data asset.
   * @param {Usecase[]} usecases - An array of use cases to check for.
   * @param {string[]} destinations - An optional array of destinations to
   * check for.
   * @returns {Promise<{ success: boolean; reason?: string }>} A Promise that
   * resolves to an object indicating the success of the operation and an
   * optional reason detailing the failure.
   */
  guard = (ptr: string, usecases: Usecase[], destinations?: string[]): Promise<{ success: boolean; reason?: string }> =>
    this.plugin.guard({
      ptr,
      usecases: usecases.map((usecase) => usecase.value),
      destinations,
    });

  /**
   * Creates a new {@link TitleRecord}.
   *
   * @param {string} ptr - The pointer record (PTR) for the data asset.
   * @param {Tag[]} tags - An array of tags describing the data asset.
   * @param {string} description - An optional description of the data.
   * @returns {Promise<TitleRecord>} A Promise that resolves to the created title record.
   */
  createTitle = (ptr: string, tags: Tag[], description?: string): Promise<TitleRecord> =>
    this.plugin.createTitle({
      ptr,
      tags: tags.map((tag) => tag.value),
      description,
    });

  /**
   * Retrieves the {@link TitleRecord} for the provided PTR.
   *
   * @async
   * @param {string} ptr - The pointer record (PTR) for the data asset.
   * @returns {Promise<TitleRecord | undefined>} A Promise that resolves to
   * the retrieved title record or `undefined` if not found.
   */
  getTitle = async (ptr: string): Promise<TitleRecord | undefined> => {
    const rsp = await this.plugin.getTitle({ ptr });
    if (rsp.id != null) return rsp;
    else return undefined;
  };

  /**
   * Creates a new {@link LicenseRecord}.
   *
   * @param {string} titleId - The ID of the {@link TitleRecord} for the
   * licensed asset.
   * @param {Array<{ usecases: Usecase[]; destinations?: string[] }>} uses - An
   * array of use cases and optionally the corresponding data processor destinations.
   * @param {string} terms - The legal terms for the license.
   * @param {Date} expiry - An optional expiration date for the license.
   * @param {string} description - An optional description of the license.
   * @returns {Promise<LicenseRecord>} A Promise that resolves to the created license record.
   */
  createLicense = (
    titleId: string,
    uses: { usecases: Usecase[]; destinations?: string[] }[],
    terms: string,
    expiry?: Date,
    description?: string,
  ): Promise<LicenseRecord> =>
    this.plugin.createLicense({
      titleId,
      uses: uses.map((use) => {
        return {
          usecases: use.usecases.map((usecase) => usecase.value),
          destinations: use.destinations,
        };
      }),
      terms,
      expiry: expiry?.getTime() ?? null,
      description,
    });

  /**
   * Retrieves a {@link LicenseRecord} by its ID.
   *
   * @async
   * @param {string} id - The ID of the license to retrieve.
   * @returns {Promise<LicenseRecord | undefined>} A Promise that resolves to
   * the retrieved license record or `undefined` if not found.
   */
  getLicense = async (id: string): Promise<LicenseRecord | undefined> => {
    const rsp = await this.plugin.getLicense({ id });
    if (rsp.id != null) return rsp;
    else return undefined;
  };

  /**
   * Retrieves all licenses associated with the provided {@link TitleRecord} ID.
   *
   * @async
   * @param {string} titleId - The ID of the title to retrieve licenses for.
   * @returns {Promise<LicenseRecord[]>} A Promise that resolves to an array
   * of retrieved license records.
   */
  getLicenses = async (titleId: string): Promise<LicenseRecord[]> =>
    (await this.plugin.getLicenses({ titleId })).licenses;

  /**
   * Creates a new {@link PayableRecord}.
   *
   * @param {string} licenseId - The ID of the {@link LicenseRecord}
   * associated with the payable.
   * @param {string} amount - The total amount of the payable.
   * @param {string} type - The type of payment owed.
   * @param {Date} expiry - An optional expiration date of the payable.
   * @param {string} description - An optional description of the payable.
   * @param {string} reference - An optional reference ID for the payable.
   * @returns {Promise<PayableRecord>} A Promise that resolves to the created payable record.
   */
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

  /**
   * Retrieves a {@link PayableRecord} by its ID.
   *
   * @async
   * @param {string} id - The ID of the payable to retrieve.
   * @returns {Promise<PayableRecord | undefined>} A Promise that resolves
   * to the retrieved payable record or `undefined` if not found.
   */
  getPayable = async (id: string): Promise<PayableRecord | undefined> => {
    const rsp = await this.plugin.getPayable({ id });
    if (rsp.id != null) return rsp;
    else return undefined;
  };

  /**
   * Retrieves all payables associated with the provided
   * {@link LicenseRecord} ID.
   *
   * @async
   * @param {string} licenseId - The ID of the license to retrieve payables for.
   * @returns {Promise<PayableRecord[]>} A Promise that resolves to an array
   * of retrieved payable records.
   */
  getPayables = async (licenseId: string): Promise<PayableRecord[]> =>
    (await this.plugin.getPayables({ licenseId })).payables;

  /**
   * Creates a new {@link ReceiptRecord}.
   *
   * @param {string} payableId - The ID of the {@link PayableRecord}
   * associated with the receipt.
   * @param {string} amount - The total amount paid.
   * @param {string} description - An optional description of the receipt.
   * @param {string} reference - An optional reference ID for the receipt.
   * @returns {Promise<ReceiptRecord>} A Promise that resolves to the created receipt record.
   */
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

  /**
   * Retrieves a {@link ReceiptRecord} by its ID.
   *
   * @async
   * @param {string} id - The ID of the receipt to retrieve.
   * @returns {Promise<ReceiptRecord | undefined>} A Promise that resolves
   * to the retrieved receipt record or `undefined` if not found.
   */
  getReceipt = async (id: string): Promise<ReceiptRecord | undefined> => {
    const rsp = await this.plugin.getReceipt({ id });
    if (rsp.id != null) return rsp;
    else return undefined;
  };

  /**
   * Retrieves all receipts associated with the provided
   * {@link PayableRecord} ID.
   *
   * @async
   * @param {string} payableId - The ID of the payable to retrieve receipts for.
   * @returns {Promise<ReceiptRecord[]>} A Promise that resolves to an array
   * of retrieved receipt records.
   */
  getReceipts = async (payableId: string): Promise<ReceiptRecord[]> =>
    (await this.plugin.getReceipts({ payableId })).receipts;
}
