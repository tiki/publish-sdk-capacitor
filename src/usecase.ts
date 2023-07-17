/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { CommonUsecases } from './common-usecases';

export class Usecase {
  readonly value: string;

  private constructor(usecase: string) {
    this.value = usecase;
  }

  static from(usecase: string): Usecase {
    if ((Object as any).values(CommonUsecases).includes(usecase)) {
      return new Usecase(usecase);
    } else return new Usecase(`custom:${usecase}`);
  }

  static custom = (usecase: string): Usecase =>
    new Usecase(`custom:${usecase}`);
  static common = (usecase: CommonUsecases): Usecase =>
    new Usecase(usecase.valueOf());
}
