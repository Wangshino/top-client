# Top Client

## Features

1. Support promise.
2. Support upload File with Buffer.
3. TypeScript support.

## Get Started

### Default Configurable Options

```js
const client = new TaobaoClient({
  app_key: 'xxxxxx',
  app_secret: 'xxxxxxxxxxxxxxxxxxxxxxx',
  access_token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
});
```

### Most Common Usage

```js
(async function () {
  const { data } = await client.invoke('taobao.time.get', {});
  console.log(data);
})();
```

### Using Upload API

```js
const buffer = fs.readFileSync(path.join(__dirname, '..', '..', 'test', 'test.jpg'));

(async function () {
  const { data } = await client.invoke('taobao.item.propimg.upload', {
      properties: '1627207:14005752001',
      num_iid: '649945196848',
      image: buffer,
    });
  );
  console.log(data);
})();
```

## Contributing

This project welcomes contributions from the community. Contributions are accepted using GitHub pull requests.
