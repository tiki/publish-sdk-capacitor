/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { CommonTags } from './common-tags';

/**
 * Defines ownership of a data asset using a **PointerRecord (PTR)**
 * to identify the raw asset in an external system.
 */
export interface TitleRecord {
  /**
   * The unique identifier of the title record.
   */
  id: string;

  /**
   * The hashed pointer (PTR) record of the data asset.
   */
  hashedPtr: string;

  /**
   * An array of metadata tags associated with the data asset.
   */
  tags: (CommonTags | string)[];

  /**
   * The origin where the record was created.
   */
  origin: string;

  /**
   * An optional description providing additional information about the record.
   */
  description?: string;
}
