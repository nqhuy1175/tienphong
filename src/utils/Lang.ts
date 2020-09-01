import _ from 'lodash';

export function isVideoAsset(type?: string): boolean {
  if (!_.isString(type)) return false;
  return type.split('/')[0] === 'video';
}

export function isImageAsset(type?: string): boolean {
  if (!_.isString(type)) return false;
  return ['image', 'photo'].includes(type.split('/')[0]);
}

export function isPhoneNumber(phone: string | number): boolean {
  if (typeof phone === 'number') phone = phone.toString();
  if (phone.length < 9) return false;
  const regexPhone = /((\+84|0)9[0|1|2|3|4|6|7|8|9]|(\+84|0)8[1|2|3|4|5|6|7|8|9]|(\+84|0)3[2|3|4|5|6|7|8|9]|(\+84|0)7[0|6|7|8|9]|(\+84|0)5[6|8|9|2]|(\+84|0)0[9])+([0-9]{7})\b/;
  // console.log(regexPhone.test(phone));
  return regexPhone.test(phone);
}

export function isEmail(email: string): boolean {
  if (email.length < 9) return false;
  const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(email.toLowerCase());
}

/**
 * check whether string, array, object is empty, null or undefined
 * @param data
 * @returns {boolean}
 */
export function isNullOrEmpty(data: any | any[]): boolean {
  if (!data) {
    return true;
  }
  if (data instanceof Array) {
    return data.length === 0;
  }
  if (typeof data === 'number') {
    return data === 0;
  }
  if (typeof data === 'undefined') {
    return true;
  }
  if (typeof data === 'object') {
    return Object.keys(data).length === 0;
  }
  let output = data;
  if (typeof output !== 'string') {
    output = output.toString();
  }
  output = output.trim();

  return output.length <= 0;
}

/**
 * check whether the provided url is a link or not
 * @returns {boolean}
 * @private
 * @param url
 */
export function isLink(url: string) {
  try {
    const regex = new RegExp(
      '^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$',
      'gm'
    );
    return regex.test(url);
  } catch (e) {
    console.log(e);
    return false;
  }
}

/**
 * check if a string contain any value from array
 * @param string
 * @param values
 * @returns {boolean}
 * @private
 */
export function includesOne(string: string, values: any[]) {
  try {
    const regex = new RegExp('(' + values.join('|') + ')', 'gm');
    return regex.test(string);
  } catch (e) {
    console.log(e);
    return false;
  }
}
