import {Storage} from '@modules/storage';
import axios, {AxiosRequestConfig, Method} from 'axios';
import now from 'performance-now';

const config = {
  timeout: 20000,
  username: '',
  password: '',
  contentType: 'application/json',
  version: 2
};

export interface ApiResponse {
  msg?: string;
  status?: number;
  data?: any;
}

export async function request(
  url: string,
  method?: Method,
  data?: any,
  options?: AxiosRequestConfig
): Promise<ApiResponse> {
  const startTime = now();
  const headers: {[key: string]: string} = {
    'Content-Type': config.contentType
  };
  if (Storage.AccessToken) {
    headers.Authorization = 'Bearer ' + Storage.AccessToken;
  }

  if (url.includes('?')) {
    url = url + '&appId=7' + '&version=' + config.version;
  } else {
    url = url + '?appId=7' + '&version=' + config.version;
  }
  return new Promise<ApiResponse>((resolve) => {
    axios
      .request({
        url,
        method: method ?? 'GET',
        headers,
        timeout: config.timeout,
        data,
        ...options
      })
      .then((response) => {
        const endTime = now();
        console.log(
          'GET ',
          `${(endTime - startTime) / 1000}s GET DATA SUCCESS FROM URL: ${url}`
        );
        console.log(
          '%c Request Success:',
          'color: #4CAF50; font-weight: bold',
          response
        );
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve({} as ApiResponse);
        }
      })
      .catch((reason) => {
        console.log(
          '%c Request Error:',
          'color: #EC6060; font-weight: bold',
          url,
          reason
        );
        resolve({} as ApiResponse);
      });
  });
}
