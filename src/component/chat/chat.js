import React from 'react'
import { List, InputItem } from 'antd-mobile'
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }
  componentDidMount() {
    socket.on('receivemsg', data => {
      this.setState({
        msg: [...this.state.msg, data.text]
      })
    })
  }
  handleSubmit() {
    socket.emit('sendmsg', {text: this.state.text})
    this.setState({
      text: ''
    })
  }
  render() {
   
    return (
      <div>
        {this.state.msg.map((item, index) => {
          return <p key={index}>{item}</p>
        })}
        <div className="stick-footer">
          <List>
            <InputItem 
              placeholder="请输入"
              value={this.state.text}
              onChange={val => this.setState({text: val})}
              extra={<span onClick={this.handleSubmit.bind(this)}>发送</span>}>
            </InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat