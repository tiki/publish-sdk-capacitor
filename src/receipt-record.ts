/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { PayableRecord } from './payable-record';

export interface ReceiptRecord {
  id: string;
  payable: PayableRecord;
  amount: string;
  description?: string;
  reference?: string;
}
