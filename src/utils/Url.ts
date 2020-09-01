import parse from 'url-parse';

/**
 * get url query params
 * @returns {Object}
 * @param qs
 */
export function getQueryParams(qs: string) {
  qs = qs.split('+').join(' ');
  const params: ObjectType = {};
  let tokens: RegExpExecArray | null;
  const re = /[?&]?([^=]+)=([^&]*)/g;
  // tslint:disable-next-line: no-conditional-assignment
  while ((tokens = re.exec(qs)) !== null) {
    params[decodeURIComponent(tokens![1])] = decodeURIComponent(tokens![2]);
  }
  return params;
}

/**
 * push to specific screen with received link
 * @returns {Object}
 * @param link
 */
export function pareUrl(link: string) {
  const Url: ObjectType = parse(link);
  const {pathname, query} = Url;
  Url.pathname = pathname.replace('.html', '').substr(1);
  Url.params = getQueryParams(query);
  return Url;
}

export function getUrlObjectId(url: string) {
  try {
    const id = url.substring(url.lastIndexOf('/') + 1, url.indexOf('.html'));
    return parseInt(id, 10) || 0;
  } catch (e) {
    console.log(e);
  }
  return 0;
}
