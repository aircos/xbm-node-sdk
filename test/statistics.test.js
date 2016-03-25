var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();

var UserCenter = require('../index.js').UserCenter;
var Statistics = require('../index.js').Statistics;

var mobile = '13800138000';
var password = '10086';

var uc = new UserCenter(mobile, password);
var statistics = new Statistics();

/**
 * 测试 lib/statistics.js 文件
 * @Author   https://github.com/modood
 * @DateTime 2016-03-22T15:02:02+0800
 */
describe('TEST file lib/statistics.js', function () {
  describe('TEST function count_by_tag_arr', function () {
    it('成功,根据标记统计销售数量', function (done) {
      uc.get_token(function (err, token) {
        should.not.exist(err);
        statistics.count_by_tag_arr(token, [
            "56f0a402dfab2cc723e8af81"
        ], 1, function (err, result) {
          should.not.exist(err);
          should.exist(result);
          result.should.be.an('Array');
          result.length.should.be.above(0);
          done();
        })
      })
    });
    it('失败,tag_arr 格式不正确', function (done) {
      uc.get_token(function (err, token) {
        should.not.exist(err);
        statistics.count_by_tag_arr(token, [], 1, function (err, result) {
          should.exist(err);
          should.not.exist(result);
          err.should.be.an('Object');
          err.code.should.be.equal(-1);
          err.msg.should.be.equal('ERR: tag_arr is not in the correct format!');
          done();
        })
      })
    });
    it('失败,status 格式不正确', function (done) {
      uc.get_token(function (err, token) {
        should.not.exist(err);
        statistics.count_by_tag_arr(token, [
            "56f0a402dfab2cc723e8af81"
        ], undefined, function (err, result) {
          should.exist(err);
          should.not.exist(result);
          err.should.be.an('Object');
          err.code.should.be.equal(-1);
          err.msg.should.be.equal('ERR: status is not in the correct format!');
          done();
        })
      })
    });
  })
})