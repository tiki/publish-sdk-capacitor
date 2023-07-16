/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type { CommonUsecases } from './common-usecases';

export interface Use {
  usecases: (CommonUsecases | string)[];
  destinations?: string[];
}
