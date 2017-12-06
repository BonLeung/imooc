import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

@connect(
  state => state
)
class Msg extends React.Component {
  getLast(arrs) {
    return arrs[arrs.length - 1]
  }
  render() {
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id

    const msgGroup = {}
    this.props.chat.chatmsg.forEach(item => {
      msgGroup[item.chatid] = msgGroup[item.chatid] || []
      msgGroup[item.chatid].push(item)
    })
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last - a_last
    })

    return (
      <div>
        <List>
          {chatList.map(msgs => {
            const lastItem = this.getLast(msgs)
            const targetid = lastItem.from === userid ? lastItem.to : lastItem.from
            const userinfo = this.props.chat.users[targetid]
            const unread = msgs.filter(msg => {
              return msg.to === userid && !msg.unread
            }).length

            return (
              <Item key={lastItem._id} 
                thumb={require(`../img/${userinfo.avatar}.png`)}
                extra={<Badge text={unread}></Badge>}
                arrow='horizontal'
                onClick={() => {
                  this.props.history.push(`/chat/${targetid}`)
                }}
              >
                {lastItem.content}
                <Brief>{userinfo.name}</Brief>
              </Item>
            )
          })}
        </List>
      </div>
    )
  }
}

export default Msg