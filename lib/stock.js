var is = require('is_js');

var post = require('../utils/post.js');

var Stock = function () {
  // body...
}

/**
 * 创建
 * 
 * Examples:
 * ```javascript
 * var UserCenter = require('xbm-sdk').UserCenter;
 * var Stock = require('xbm-sdk').Stock;
 * var uc = new UserCenter('13800138000', '10086');
 *
 * uc.get_token(function (err, token) {
 *   if (err) {
 *     console.log(err);
 *   }
 *
 *   var token = token;
 *   
 *   Stock.create_product(token, {
 *     name: '手机'
 *   }, function (err, product) {
 *     if (err) {
 *       console.log(err);
 *     }
 *   
 *     var product = product;
 *   })
 * })
 * ```
 * 
 * Result:
 * ```
 * ```
 * 
 * Callback:
 * ```
 * err          创建的货品信息出现异常时的异常对象
 * product      成功时创建的货品信息
 * ```
 * @param    {String}                  token        用户 token
 * @param    {Object}                  product_info 货品信息
 * @param    {Function}                callback     回调函数
 */
Stock.prototype.create_product = function (token, product_info, callback) {
  if (is.not.object(product_info) || is.empty(product_info.name) || is.not.string(product_info.name)) {
    return callback({code: -1, msg: 'ERR: product name is not in the correct format!'})
  };

  product_info.token = token;

  post('http://stock.cloud.api.mengxiaoban.cn/v1/product', product_info, function (err, res, body) {
    if (err) return callback(err);
    if (body.data === null) return callback(body.status);

    return callback(null, body.data);
  })
}

module.exports = Stock;
