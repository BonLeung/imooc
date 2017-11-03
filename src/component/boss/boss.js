import React from 'react'
import axios from 'axios'

class Boss extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    axios.get('/user/list?type=genius').then(res => {
      console.log(res)
      if (res.data.code === 0) {
        this.setState({
          data: res.data.data
        })
      }
    })
  }
  render() {
    return (
      <div>boss页面</div>
    )
  }
}

export default Boss