import {Config} from './type';

export const production: Config = {
  APP_STORE_ID: '',
  PLAY_STORE_ID: '',
  API_URL: 'https://one.bbbnet.xyz/api/',
  BASE_URL: 'https://one.bbbnet.xyz/',
  APP_NAME: 'DEV.BIBABO',
  STORE_VERSION: 1.0,
  REDUX_KEY_STORE: 'DEV_BIBABO_REDUX_KEY_STORE',
  AUTH_REQUIRED: true,
  CDN_UPLOAD_URL: 'https://cdn.bbbnet.xyz/api/light/v1/image/upload',
  ANDROID_CODE_PUSH_DEPLOYMENT_KEY: 'x7TggjPbWVovsF9LGLlO7YQMKT9t6ZXFV1abj',
  IOS_CODE_PUSH_DEPLOYMENT_KEY: 'z2wf05Lu_N3VvIgdNa9JTOKvaXUeP4-zKlqZj',
  GOOGLE_WEB_CLIENT_ID:
    '874914829966-91t7i3cbqmch4npq2qkudins0r0ks9h3.apps.googleusercontent.com',
  ON_BOARDING_REQUIRED: false,
  ENV: 'production'
};
