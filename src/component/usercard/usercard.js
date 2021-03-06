import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { WingBlank, WhiteSpace, Card } from 'antd-mobile'

@withRouter
class UserCard extends React.Component {
  static PropTypes = {
    userList: PropTypes.array.isRequired
  }
  handleClick(item) {
    this.props.history.push(`/chat/${item._id}`)
  }
  render() {
    const Header = Card.Header
    const Body = Card.Body
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {this.props.userList.map(item => 
          item.avatar ? 
          (<Card 
            key={item._id} 
            onClick={() => this.handleClick(item)}
          >
            <Header 
              title={item.user} 
              thumb={require(`../img/${item.avatar}.png`)}
              extra={<span>{item.title}</span>}
            ></Header>
            <Body>
              {item.type === 'boss' ? <div>公司：{item.company}</div> : null}
              {item.desc.split('\n').map((item, index) => {
                return <p key={index}>{index + 1}、{item}</p>
              })}
              {item.type === 'boss' ? <div>薪资：{item.money}</div> : null}
            </Body>
          </Card>) 
          :
          null
        )}
      </WingBlank>
    )
  }
}

export default UserCard