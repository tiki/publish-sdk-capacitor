/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

/**
 * Represents common use case values that can be associated with a
 * {@link LicenseRecord}
 */
export enum CommonUsecases {
  /**
   * Determine the actions that led to an outcome.
   */
  ATTRIBUTION = 'attribution',

  /**
   * Advertise to and reach users, often on other platforms.
   */
  RETARGETING = 'retargeting',

  /**
   * Tailor messaging, offers, features, etc., to an individual.
   */
  PERSONALIZATION = 'personalization',

  /**
   * Train machine learning models with user data.
   */
  AI_TRAINING = 'ai_training',

  /**
   * Distribute/relicense data, insights, signals, etc., to 3rd-parties.
   */
  DISTRIBUTION = 'distribution',

  /**
   * Extract insights and signals from user data.
   */
  ANALYTICS = 'analytics',

  /**
   * Add user data into customer support processes.
   */
  SUPPORT = 'support',
}
