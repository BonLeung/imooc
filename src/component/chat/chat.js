import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util/util';

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
      msg: [],
      showEmoji: false
    }
  }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }   
    this.fixCarousel()
  }
  fixCarousel() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
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
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
                    .split(' ')
                    .filter(item => item)
                    .map(item => ({text: item}))

    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users
    if (!users[userid]) {
      return null
    }
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(item => {
      return item.chatid === chatid
    })
    return (
      <div id="chat-page">
        <NavBar mode='dark'
          icon={<Icon type='left' />}
          onLeftClick={
            () => {
              this.props.history.goBack()
            }
          }
        >
          {users[userid].name}
        </NavBar>
        {chatmsgs.map((item, index) => {
          const avatar = require(`../img/${users[item.from].avatar}.png`)
          return item.from === userid ? 
          <List key={item._id}>
            <Item thumb={avatar}>{item.content}</Item>
          </List>
          :
          <List key={item._id}>
            <Item className='chat-me' extra={<img src={avatar} alt='avatar' />}>{item.content}</Item>
          </List>
        })}
        <div className="stick-footer">
          <List>
            <InputItem 
              placeholder="请输入"
              value={this.state.text}
              onChange={val => this.setState({text: val})}
              extra={
                <div>
                  <span role='img' aria-label='emoji' style={{marginRight: 10}} 
                    onClick={() => {
                      this.setState({showEmoji: !this.state.showEmoji})
                      this.fixCarousel()
                    }}>😀</span>
                  <span onClick={this.handleSubmit.bind(this)}>发送</span>
                </div>
              }>
            </InputItem>
          </List>
          {
            this.state.showEmoji ? 
            <Grid data={emoji} columnNum={9} carouselMaxRow={4} isCarousel={true}
              onClick={el => {
                this.setState({
                  text: this.state.text + el.text
                })
              }}></Grid>
            :
            null
          }
        </div>
      </div>
    )
  }
}

export default Chat