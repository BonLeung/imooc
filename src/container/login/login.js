import React from 'react'
import Logo from '../../component/logo/logo.js'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'

@connect(
  state => state.user,
  { login }
)
@imoocForm
class Login extends React.Component {
  handleLogin() {
    this.props.login(this.props.state)
  }
  register() {
    this.props.history.push('/register')
  }
  render() {
    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo} /> : ''}
        <Logo></Logo>
        <WingBlank>
          <List>
            {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : ''}
            <InputItem clear onChange={value => this.props.handleChange('user', value)}>用户</InputItem>
          <InputItem clear type='password' onChange={value => this.props.handleChange('pwd', value)}>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button type='primary' onClick={this.handleLogin.bind(this)}>登录</Button>
          <WhiteSpace />
          <Button type='primary' onClick={this.register.bind(this)}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login
