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
const index_1 = require("../src/index");
const config_1 = require("./config"); // Use your own key to run tests.
describe('Testing taobao top sdk', () => {
    const client = new index_1.default(config_1.default);
    let pictureId = '';
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // test('Get time', async () => {
    //   const { data } = await client.invoke('taobao.time.get', {});
    //   delete data.request_id;
    //   expect(data).toEqual({ time: format(new Date(), 'yyyy-MM-dd HH:mm:ss') });
    // });
    // test('Get time twice', async () => {
    //   await delay(2000);
    //   const { data } = await client.invoke('taobao.time.get', {});
    //   delete data.request_id;
    //   expect(data).toEqual({ time: format(new Date(), 'yyyy-MM-dd HH:mm:ss') });
    // });
    // 现在没有
    test('Upload picture', () => __awaiter(void 0, void 0, void 0, function* () {
        // const buffer = fs.createReadStream(path.join(__dirname, '..', '..', 'test', 'ok.png'));
        // const { data } = await client.invoke('taobao.picture.upload', {
        //   picture_category_id: 0,
        //   image_input_title: 'test.png',
        //   img: buffer,
        // });
        // console.log(JSON.stringify(data));
        // console.log(
        // );
        // pictureId = data.picture.picture_id;
        // delete data.request_id;
        // expect(data.picture).toHaveProperty('picture_id');
    }));
    test('taobao.picture.get', () => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = yield client.invoke('taobao.picture.get', {
            title: 'test.png',
        });
        delete data.request_id;
        console.log(data);
        expect(data.pictures).toHaveProperty('picture');
    }));
    // test('Delete upload file', async () => {
    //   let a = jsonBigInt.parse(
    //     '{"picture_upload_response":{"picture":{"client_type":"client:computer","created":"2021-09-22 15:23:23","deleted":"0","modified":"2021-09-22 15:23:23","picture_category_id":0,"picture_id":1088407221979850343,"picture_path":"https://img.alicdn.com/imgextra/i1/353930884/O1CN01QtrMin1IOupZ2gCLA_!!353930884.png","pixel":"24x24","sizes":558,"status":"0","title":"test"},"request_id":"17dzjb7u7sfwq"}}'
    //   );
    //   // pictureId = a.picture_upload_response.picture.picture_id;
    //   console.log(pictureId, typeof pictureId);
    //   const { data } = await client.invoke('taobao.picture.delete', {
    //     picture_ids: '1088407221219304431,1088407219596644495',
    //   });
    //   // delete data.request_id;
    //   console.log(data);
    //   // expect(data).toHaveProperty('success', true);
    // });
});
//# sourceMappingURL=test.js.map