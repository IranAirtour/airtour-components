import {
  check,
  openSettings,
  requestMultiple,
  checkNotifications,
  checkLocationAccuracy,
  requestLocationAccuracy,
  openLimitedPhotoLibraryPicker,
  Permission,
  PERMISSIONS,
  RESULTS,
  LocationAccuracy,
  checkMultiple,
  NotificationSettings,
  request,
} from 'react-native-permissions';
import { isIos } from './Platform';
import { Alert, ToastAndroid } from 'react-native';
import {
  LocationAccuracyOptions,
  PermissionStatus,
} from 'react-native-permissions/src/types';
import {
  IPermissionAction,
  IPermissionCheck,
  IPermissionRequest,
} from './PermissionHandler.interfaces';
import { ToastHandlerClient } from './Toast';

export class PermissionHandler
  implements IPermissionCheck, IPermissionRequest, IPermissionAction
{
  async hasPermission(permission: Permission): Promise<boolean> {
    return new Promise((resolve, reject) => {
      check(permission)
        .then(result => {
          switch (result) {
            case RESULTS.GRANTED:
              resolve(true);
              break;
            default:
              reject(result);
          }
        })
        .catch(error => {
          // Alert.alert(error);
          reject(error);
        });
    });
  }

  async hasPermissions(permissions: Permission[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      checkMultiple(permissions)
        .then(statuses => {
          const permissionValues = Object.values(statuses);
          let allGranted = permissionValues.every(function (element) {
            return element === RESULTS.GRANTED;
          });
          resolve(allGranted);
        })
        .catch(error => {
          reject(error);
          // throw error;
        });
    });
  }

  async hasWriteStoragePermission(): Promise<boolean> {
    return await this.hasPermission(this.getWriteStoragePermission());
  }

  async hasCameraPermission(): Promise<boolean> {
    return await this.hasPermissions(this.getCameraPermissions());
  }

  async hasLocationPermission(): Promise<boolean> {
    return await this.hasPermissions(this.getLocationPermission());
  }
  async hasReadStoragePermission(): Promise<boolean> {
    return await this.hasPermissions([this.getReadStoragePermission()]);
  }
  async requestLocationPermission(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      requestMultiple(this.getLocationPermission()).then(statuses => {
        if (isIos) {
          if (
            statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] === RESULTS.GRANTED &&
            statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED
          ) {
            resolve(true);
          } else {
            // this.openSettings();
            reject(statuses);
          }
        } else {
          if (
            statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] ===
              RESULTS.GRANTED &&
            statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] ===
              RESULTS.GRANTED
          ) {
            resolve(true);
          } else {
            // this.openSettings();
            reject(statuses);
          }
        }
      });
    });
  }

  async requestCameraPermission(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      requestMultiple(this.getCameraPermissions()).then(statuses => {
        if (isIos) {
          if (
            statuses[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED &&
            statuses[PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY] === RESULTS.GRANTED
          ) {
            resolve(true);
          } else {
            ToastAndroid.show(
              'Make Sure you have granted all permissions',
              1000,
            );
            // this.openSettings();
            reject(statuses);
          }
        } else {
          if (
            statuses[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED &&
            statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
              RESULTS.GRANTED
          ) {
            resolve(true);
          } else {
            ToastAndroid.show(
              'Make Sure you have granted all permissions',
              1000,
            );
            // this.openSettings();
            reject(statuses);
          }
        }
      });
    });
  }

  async requestContactsPermission(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      request(this.getContactsPermission()).then(result => {
        switch (result) {
          case RESULTS.GRANTED:
            resolve(true);
            break;
          case RESULTS.BLOCKED:
            ToastHandlerClient.show(
              'You blocked the permission. you have to enable it in settings',
            );
            // this.openSettings();
            resolve(false);
            break;
          default:
            reject(false);
        }
      });
    });
  }

  async requestReadStoragePermission(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      request(this.getReadStoragePermission()).then(result => {
        switch (result) {
          case RESULTS.GRANTED:
            resolve(true);
            break;
          case RESULTS.BLOCKED:
            ToastHandlerClient.show(
              'You blocked the permission. you have to enable it in settings',
            );
            // this.openSettings();
            reject(false);
            break;
          default:
            reject(false);
        }
      });
    });
  }

  async requestWriteStoragePermission(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      request(this.getWriteStoragePermission())
        .then(result => {
          switch (result) {
            case RESULTS.GRANTED:
              resolve(true);
              break;
            case RESULTS.BLOCKED:
              ToastHandlerClient.show(
                'You blocked the permission. you have to enable it in settings',
              );
              // this.openSettings();
              resolve(false);
              break;
            default:
              reject(false);
          }
        })
        .catch(error => {
          Promise.reject(error);
        });
    });
  }

  async openSettings(): Promise<boolean> {
    return openSettings()
      .then(() => {
        return true;
      })
      .catch(() => {
        Alert.alert('cannot open settings');
        return Promise.reject(false);
      });
  }

  async openLimitedPhotoLibraryPicker(): Promise<void> {
    openLimitedPhotoLibraryPicker().catch(() => {
      Alert.alert('Cannot open photo library picker');
    });
  }

  /**
   * ios >= 14
   */
  async hasLocationAccuracyPermission(): Promise<LocationAccuracy> {
    return await checkLocationAccuracy();
  }

  /**
   * ios >= 14
   * @param options
   */
  async requestLocationAccuracy(
    options: LocationAccuracyOptions,
  ): Promise<any> {
    requestLocationAccuracy(options)
      .then(accuracy => {})
      .catch(e => {
        return Promise.reject(e);
      });
  }

  async hasNotificationsPermissions(): Promise<{
    status: PermissionStatus;
    settings: NotificationSettings;
  }> {
    return await checkNotifications();
  }
  async requestReadStorage(): Promise<boolean> {
    try {
      const hasPermission = await this.hasReadStoragePermission();
      if (hasPermission) {
        return true;
      } else {
        const permissionRequestResult =
          await this.requestReadStoragePermission();
        if (permissionRequestResult) {
          return true;
        } else {
          return Promise.reject('read storage permission failed');
        }
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  protected getReadStoragePermission(): Permission {
    return isIos
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
  }

  protected getWriteStoragePermission(): Permission {
    return isIos
      ? PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY
      : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
  }

  protected getLocationPermission(): Permission[] {
    return isIos
      ? [PERMISSIONS.IOS.LOCATION_ALWAYS, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]
      : [
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        ];
  }

  protected getCameraPermissions(): Permission[] {
    return isIos
      ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY]
      : [
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ];
  }

  protected getContactsPermission(): Permission {
    return isIos ? PERMISSIONS.IOS.CONTACTS : PERMISSIONS.ANDROID.READ_CONTACTS;
  }
  getRecordAudioPermission(): Permission[] {
    return isIos
      ? [PERMISSIONS.IOS.MICROPHONE]
      : [
          PERMISSIONS.ANDROID.RECORD_AUDIO,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ];
  }
  async requestRecordAudio(): Promise<boolean> {
    try {
      return await this.checkRecordAudio();
    } catch (e) {
      try {
        const results = await requestMultiple(this.getRecordAudioPermission());
        if (this.allPermissionsAreGranted(results)) {
          return true;
        } else {
          return Promise.reject('Need Permissions For Audio Record ');
        }
      } catch (e) {
        return Promise.reject(false);
      }
    }
  }
  async checkRecordAudio(): Promise<boolean> {
    try {
      const results: Record<string, PermissionStatus> = await checkMultiple(
        this.getRecordAudioPermission(),
      );
      if (this.allPermissionsAreGranted(results)) {
        return true;
      } else {
        return Promise.reject('Needs Permission ');
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
  allPermissionsAreGranted(results: Record<string, PermissionStatus>): boolean {
    return Object.values(results).every(
      (permissionResult: PermissionStatus) =>
        permissionResult === RESULTS.GRANTED,
    );
  }
}

export const PermissionHandlerClient = new PermissionHandler();
