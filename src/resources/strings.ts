export enum TokenTypes {
  'AccessToken' = 'AccessToken',
  'RefreshToken' = 'RefreshToken',
}
export const LOGIN_KEYS = {
  username: 'LOGIN_USERNAME',
  password: 'LOGIN_PASSWORD',
};
export const USER_ID_KEY = 'USER_D';
export const THEME_KEY = 'THEME_KEY';
export const DB_VERSION = 'DB_VERSION';
export const LAST_APP_VERSION_SKIPPED = 'LAST_APP_VERSION_SKIPPED';
export const DEFAULT_POSITION = 'DEFAULT_POSITION';
export const FORGOT_PASSWORD_TIMER_KEY = 'FORGOT_PASSWORD_TIMER';
export const ScreenNames = {
  EDMS: 'EDMS',
  MainScreenDrawer: 'MainScreenDrawer',
  PdfViewer: 'PdfViewer',
  Main: 'Main',
  FormBuilder: 'FormBuilder',
  TestScreen: 'TestScreen',
  Loading: 'Loading',
  Profile: 'Profile',
  Login: 'Login',
  Folders: 'Folders',
  FoldersTab: 'FoldersTab',
  DownloadsTabs: 'DownloadsTabs',
  Downloads: 'Downloads',
  Bookmarks: 'Bookmarks',
  FavoriteTabs: 'FavoriteTabs',
  FavoriteFoldersTab: 'FavoriteFoldersTab',
  FavoriteDocumentsTab: 'FavoriteDocumentsTab',
  Revisions: 'Revisions',
  SearchStack: 'SearchStack',
  SearchTabs: 'SearchTabs',
  SearchFolderAndDocumentTab: 'SearchFolderAndDocumentTab',
  SearchFolderTab: 'SearchFolderTab',
  SearchDocumentTab: 'SearchDocumentTab',
  ChangePassword: 'Change Password',
  ForgotPassword: 'Forgot Password',
  SendMobile: 'Confirm Mobile Number',
  ConfirmMobile: 'Enter Confirmation Code',
  ForgotChangePassword: 'ForgotChangePassword',
  ChatList: 'ChatList',
  Chat: 'Chat',
  GroupDetail: 'GroupProfile',
  GroupMembers: 'Members',
  GroupMedia: 'Media',
  MessageThread: 'Thread',
  OthersProfile: 'OthersProfile',
  TurnaroundList: 'TurnaroundList',
  TurnaroundHistory: 'TurnaroundHistory',
  Turnaround: 'Turnaround',
  GeneralOperations: 'General',
  RampArrivalOperations: 'Arrival',
  RampDepartureOperations: 'Departure',
  TerminalAndGate: 'Terminal',
  Notifications: 'Notifications',
  NotificationSettings: 'Notification Settings',
  ProfileInformation: 'ProfileInformation',
  termsAndConditions: 'termsAndConditions',
};

export const DATE_TIME_FORMATTERS = {
  serverDate: 'YYYY-M-D HH:mm:s',
  gregorianDate: 'YYYY-MM-DD',
  jalaliDate: 'jYYYY/jM/jD',
  jalaliFullDate: 'jD jMMMM jYYYY',
  time: 'HH:mm a',
  day: 'EEEE',
  monthName: 'LLLL',
  yearMonthDay: 'YYYY MMMM DD',
  monthNameDay: 'MMMM DD',
  fullDate: 'DD MMM. YYYY',
};
