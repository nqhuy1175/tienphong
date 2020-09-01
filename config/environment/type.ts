export type ENV = 'development' | 'production';

export interface Config {
  ANDROID_CODE_PUSH_DEPLOYMENT_KEY: string;
  API_URL: string;
  APP_NAME: string;
  AUTH_REQUIRED: boolean;
  BASE_URL: string;
  CDN_UPLOAD_URL: string;
  GOOGLE_WEB_CLIENT_ID: string;
  IOS_CODE_PUSH_DEPLOYMENT_KEY: string;
  ON_BOARDING_REQUIRED: boolean;
  REDUX_KEY_STORE: string;
  STORE_VERSION: number;
  ENV: ENV;
  APP_STORE_ID: string;
  PLAY_STORE_ID: string;
}
