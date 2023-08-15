/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { LicenseRecord } from './license-record';

/**
 * Describes a payment owed against a {@link LicenseRecord}
 */
export interface PayableRecord {
  /**
   * The unique identifier of the payable record.
   */
  id: string;

  /**
   * The {@link LicenseRecord} associated with the payable transaction.
   */
  license: LicenseRecord;

  /**
   * The total amount owed. Can be a simple numeric value, or an atypical
   * value such as downloadable content.
   */
  amount: string;

  /**
   * Describes the type of payment (e.g. loyalty-point, cash, coupon, etc.)
   */
  type: string;

  /**
   * An optional description providing additional information about the record.
   */
  description?: string;

  /**
   * The expiration date of the payable in milliseconds since the Unix epoch.
   */
  expiry?: number;

  /**
   * An optional reference identifier for the payable.
   */
  reference?: string;
}
