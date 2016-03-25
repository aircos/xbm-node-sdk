var is = require('is_js');

var post = require('../utils/post.js');

var Stock = function () {
  // body...
}

/**
 * 创建货品
 * 
 * Examples:
 * ```javascript
 * var UserCenter = require('xbm-sdk').UserCenter;
 * var Stock = require('xbm-sdk').Stock;
 * 
 * var uc = new UserCenter('13800138000', '10086');
 * var stock = new Stock();

 *
 * uc.get_token(function (err, token) {
 *   if (err) {
 *     console.log(err);
 *   }
 *
 *   var token = token;
 *   
 *   stock.create_product(token, {
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
 * { __v: 0,
 *   created_minute: '05',
 *   created_hour: '10',
 *   created_day: '25',
 *   created_month: '03',
 *   created_year: '2016',
 *   created_at_ms: '1458871525813',
 *   name: '手机',
 *   name_pinyin: 'shou;ji',
 *   user_id: '56f0ea23a739cccb6061f764',
 *   user_mobile: '13800138000',
 *   xbm_id: '100001',
 *   is_deleted: false,
 *   updated_at: '2016-03-25T02:05:25.812Z',
 *   created_at: '2016-03-25T02:05:25.812Z',
 *   _id: '56f49ce5540e29677c6d6c43',
 *   pictures: [] 
 * } 
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
