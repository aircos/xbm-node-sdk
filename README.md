# xbm-sdk

小斑马 SDK

## 功能列表

-   授权登录

## Installation

```
$ npm install xbm-node-sdk
```

## Test

```
$ npm run mocha
$ npm run cov
```

## Usage

引入 UserCenter 并实例化

```javascript
var UserCenter = require('xbm-sdk').UserCenter;
var uc = new UserCenter('13800138000', '10086');
```

获取用户 token

```javascript
uc.get_token(function (err, token) {
  if (err) {
    console.log(err);
  }

  var token = token;
})
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## 版本历史

- v1.0.1 初始化

## 欢迎fork和反馈

- write by `i5ting` shiren1118@126.com

如有建议或意见，请在issue提问或邮件

## License

this repo is released under the [MIT License](http://www.opensource.org/licenses/MIT).