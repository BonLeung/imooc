import React from 'react'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user.redux'
import Logo from '../../component/logo/logo'

@connect(
  state => state.user,
  { register }
)
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'boss'
    }
  }
  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  handleRegister() {
    this.props.register(this.state)
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : ''}
        <Logo></Logo>
        <List>
          {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : ''}
          <InputItem clear onChange={(value) => this.handleChange('user', value)}>用户名</InputItem>
          <InputItem type='password' clear onChange={(value) => this.handleChange('pwd', value)}>密码</InputItem>
          <InputItem type='password' clear onChange={(value) => this.handleChange('repeatpwd', value)}>确认密码</InputItem>
          <WhiteSpace />
          <List renderHeader={() => '请选择你的类型'}>
            <RadioItem checked={this.state.type === 'genius'} onChange={(value) => this.handleChange('type', 'genius')}>
              牛人
            </RadioItem>
            <RadioItem checked={this.state.type === 'boss'} onChange={(value) => this.handleChange('type', 'boss')}>
              BOSS
            </RadioItem>
          </List>
        </List>
        <Button type='primary' onClick={this.handleRegister.bind(this)}>注册</Button>
      </div>
    )
  }
}

export default Register
