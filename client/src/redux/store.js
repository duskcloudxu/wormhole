import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {
  ADD_MODAL,
  END_SESSION, ERROR,
  HOST_CONVERSATION,
  JOIN_CONVERSATION, JOIN_MESSAGE, LEAVE_MESSAGE, RECEIVE_MESSAGE, RESET_REDUX,
  SEND_MESSAGE, USER_EXIT, USER_EXITED
} from './actionConstants'
import {
  createConversation,
  initializeSocket,
  joinConversation, sendMessage,
  endSession, userExit
} from '../utils/client'
import keypair from 'keypair'
import { decryption, encryption } from '../utils/rsa'
import { composeWithDevTools } from 'redux-devtools-extension'
import { uniformKeyFormat } from '../utils/commonUtils'

export const MESSAGE_TYPE = {
  PUBLIC: 'public',
  MY_MESSAGE: 'myMessage',
  OTHERS_MESSAGE: 'othersMessage'
}

const INITIAL_STATE = {
  currentMembers: [],
  nickName: undefined,
  pubKey: undefined,
  privateKey: undefined,
  hostPubKey: undefined,
  messages: {
    public: [{
      date: new Date(),
      text: 'Conversation established',
      type: MESSAGE_TYPE.PUBLIC,
      sender: 'System'
    }]
  },
  socket: undefined,
  endModal: false,
  endModalHint: undefined
}

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HOST_CONVERSATION: {
      const keys = keypair({ bits: 512 })
      state.socket = initializeSocket()
      state.nickName = action.payload.nickName
      state.privateKey = uniformKeyFormat(keys.private)
      state.pubKey = uniformKeyFormat(keys.public)
      createConversation(state.socket, {
        nickName: action.payload.nickName,
        pubKey: state.pubKey
      })
      return state
    }
    case JOIN_CONVERSATION: {
      const keys = keypair({ bits: 512 })
      state.socket = initializeSocket()
      state.nickName = action.payload.nickName
      state.privateKey = uniformKeyFormat(keys.private)
      state.pubKey = uniformKeyFormat(keys.public)
      state.hostPubKey = uniformKeyFormat(action.payload.hostPubkey)
      state.messages[state.hostPubKey] = []
      joinConversation(state.socket, {
        nickName: state.nickName,
        pubKey: state.pubKey,
        hostPubkey: state.hostPubKey
      })
      return state
    }
    case JOIN_MESSAGE: {
      const { nickName, pubKey } = action.payload
      state.currentMembers = [...state.currentMembers, action.payload]
      state.messages['public'] = [...state.messages['public'], {
        date: new Date(),
        text: `${nickName} joined conversation`,
        type: MESSAGE_TYPE.PUBLIC,
        sender: 'System'
      }]
      if (!(pubKey in state.messages)) {
        state.messages[pubKey] = []
      }
      return state
    }
    case LEAVE_MESSAGE: {
      const { nickName, pubKey } = action.payload
      state.currentMembers.splice(
        state.currentMembers.findIndex(item => item.pubKey === pubKey), 1)
      state.currentMembers = [...state.currentMembers];
      state.messages['public'] = [...state.messages['public'], {
        date: new Date(),
        text: `${nickName} leave conversation`,
        type: MESSAGE_TYPE.PUBLIC,
        sender: 'System'
      }]
      delete state.messages[pubKey];
      state.messages = {...state.messages};
      return state
    }

    case SEND_MESSAGE: {
      const req = {
        ciphertext: encryption(action.payload.pubKey, action.payload.plaintext),
        cipherPubKey: action.payload.pubKey
      }
      sendMessage(state.socket, req)
      state.messages[action.payload.pubKey] = [...state.messages[action.payload.pubKey],
        {
          date: new Date(),
          text: action.payload.plaintext,
          type: MESSAGE_TYPE.MY_MESSAGE,
          sender: 'You'
        }]
      state.messages = { ...state.messages }
      return { ...state }
    }
    case RECEIVE_MESSAGE: {
      const { ciphertext, senderPubKey } = action.payload
      if (senderPubKey in state.messages) {
        state.messages[senderPubKey] = [
          ...state.messages[senderPubKey],
          {
            date: new Date(),
            text: decryption(state.privateKey, ciphertext),
            type: MESSAGE_TYPE.OTHERS_MESSAGE,
            sender: 'The Other'
          }
        ]
        state.messages = { ...state.messages }
      } else {
        state.messages[senderPubKey] = [
          {
            date: new Date(),
            text: decryption(state.privateKey, ciphertext),
            type: MESSAGE_TYPE.OTHERS_MESSAGE
          }
        ]
      }
      return state
    }

    case ADD_MODAL: {
      state.endModal = action.payload.endModal
      return state
    }

    case USER_EXIT: {
      userExit(state.socket)
      state.endModal.show()
      state.endModalHint = 'You exited the conversation'
      return state
    }

    case USER_EXITED: {
      state.endModal.show()
      state.endModalHint = 'Host ended the conversation'
      return state
    }

    case END_SESSION: {
      endSession(state.socket)
      state.endModal.show()
      state.endModalHint = 'conversation ended'
      return state
    }

    case ERROR: {
      state.endModal.show()
      state.endModalHint = action.payload.msg
      return state
    }

    case RESET_REDUX: {
      state = INITIAL_STATE
      return state
    }

    default:
      return state
  }
}
export default createStore(rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)))
