"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable indent */
/* eslint-disable camelcase */
const date_fns_1 = require("date-fns");
const axios_1 = require("axios");
const Stream = require("stream");
const FormData = require("form-data");
const utils_1 = require("./utils");
class TaobaoClient {
    constructor(config) {
        this.basicParam = {};
        this.basicParam.v = '2.0';
        this.basicParam.sign_method = 'md5';
        this.basicParam.session = config.access_token;
        this.basicParam.app_key = config.app_key;
        this.basicParam.format = 'json';
        this.basicParam.timestamp = '';
        this.basicParam.method = '';
        this.appsecret = config.app_secret;
        this.apiUrl = 'https://eco.taobao.com/router/rest';
    }
    /**
     * Invoke API
     *
     * @param  {String} method API Name
     * @param  {Object} apiParam API Business parameters
     * @return {Promise<AxiosResponse>} axios response
     */
    invoke(method, apiParam) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.apiUrl;
            // top基础参数 + api 业务参数
            const fullParams = {};
            // top基础参数
            const basic4query = {};
            let isUpload = false;
            let form = new FormData();
            this.basicParam.method = method;
            this.basicParam.timestamp = (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss');
            Object.assign(fullParams, this.basicParam);
            Object.assign(basic4query, this.basicParam);
            for (const param of Object.keys(apiParam)) {
                if (Buffer.isBuffer(apiParam[param]) || apiParam[param] instanceof Stream) {
                    // 如果是需要上传文件的api
                    isUpload = true;
                }
                // 如果 api 业务参数是普通的 obj 的话，需要转成字符串
                if (typeof apiParam[param] === 'object' &&
                    !Buffer.isBuffer(apiParam[param]) &&
                    !(apiParam[param] instanceof Stream)) {
                    apiParam[param] = JSON.stringify(apiParam[param]);
                }
                // 向 fullParams 加入 业务级参数
                Object.defineProperty(fullParams, param, {
                    value: apiParam[param],
                    writable: true,
                    enumerable: true,
                });
            }
            // 签名算法
            basic4query.sign = (0, utils_1.sign)(fullParams, this.appsecret);
            fullParams.sign = basic4query.sign;
            if (isUpload) {
                for (const param of Object.keys(apiParam)) {
                    form.append(param, apiParam[param]);
                }
            }
            else {
                form = null;
            }
            return isUpload
                ? axios_1.default.post(url, form, {
                    headers: form.getHeaders(),
                    params: basic4query,
                    timeout: 4e3,
                    transformResponse: [
                        (data) => {
                            console.log(typeof data);
                            data = JSON.parse(data);
                            // console.log('data', data);
                            if (data.error_response) {
                                return data.error_response;
                            }
                            // Do whatever you want to transform the data
                            return data[(0, utils_1.getApiResponseName)(method)];
                        },
                    ],
                })
                : // axios({
                    //     method: 'POST',
                    //     url,
                    //     data: { ...form },
                    //     params: basic4query,
                    //     timeout: 4e3,
                    //     headers: form.getHeaders(),
                    //     transformResponse: [
                    //       (data) => {
                    //         data = JSON.parse(data);
                    //         if (data.error_response) {
                    //           return data.error_response;
                    //         }
                    //         // Do whatever you want to transform the data
                    //         return data[`${getApiResponseName(method)}`];
                    //       },
                    //     ],
                    //   })
                    axios_1.default.post(url, {}, {
                        params: fullParams,
                        timeout: 4e3,
                        transformResponse: [
                            (data) => {
                                data = JSON.parse(data);
                                if (data.error_response) {
                                    return data.error_response;
                                }
                                // Do whatever you want to transform the data
                                return data[(0, utils_1.getApiResponseName)(method)];
                            },
                        ],
                    });
        });
    }
}
exports.default = TaobaoClient;
//# sourceMappingURL=index.js.map