// storage/types/index

/**
 * App storage Redux action types
 * @type {StorageConstants}
 * @public
 * @type {Object}
 */
export enum StorageConstants {
    STORAGE_GOTKEY = 'STORAGE = GOT KEY',
    STORAGE_REMOVEDKEY = 'STORAGE = REMOVED KEY',
    STORAGE_REMOVED_FAILED = 'STORAGE = REMOVED KEY FAILED',
    STORAGE_NOSUCHKEY = 'STORAGE = NO SUCH KEY',
    STORAGE_SAVE_FAILED = 'STORAGE = SAVE FAILED',
    STORAGE_SAVED = 'STORAGE = SAVED KEY',
    STORAGE_USER_KEY = 'STORAGE KEY = USER',
    STORAGE_BUSY = 'Friskar upp minnet',
  }

export interface IKey {
/**
 * The key in app storage
 *
 * @type {string}
 */
  key: string;
}

/**
 * Reducer properties passed down from StorageReducer
 * @typedef IStorageReducer
 * @type {Object}
 * @public
 * @export
 * @property {Object} value - the app storage value
 * @property {string} key - The app storage key
 */
export interface IStorageState extends IKey {

  /**
   * Value to save / load from app storage
   *
   * @type {object?}
   */
  value?: object;
}

export interface IStorageAction extends IStorageState {
  type: StorageConstants;
}