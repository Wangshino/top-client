import * as fs from 'fs';
import * as path from 'path';

import TaobaoClient from '../src/index';
import config from './config'; // Use your own key to run tests.

describe('Testing taobao top sdk', () => {
  const client = new TaobaoClient(config);
  let pictureId = '';
  test('Get time', async () => {
    const { data } = await client.invoke('taobao.time.get', {});
    delete data.request_id;
    let deltaTime = new Date().valueOf() - new Date(data.time).valueOf();
    expect(deltaTime).toBeGreaterThanOrEqual(0);
  });

  test('Upload picture', async () => {
    const buffer = fs.createReadStream(path.join(__dirname, '..', '..', 'test', 'ok.png'));
    const { data } = await client.invoke('taobao.picture.upload', {
      picture_category_id: 0,
      image_input_title: 'test.png',
      img: buffer,
    });
    pictureId = data.picture.picture_id;
    delete data.request_id;
    expect(data.picture).toHaveProperty('picture_id');
  });

  test('taobao.picture.get', async () => {
    const { data } = await client.invoke('taobao.picture.get', {
      picture_id: pictureId,
    });
    delete data.request_id;
    expect(data.pictures).toHaveProperty('picture');
  });

  test('delete picture', async () => {
    const { data } = await client.invoke('taobao.picture.delete', {
      picture_ids: pictureId,
    });
    delete data.request_id;
    expect(data).toHaveProperty('success', 'true');
  });
});
