import * as md5 from 'md5';
import * as Stream from 'stream';

/**
 * Sign API request.
 * see http://open.taobao.com/doc/detail.htm?id=111#s6
 *
 * @param  {String} secret
 * @param  {Object} params
 * @return {String} sign string
 */
export function sign(params: { [index: string]: any }, secret: string): string {
  const args4sign = params;
  const sorted: string[] = Object.keys(args4sign).sort();
  let basestring = secret;
  for (const i of sorted) {
    const k = i;
    if (args4sign[k] instanceof Buffer || args4sign[k] instanceof Stream) {
      // ignore
    } else if (typeof args4sign[k] === 'object') {
      basestring += k + JSON.stringify(args4sign[k]);
    } else {
      basestring += k + String(args4sign[k]);
    }
  }
  basestring += secret;
  return md5(basestring).toUpperCase();
}

/**
 * get API Response Name.
 *
 * @param  {String} apiName
 * @return {String} response result
 */
export function getApiResponseName(apiName: string): string {
  const reg = /\./g;
  if (apiName.match('^taobao')) apiName = apiName.substr(7);
  return `${apiName.replace(reg, '_')}_response`;
}
