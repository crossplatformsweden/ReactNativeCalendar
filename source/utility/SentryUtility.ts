import { Constants } from 'expo';
import Sentry from 'sentry-expo';

/**
 * Utility for Sentry bug tracking (@see https://sentry.io/)
 *
 * Will configure tracking based on "Constants.manifest.extra.sentryPublicDsn" expo configuration in app.json
 *
 * @class SentryUtility
 */
class SentryUtility {
  install() {
    try {
      // Set up sentry bug tracking
    Sentry.config(Constants.manifest.extra.sentryPublicDsn).install();

    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Get the current logger instance
   *
   * @readonly
   * @memberof SentryUtility
   */
  // get Logger() {
  //   return Sentry;
  // }
}

// Global instance
const SentryUtilityInstance = new SentryUtility();
export default SentryUtilityInstance;