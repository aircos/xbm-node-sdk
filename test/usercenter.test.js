var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();

var UserCenter = require('../index.js').UserCenter;

var mobile = '13800138000';
var password = '10086';

/**
 * 测试 lib/usercenter.js 文件
 * @Author   https://github.com/modood
 * @DateTime 2016-03-22T15:02:02+0800
 */
describe('TEST file lib/usercenter.js', function () {
  describe('TEST function get_token', function () {
    it('成功，获取token', function (done) {
      var uc = new UserCenter(mobile, password);
      uc.get_token(function (err, token) {
        should.not.exist(err);
        should.exist(token);
        token.should.be.an('String');
        done();
      })
    });
    it('失败，密码错误', function (done) {
      var uc = new UserCenter(mobile, password + '1');
      uc.get_token(function (err, token) {
        should.exist(err);
        should.not.exist(token);
        err.code.should.be.equal(122009);
        done();
      })
    });
  })

  describe('TEST function get_user_info', function () {
    it('成功，获取用户信息', function (done) {
      var uc = new UserCenter(mobile, password);
      uc.get_token(function (err, token) {
        should.not.exist(err);
        uc.get_user_info(token, function (err, user_info) {
          should.not.exist(err);
          should.exist(user_info);
          user_info.should.be.an('Object');
          user_info.mobile.should.be.equal(mobile);
          done();
        })
      })
    });
    it('失败，token信息错误', function (done) {
      var uc = new UserCenter();

      uc.get_user_info('this is not a token', function (err, user_info) {
        should.exist(err);
        err.msg.should.be.equal('token信息错误')
        done();
      })
    });
    it('失败，没有提供token', function (done) {
      var uc = new UserCenter();

      uc.get_user_info(undefined, function (err, user_info) {
        should.exist(err);
        err.msg.should.be.equal('没有提供token')
        done();
      })
    });
  })
})