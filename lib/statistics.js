var is = require('is_js');
var post = require('../utils/post.js');

var Statistics = function () {
  // body...
}

Statistics.prototype.count_by_tag_arr = function (token, tag_arr, status, callback) {
  if (is.not.array(tag_arr) || is.empty(tag_arr)){
    return callback({code: -1, msg: 'ERR: tag_arr is not in the correct format!'})
  };

  if (is.not.number(Number(status))) {
    return callback({code: -1, msg: 'ERR: status is not in the correct format!'})
  };

  post('http://admin.cloud.api.mengxiaoban.cn/v1/statistics/link', {
    token: token,
    tag_arr: tag_arr,
    status: status
  }, function (err, res, body) {
    if (err) return callback(err);
    if (body.data === null) return callback(body.status);

    return callback(null, body.data);
  })
}

module.exports = Statistics;
