var request = require('request')

/**
 * 简单封装 HTTP get请求
 * 
 * @param    {String}                  uri      请求接口地址
 * @param    {Function}                callback 回调函数
 */

var get = function (uri, callback) {
  request(uri, function (err, res, body) {
    if (err) return callback(err);

    return callback(null, res, body);
  })
}

module.exports = get;