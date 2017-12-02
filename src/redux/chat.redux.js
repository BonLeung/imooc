import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
}

export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        chatmsg: action.payload.msgs,
        unread: action.payload.msgs.filter(item => !item.read && item.from !== action.payload.userid).length,
        users: action.payload.users
      }
    case MSG_RECV:
      const unread = action.payload.userid === action.payload.msg.from ? state.unread : state.unread + 1 
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.payload.msg],
        unread: unread
      }
    // case MSG_READ:
    default:
      return state
  }
}

function msgList(msgs, users, userid) {
  return {
    type: MSG_LIST,
    payload: {msgs, users, userid}
  }
}

function msgRecv(msg, userid) {
  return {
    type: MSG_RECV,
    payload: {msg, userid}
  }
}

export function recvMsg() {
  return (dispatch, getState) => {
    socket.on('recvmsg', data => {
      dispatch(msgRecv(data, getState().user._id))
    })
  }
}

export function sendMsg({ from, to, msg }) {
  return dispatch => {
    socket.emit('sendmsg', { from, to, msg })
  }
}

export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/user/getmsglist').then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(msgList(res.data.msgs, res.data.users, getState().user._id))
      }
    })
  }
}