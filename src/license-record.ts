/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { TitleRecord } from './title-record';
import type { Use } from './use';

export interface LicenseRecord {
  id: string;
  title: TitleRecord;
  uses: Use[];
  terms: string;
  description?: string;
  expiry?: number;
}
