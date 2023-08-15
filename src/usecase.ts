/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { CommonUsecases } from './common-usecases';

/**
 * Describes how and optionally where a data asset may be used.
 */
export class Usecase {
  /**
   * The raw value of the use case.
   */
  readonly value: string;

  /**
   * Constructs a new Usecase with the provided value. This constructor is
   * private. To create a Usecase instance, use the static factory methods.
   *
   * @private
   * @param {string} usecase - The use case value.
   */
  private constructor(usecase: string) {
    this.value = usecase;
  }

  /**
   * Creates a Usecase from a provided use case value. If the use case value
   * matches a common use case, a pre-defined Usecase is returned. Otherwise,
   * a custom Usecase is created.
   *
   * @static
   * @param {string} usecase - The use case value.
   * @returns {Usecase} A Usecase instance.
   */
  static from(usecase: string): Usecase {
    if ((Object as any).values(CommonUsecases).includes(usecase)) {
      return new Usecase(usecase);
    } else return new Usecase(`custom:${usecase}`);
  }

  /**
   * Creates a custom Usecase with the provided use case value.
   *
   * @static
   * @param {string} usecase - The custom use case value.
   * @returns {Usecase} A Usecase instance.
   */
  static custom = (usecase: string): Usecase => new Usecase(`custom:${usecase}`);

  /**
   * Creates a Usecase from one of the {@link CommonUsecases}
   *
   * @static
   * @param {CommonUsecases} usecase - The common use case to use.
   * @returns {Usecase} A Usecase instance.
   */
  static common = (usecase: CommonUsecases): Usecase => new Usecase(usecase.valueOf());
}
