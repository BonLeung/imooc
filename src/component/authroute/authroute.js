import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from '../../redux/user.redux'

@withRouter
@connect(
  null,
  { loadData }
)
class AuthRoute extends React.Component {
  componentDidMount() {
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname) !== -1) {
      return null
    }
    // 获取用户信息
    axios.get('/user/info').then(res => {
      if(res.status === 200) {
        if (res.data.code === 0) {
          // 有登录信息
          this.props.loadData(res.data.data)
        } else {
          this.props.history.push('/login')
        }
      }
    })
    // 是否登录
    // 现在的 url 地址，login 是不需要跳转的
    // 用户的 type，身份是 boss 还是 牛人
    // 用户是否完善信息（选择头像，个人简介）
  }
  render() {
    return null;
  }
}

export default AuthRoute
