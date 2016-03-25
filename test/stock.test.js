var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();

var UserCenter = require('../index.js').UserCenter;
var Stock = require('../index.js').Stock;

var mobile = '13800138000';
var password = '10086';
var random_product_name = '货品_' + new Date().getTime();

var uc = new UserCenter(mobile, password);
var stock = new Stock();

/**
 * 测试 lib/stock.js 文件
 * @Author   https://github.com/modood
 * @DateTime 2016-03-22T15:02:02+0800
 */
describe('TEST file lib/stock.js', function () {
  describe('TEST function create_product', function () {
    it('成功创建货品', function (done) {
      uc.get_token(function (err, token) {
        should.not.exist(err);
        stock.create_product(token, {
          name: random_product_name
        }, function (err, product) {
          should.not.exist(err);
          should.exist(product);
          product.should.be.an('Object');
          product.user_mobile.should.be.equal(mobile);
          done();
        })
      })
    });
    it('失败货品名称已存在', function (done) {
      uc.get_token(function (err, token) {
        should.not.exist(err);
        stock.create_product(token, {
          name: random_product_name
        }, function (err, product) {
          should.exist(err);
          should.not.exist(product);
          err.should.be.an('Object');
          err.code.should.be.equal(100101);
          err.msg.should.be.equal('参数错误：货品名称已存在！');
          done();
        })
      })
    });
    it('失败货品名称格式不正确', function (done) {
      uc.get_token(function (err, token) {
        should.not.exist(err);
        stock.create_product(token, {}, function (err, product) {
          should.exist(err);
          should.not.exist(product);
          err.should.be.an('Object');
          err.code.should.be.equal(-1);
          err.msg.should.be.equal('ERR: product name is not in the correct format!');
          done();
        })
      })
    });
  })
  describe('TEST function list_products', function () {
    it('查看货品列表', function (done) {
      uc.get_token(function (err, token) {
        should.not.exist(err);
        stock.list_products(token, function (err, products) {
          should.not.exist(err);
          should.exist(products);
          products.should.be.an('Array');
          products.length.should.be.above(0);
          done();
        })
      })
    });
  })
})