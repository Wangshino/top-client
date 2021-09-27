import * as fs from 'fs';
import * as path from 'path';

import TaobaoClient from '../src/index';
import { sign, getApiResponseName } from '../src/utils';

// Use your own key to run tests.
// import config from './config';

describe('Testing utils', () => {
  test('Testing sign method', () => {
    const signParams = {
      method: 'taobao.item.seller.get',
      app_key: '12345678',
      session: 'test',
      timestamp: '2020-01-01 12:00:00',
      format: 'json',
      v: '2.0',
      sign_method: 'md5',
    };
    const md5Result = sign(signParams, 'secret');
    expect(md5Result).toEqual('A599E42DFE311554D1F1922126AC87E5');
  });
});

test('Testing getApiResponseName method', () => {
  const responseResult = getApiResponseName('taobao.itempropvalues.get');
  expect(responseResult).toEqual('itempropvalues_get_response');
});

// 测试请自行提供 config 文件，淘宝现在不提供测试账号和沙盒模式
// describe('Testing taobao top sdk', () => {
//   const client = new TaobaoClient(config);
//   let pictureId = '';
//   test('Get time', async () => {
//     const { data } = await client.invoke('taobao.time.get', {});
//     delete data.request_id;
//     const deltaTime = new Date().valueOf() - new Date(data.time).valueOf();
//     expect(deltaTime).toBeGreaterThanOrEqual(0);
//   });

//   test('Upload picture', async () => {
//     const buffer = fs.createReadStream(path.join(__dirname, '..', '..', 'test', 'ok.png'));
//     const { data } = await client.invoke('taobao.picture.upload', {
//       picture_category_id: 0,
//       image_input_title: 'test.png',
//       img: buffer,
//     });
//     pictureId = data.picture.picture_id;
//     delete data.request_id;
//     expect(data.picture).toHaveProperty('picture_id');
//   });

//   test('taobao.picture.get', async () => {
//     const { data } = await client.invoke('taobao.picture.get', {
//       picture_id: pictureId,
//     });
//     delete data.request_id;
//     expect(data.pictures).toHaveProperty('picture');
//   });

//   test('delete picture', async () => {
//     const { data } = await client.invoke('taobao.picture.delete', {
//       picture_ids: pictureId,
//     });
//     delete data.request_id;
//     expect(data).toHaveProperty('success', 'true');
//   });
// });
