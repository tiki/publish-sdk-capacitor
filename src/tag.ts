/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { CommonTags } from './common-tags';

export class Tag {
  readonly value: string;

  private constructor(tag: string) {
    this.value = tag;
  }

  static from(tag: string): Tag {
    if ((Object as any).values(CommonTags).includes(tag)) {
      return new Tag(tag);
    } else return new Tag(`custom:${tag}`);
  }

  static custom = (tag: string): Tag => new Tag(`custom:${tag}`);
  static common = (tag: CommonTags): Tag => new Tag(tag.valueOf());
}
