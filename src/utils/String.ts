/**
 * convert object to Json string
 * @param obj
 * @param filter
 * @param space
 */
export function stringify(obj: object, filter = null, space = '\t'): string {
  const plainObject = {};
  Object.getOwnPropertyNames(obj).forEach((key) => {
    // @ts-ignore
    plainObject[key] = obj[key];
  });
  return JSON.stringify(plainObject, filter, space);
}

/**
 * remove all html tags
 * @param str
 */
export function htmlClean(str: string) {
  str = str.replace(/<\/?[^>]+(>|$)/g, ''); // remove html tag
  str = str.replace(/^\s+|\s+$/g, ''); // remove break line
  str = str.trim();
  return str.replace(/&nbsp;/g, '');
}

/**
 * convert string to unicode
 * @param input
 * @returns string
 */
export function unicode(input: string) {
  // Đổi ký tự có dấu thành không dấu
  return input
    .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
    .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
    .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
    .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
    .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
    .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
    .replace(/đ/gi, 'd');
}

export function slugify(string: string) {
  string = unicode(string);
  const a =
    'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b =
    'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz______';
  const p = new RegExp(a.split('').join('|'), 'g');

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '_') // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, 'and') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '_') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}
