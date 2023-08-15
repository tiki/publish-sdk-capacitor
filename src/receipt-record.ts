/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { PayableRecord } from './payable-record';

/**
 * Describes a payment made in accordance with a {@link PayableRecord}
 */
export interface ReceiptRecord {
  /**
   * The unique identifier of the receipt record.
   */
  id: string;

  /**
   * The {@link PayableRecord} associated with the receipt.
   */
  payable: PayableRecord;

  /**
   * The total amount paid.
   */
  amount: string;

  /**
   * An optional description providing additional information about the record.
   */
  description?: string;

  /**
   * An optional reference identifier for the receipt.
   */
  reference?: string;
}
