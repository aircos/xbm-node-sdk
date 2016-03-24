var request = require('request')

/**
 * 简单封装 HTTP POST请求
 * 
 * @param    {String}                  uri      请求接口地址
 * @param    {Object}                  data     请求参数
 * @param    {Function}                callback 回调函数
 */

var post = function (uri, data, callback) {
  request({
    method: 'POST',
    uri: uri,
    json: data
  }, function (err, res, body) {
    if (err) return callback(err);
    
    return callback(null, res, body);
  })
}

module.exports = post;