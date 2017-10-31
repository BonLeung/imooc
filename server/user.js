const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

Router.get('/list', function(req, res) {
  User.find({}, function(error, doc) {
    if (!error) {
      return res.json(doc)
    }
  })
})

Router.post('/register', function(req, res) {
  console.log(req)
  const {user, pwd, type} = req.body
  User.findOne({user: user}, function(error, doc) {
    if (doc) {
      return res.json({code: 1, msg: '用户已存在'})
    }
    User.create({user, pwd, type}, function(error, doc) {
      if (error) {
        return res.json({code: 1, msg: '服务器出错，注册失败'})
      }
      return res.json({code: 0})
    })
  })
})

Router.get('/info', function(req, res) {
  // 用户有没有 cookie
  return res.json({
    code: 0
  })
})

module.exports = Router
