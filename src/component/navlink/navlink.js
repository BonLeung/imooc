import React from 'react'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class NavLinkBar extends React.Component {
  render() {
    const navList = this.props.data.filter(item => !item.hide)
    console.log(navList)
    const { pathname } = this.props.location

    return (
      <TabBar>
        {navList.map(item => (
          <TabBar.Item
            key = {item.path}
            title = {item.text}
            icon = {{uri: require(`./img/${item.icon}.png`)}}
            selectedIcon = {{uri: require(`./img/${item.icon}-active.png`)}}
            selected = {pathname === item.path}
            onPress = {() => {
              this.props.history.push(item.path)
            }}
          >
          </TabBar.Item>
        ))}
      </TabBar>
    )
  }
}

export default NavLinkBar