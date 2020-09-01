import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export interface AppStorage {
  AccessToken: string | null;
  CallbackLoginSuccess?: CallbackFunction;
  CurrentScreenStackId: string;
  DeviceInfo: DeviceInfo;
  EventEmitter?: any;
  FcmToken?: string;
  NotificationOpen?: Notification;
  IsLogin?: boolean;
  Target?: string;
  User: FirebaseAuthTypes.User | null;
  NavigationConstants: NavigationConstants;
}
