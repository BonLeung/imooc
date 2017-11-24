import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import BrowserCookies from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'

@connect(
  state => state.user,
  { logoutSubmit }
)
class User extends React.Component {
  logout() {
    const alert = Modal.alert
    alert('注销', '确认退出吗？', 
      [
        {text: '取消', onPress: () => {console.log('cancel')}}, 
        {text: '确认', onPress: () => {
          BrowserCookies.erase('userid')
          this.props.logoutSubmit()
        }}
      ]
    )
  }
  render() {
    const Item = List.Item
    const Brief = Item.Brief
    return (
      this.props.user ?
      <div>
        <Result 
          img={<img src={require(`../img/${this.props.avatar}.png`)} alt="" style={{width: 50}} />} 
          title={this.props.title}
          message={this.props.type === 'boss' ? this.props.company : null}
        />
        <List renderHeader={() => '简介'}>
          <Item multipleLine>
            {this.props.title}
            {this.props.desc.split('\n').map((item, index) => (
              <Brief key={index}>{item}</Brief>  
            ))}
            {this.props.money ? <Brief>{this.props.money}</Brief> : null} 
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={this.logout.bind(this)}>退出登录</Item>
        </List>
      </div>
      :
      <Redirect to={this.props.redirectTo}></Redirect>
    )
  }
}

export default User