/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

/**
 * Represents a JSON Web Token (JWT) containing authentication and authorization information.
 */
export interface Jwt {
  /**
   * The access token issued by the authentication server.
   */
  accessToken: string;

  /**
   * The type of token. Typically set to "Bearer" for JWT-based authentication.
   */
  tokenType?: string;

  /**
   * The expiration date and time of the access token.
   */
  expires?: Date;

  /**
   * The refresh token, which can be used to obtain a new access token without requiring user credentials.
   */
  refreshToken?: string;

  /**
   * An array of scope strings that define the permissions and access levels granted by the token.
   */
  scope: string[];
}
