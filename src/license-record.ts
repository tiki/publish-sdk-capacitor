/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { CommonUsecases } from './common-usecases';
import type { TitleRecord } from './title-record';

export interface LicenseRecord {
  id: string;
  title: TitleRecord;
  uses: { usecases: (CommonUsecases | string)[]; destinations?: string[] }[];
  terms: string;
  description?: string;
  expiry?: number;
}
