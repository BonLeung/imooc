import React from 'react'
import { Grid, List } from 'antd-mobile'

class AvatarSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'.split(",").map(value => ({
      icon: require(`../img/${value}.png`),
      text: value
    }))
    const gridHeader = this.state.text ? (<div><span>已选择头像</span><img style={{width: 20}} src={this.state.icon} alt="avatar"/></div>) : '请选择头像'

    return (
      <List renderHeader={() => gridHeader}>
        <Grid
          data={avatarList}
          columnNum={5}
          onClick={elm => {
            this.setState(elm)
            this.props.selectAvatar(elm.text)
          }}
        />
      </List>
    )
  }
}

export default AvatarSelector
