"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secureJsonParse = exports.getApiResponseName = exports.sign = void 0;
const md5 = require("md5");
const Stream = require("stream");
/**
 * Sign API request.
 * see http://open.taobao.com/doc/detail.htm?id=111#s6
 *
 * @param  {String} secret
 * @param  {Object} params
 * @return {String} sign string
 */
function sign(params, secret) {
    const args4sign = params;
    const sorted = Object.keys(args4sign).sort();
    let basestring = secret;
    for (const i of sorted) {
        const k = i;
        if (args4sign[k] instanceof Buffer || args4sign[k] instanceof Stream) {
            // ignore
            // basestring += k + args4sign[k].toString('utf-8');
            // basestring += k + JSON.stringify(args4sign[k]);
        }
        else if (typeof args4sign[k] === 'object') {
            basestring += k + JSON.stringify(args4sign[k]);
        }
        else {
            basestring += k + String(args4sign[k]);
        }
    }
    basestring += secret;
    console.log(basestring);
    return md5(basestring).toUpperCase();
}
exports.sign = sign;
/**
 * get API Response Name.
 *
 * @param  {String} apiName
 * @return {String} response result
 */
function getApiResponseName(apiName) {
    const reg = /\./g;
    if (apiName.match('^taobao'))
        apiName = apiName.substr(7);
    return `${apiName.replace(reg, '_')}_response`;
}
exports.getApiResponseName = getApiResponseName;
/**
 * secure json parse
 *
 * @param  {String} apiName
 * @return {String} response result
 */
function secureJsonParse(apiName) {
    return {};
}
exports.secureJsonParse = secureJsonParse;
//# sourceMappingURL=utils.js.map