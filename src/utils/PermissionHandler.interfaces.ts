import {
  Permission,
  LocationAccuracy,
  NotificationSettings,
} from 'react-native-permissions';

import {
  LocationAccuracyOptions,
  NotificationOption,
  NotificationsResponse,
  PermissionStatus,
  Rationale,
} from 'react-native-permissions/src/types';

export interface IPermissionCheck {
  hasPermission(permission: Permission): Promise<boolean>;
  hasPermissions(permissions: Permission[]): Promise<boolean>;
  hasReadStoragePermission(): Promise<boolean>;
  hasWriteStoragePermission(): Promise<boolean>;
  hasLocationPermission(): Promise<boolean>;
  hasCameraPermission(): Promise<boolean>;
  hasLocationAccuracyPermission(): Promise<LocationAccuracy>;
  hasNotificationsPermissions(): Promise<{
    status: PermissionStatus;
    settings: NotificationSettings;
  }>;
}

export interface IPermissionRequest {
  requestPermission(
    permission: Permission,
    rationale?: Rationale,
  ): Promise<PermissionStatus>;

  requestPermissions<P extends Permission[]>(
    permissions: P,
  ): Promise<Record<P[number], PermissionStatus>>;

  requestLocationPermission(): Promise<boolean>;

  requestCameraPermission(): Promise<boolean>;

  requestContactsPermission(): Promise<boolean>;

  requestReadStoragePermission(): Promise<boolean>;

  requestWriteStoragePermission(): Promise<boolean>;

  requestLocationAccuracy(
    options: LocationAccuracyOptions,
  ): Promise<LocationAccuracy>;

  requestNotifications(
    options: NotificationOption[],
  ): Promise<NotificationsResponse>;
}

export interface IPermissionAction {
  openSettings(): Promise<boolean>;
  openLimitedPhotoLibraryPicker(): Promise<void>;
}
