import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../../component/user/user'
import { getMsgList, recvMsg } from '../../redux/chat.redux'

function Msg() {
  return <h1>消息列表</h1>
}

@connect(
  state => state,
  { getMsgList, recvMsg }
)
class Dashboard extends React.Component {
  componentDidMount() {
   if (!this.props.chat.chatmsg.length) {
    this.props.getMsgList()
    this.props.recvMsg()
   }
  }
  render() {
    const { pathname } = this.props.location
    const user = this.props.user
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      }, {
        path: '/genius',
        text: 'BOSS',
        icon: 'job', 
        title: 'BOSS列表',
        component: Genius,
        hide: user.type === 'boss'
      }, {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      }, {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    return (
      <div>
        <NavBar className='fixed-header' mode='dark'>{navList.find(item => item.path === pathname).title}</NavBar>
        <div style={{ marginTop: 45 }}>
          <Switch>
            {navList.map(item => (
              <Route key={item.path} path={item.path} component={item.component}></Route>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard
