var post = require('../utils/post.js')

var UserCenter = function (mobile, password) {
  this.mobile = mobile;
  this.password = password;
};

/**
 * 获取用户 token
 * 
 * Examples:
 * ```javascript
 * var UserCenter = require('xbm-sdk').UserCenter;
 * var uc = new UserCenter('13800138000', '10086');
 *
 * uc.get_token(function (err, token) {
 *   if (err) {
 *     console.log(err);
 *   }
 *
 *   var token = token;
 * })
 * ```
 * 
 * Result:
 * ```
 * eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NmYwZWEyM2E3MzljY2NiNjA2MWY3NjQiLCJ4Ym1faWQiOiIxMDAwMDEiLCJtb2JpbGUiOiIxMzgwMDEzODAwMCIsImNyZWF0ZWRfYXQiOiIyMDE2LTAzLTIyVDA2OjQ1OjU1LjA0N1oiLCJ pYXQiOjE0NTg2Mzk0NDJ9.s8q_vuB4OhWiykASJFHf8RVWGuiHHG-OxuHND8O2kaM
 * ```
 * 
 * Callback:
 * ```
 * err          获取用户 token 出现异常时的异常对象
 * token        成功时得到的用户 token
 * ```
 * 
 * @param    {Function}               callback 回调函数
 */
UserCenter.prototype.get_token = function (callback) {
  post('http://usercenter.mengxiaoban.cn/api/user/login', {
    logins: this.mobile,
    password: this.password
  }, function (err, res, body) {
    if (err) return callback(err);
    if (body.data === null) return callback(body.status);

    return callback(null, body.data.token);
  })
}

/**
 * 根据 token 获取用户基本信息
 * 
 * Examples:
 * ```javascript
 * var UserCenter = require('xbm-sdk').UserCenter;
 * var uc = new UserCenter('13800138000', '10086');
 *
 * uc.get_token(function (err, token) {
 *   if (err) {
 *     console.log(err);
 *   }
 *
 *   var token = token;
 *   
 *   uc.get_user_info(token, function (err, user_info) {
 *     if (err) {
 *       console.log(err);
 *     }
 *   
 *     var user_info = user_info;
 *   })
 * })
 * ```
 * 
 * Result:
 * ```
 * { 
 *   _id: '56f0ea23a739cccb6061f764',
 *   created_minute: '45',
 *   created_hour: '02',
 *   created_day: '22',
 *   created_month: '03',
 *   created_year: '2016',
 *   created_at_ms: '1458629155052',
 *   xbm_id: '100001',
 *   password: '$2a$10$/kFOvMalSbTEHt2IWjxvqetBGN83L47mfUCemirtcadEHTa6oCjrm',
 *   salt: '$2a$10$/kFOvMalSbTEHt2IWjxvqe',
 *   mobile: '13800138000',
 *   __v: 0,
 *   is_deleted: false,
 *   updated_at: '2016-03-22T06:45:55.047Z',
 *   created_at: '2016-03-22T06:45:55.047Z',
 *   language: 'zh_CN',
 *   is_verified_mobile: false,
 *   is_verified_email: false,
 *   is_verified_real_name: false,
 *   login_type: 'mobile' 
 * }
 * ```
 * 
 * Callback:
 * ```
 * err          根据 token 获取用户基本信息出现异常时的异常对象
 * user_info    成功时得到的用户信息
 * ```
 * 
 * @param    {String}                  token    用户 token
 * @param    {Function}                callback 回调函数
 */
UserCenter.prototype.get_user_info = function (token, callback) {
  post('http://usercenter.mengxiaoban.cn/api/user/info', {
    token: token
  }, function (err, res, body) {
    if (err) return callback(err);
    if (body.data === null) return callback(body.status);

    return callback(null, body.data);
  })
}

module.exports = UserCenter;
