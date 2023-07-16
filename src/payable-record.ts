/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { LicenseRecord } from './license-record';

export interface PayableRecord {
  id: string;
  license: LicenseRecord;
  amount: string;
  type: string;
  description?: string;
  expiry?: number;
  reference?: string;
}
