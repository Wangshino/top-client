/* eslint-disable indent */
/* eslint-disable camelcase */
import { format } from 'date-fns';
import axios, { AxiosResponse } from 'axios';
import * as Stream from 'stream';
import FormData = require('form-data');
const JSONbig = require('json-bigint')({ storeAsString: true });

import { sign, getApiResponseName } from './utils';

type AppConfig = {
  app_key: string;
  app_secret: string;
  access_token: string;
};

type ApiParam = {
  [index: string]: any;
};

class TaobaoClient {
  basicParam: Record<string, string> = {};

  apiUrl: string;

  appsecret: string;

  constructor(config: AppConfig) {
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
  async invoke(method: string, apiParam: ApiParam): Promise<AxiosResponse['data']> {
    const url = this.apiUrl;
    // top基础参数 + api 业务参数
    const fullParams: Record<string, any> = {};
    // top基础参数
    const basic4query: Record<string, any> = {};
    let isUpload = false;
    let form = new FormData();

    this.basicParam.method = method;
    this.basicParam.timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    Object.assign(fullParams, this.basicParam);
    Object.assign(basic4query, this.basicParam);

    for (const param of Object.keys(apiParam)) {
      if (Buffer.isBuffer(apiParam[param]) || apiParam[param] instanceof Stream) {
        // 如果是需要上传文件的api
        isUpload = true;
      }
      // 如果 api 业务参数是普通的 obj 的话，需要转成字符串
      if (
        typeof apiParam[param] === 'object' &&
        !Buffer.isBuffer(apiParam[param]) &&
        !(apiParam[param] instanceof Stream)
      ) {
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
    basic4query.sign = sign(fullParams, this.appsecret);
    fullParams.sign = basic4query.sign;

    if (isUpload) {
      for (const param of Object.keys(apiParam)) {
        form.append(param, apiParam[param]);
      }
    } else {
      form = null;
    }

    return isUpload
      ? axios.post(url, form, {
          headers: form.getHeaders(),
          params: basic4query,
          timeout: 4e3,
          transformResponse: [
            (data) => {
              data = JSONbig.parse(data);
              if (data.error_response) {
                return data.error_response;
              }
              // Do whatever you want to transform the data
              return data[getApiResponseName(method)];
            },
          ],
        })
      : axios.post(
          url,
          {},
          {
            params: fullParams,
            timeout: 4e3,
            transformResponse: [
              (data) => {
                data = JSONbig.parse(data);
                if (data.error_response) {
                  return data.error_response;
                }
                // Do whatever you want to transform the data
                return data[getApiResponseName(method)];
              },
            ],
          }
        );
  }
}

export default TaobaoClient;
