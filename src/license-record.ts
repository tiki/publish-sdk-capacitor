/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { CommonUsecases } from './common-usecases';
import type { TitleRecord } from './title-record';

/**
 * Describes the terms under which a data asset may be used.
 */
export interface LicenseRecord {
  /**
   * The unique identifier of the license record.
   */
  id: string;

  /**
   * The {@link TitleRecord} associated with the license.
   */
  title: TitleRecord;

  /**
   * An array of approved uses for the data asset.
   */
  uses: {
    /**
     * An array of use cases or {@link CommonUsecases}.
     */
    usecases: (CommonUsecases | string)[];

    /**
     * An optional array of data processing destinations.
     */
    destinations?: string[];
  }[];

  /**
   * The legal terms of the license.
   */
  terms: string;

  /**
   * An optional description providing additional information about the record.
   */
  description?: string;

  /**
   * The expiration date of the license in milliseconds since the Unix epoch.
   */
  expiry?: number;
}
