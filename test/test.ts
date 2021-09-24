import * as fs from 'fs';
import * as path from 'path';
import { format } from 'date-fns';
import jsonBigInt = require('json-bigint');

import TaobaoClient from '../src/index';
import config from './config'; // Use your own key to run tests.

describe('Testing taobao top sdk', () => {
  const client = new TaobaoClient(config);
  let pictureId = '';
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  test('Get time', async () => {
    const { data } = await client.invoke('taobao.time.get', {});
    delete data.request_id;
    expect(data).toEqual({ time: format(new Date(), 'yyyy-MM-dd HH:mm:ss') });
  });

  test('Get time twice', async () => {
    await delay(2000);
    const { data } = await client.invoke('taobao.time.get', {});
    delete data.request_id;
    expect(data).toEqual({ time: format(new Date(), 'yyyy-MM-dd HH:mm:ss') });
  });

  // 现在没有
  test('Upload picture', async () => {
    const buffer = fs.createReadStream(path.join(__dirname, '..', '..', 'test', 'ok.png'));
    const { data } = await client.invoke('taobao.picture.upload', {
      picture_category_id: 0,
      image_input_title: 'test.png',
      img: buffer,
    });
    console.log(JSON.stringify(data));
    console.log();
    pictureId = data.picture.picture_id;
    delete data.request_id;
    expect(data.picture).toHaveProperty('picture_id');
  });

  test('taobao.picture.get', async () => {
    const { data } = await client.invoke('taobao.picture.get', {
      title: 'test.png',
    });
    delete data.request_id;
    expect(data.pictures).toHaveProperty('picture');
  });
});
