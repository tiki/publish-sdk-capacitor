/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { CommonTags } from './common-tags';

/**
 * A metadata tag describing a data asset. Associated with a
 * {@link TitleRecord}, tags improve record searchability and filtering.
 */
export class Tag {
  /**
   * The raw value of the tag.
   */
  readonly value: string;

  /**
   * Constructs a new Tag with the provided value. This constructor is
   * private. To create a Tag instance, use the static factory methods.
   *
   * @private
   * @param {string} tag - The tag value.
   */
  private constructor(tag: string) {
    this.value = tag;
  }

  /**
   * Creates a Tag from a provided raw value. If the tag value matches a
   * common tag, a pre-defined Tag is returned. Otherwise, a custom
   * Tag is created.
   *
   * @static
   * @param {string} tag - The tag value.
   * @returns {Tag} A Tag instance.
   */
  static from(tag: string): Tag {
    if ((Object as any).values(CommonTags).includes(tag)) {
      return new Tag(tag);
    } else return new Tag(`custom:${tag}`);
  }

  /**
   * Creates a custom Tag with the provided tag value.
   *
   * @static
   * @param {string} tag - The custom tag value.
   * @returns {Tag} A Tag instance.
   */
  static custom = (tag: string): Tag => new Tag(`custom:${tag}`);

  /**
   * Creates a Tag from one of the {@link CommonTags}
   *
   * @static
   * @param {CommonTags} tag - The common tag to use.
   * @returns {Tag} A Tag instance.
   */
  static common = (tag: CommonTags): Tag => new Tag(tag.valueOf());
}
