import React from 'react'
import { List, InputItem } from 'antd-mobile'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'

const socket = io('ws://localhost:9093')

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg }
)
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }
  componentDidMount() {
    this.props.getMsgList()
    this.props.recvMsg()
  }
  handleSubmit() {
    // socket.emit('sendmsg', {text: this.state.text})
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({ from, to, msg })
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