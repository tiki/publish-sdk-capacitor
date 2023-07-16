/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { CommonTags } from './common-tags';

export interface TitleRecord {
  id: string;
  hashedPtr: string;
  tags: (CommonTags | string)[];
  origin: string;
  description?: string;
}
