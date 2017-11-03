const express = require('express')
const util = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

// 过滤不需要的字段
const _filter = {
  'pwd': 0,
  '__v': 0
}

Router.get('/list', function(req, res) {
  const { type } = req.query
  User.find({ type }, function(error, doc) {
    if (!error) {
      return res.json({
        code: 0,
        data: doc
      })
    }
  })
})

Router.post('/update', function(req, res) {
  const { userid } = req.cookies
  if (!userid) {
    return res.json({
      code: 1
    })
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, function(error, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({
      code: 0,
      data
    })
  })
})

Router.post('/login', function(req, res) {
  const { user, pwd } = req.body
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function(error, doc) {
    if (!doc) {
      return res.json({
        code: 1,
        msg: '用户名不存在或密码错误'
      })
    }
    res.cookie('userid', doc._id)
    return res.json({
      code: 0,
      data: doc
    })
  })
})

Router.post('/register', function(req, res) {
  const {user, pwd, type} = req.body
  User.findOne({user: user}, function(error, doc) {
    if (doc) {
      return res.json({code: 1, msg: '用户已存在'})
    }
    const userModel = new User({user, type, pwd: md5Pwd(pwd)})
    userModel.save(function(error, doc) {
      if (error) {
        return res.json({code: 1, msg: '服务器出错，注册失败'})
      }
      const { user, type, _id } = doc
      res.cookie('userid', _id)
      return res.json({
        code: 0,
        data: {user, type, _id}
      })
    })
  })
})

Router.get('/info', function(req, res) {
  const { userid } = req.cookies
  // 用户有没有 cookie
  if (!userid) {
    return res.json({
      code: 1
    })
  }
  User.findOne({_id: userid}, _filter, function(error, doc) {
    if (error) {
      return res.json({
        code: 1,
        msg: '后端出错了'
      })
    }
    if (doc) {
      return res.json({
        code: 0,
        data: doc
      })
    }
  })

})

function md5Pwd(pwd) {
  const salt = 'imooc_bangge'
  return util.md5(util.md5(pwd + salt))
}

module.exports = Router
