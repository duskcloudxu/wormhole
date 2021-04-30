import {
  ADD_MODAL, END_SESSION, ERROR,
  HOST_CONVERSATION,
  JOIN_CONVERSATION, JOIN_MESSAGE, LEAVE_MESSAGE, RECEIVE_MESSAGE, RESET_REDUX,
  SEND_MESSAGE, USER_EXIT, USER_EXITED
} from './actionConstants'

export const createConversationRedux = (nickName) => ({
  type: HOST_CONVERSATION,
  payload: {
    nickName
  }
})

export const joinConversationRedux = (nickName, hostPubkey) => ({
  type: JOIN_CONVERSATION,
  payload: {
    nickName,
    hostPubkey
  }
})

export const joinMessageRedux = (msg) => ({
  type: JOIN_MESSAGE,
  payload: {
    ...msg
  }
})

export const leaveMessageRedux = (msg) => ({
  type: LEAVE_MESSAGE,
  payload: {
    ...msg
  }
})


export const sendMessageRedux = (plaintext, pubKey) => ({
  type: SEND_MESSAGE,
  payload: {
    plaintext,
    pubKey
  }
})

export const receiveMessageRedux = (msg) => ({
  type: RECEIVE_MESSAGE,
  payload: {
    ciphertext: msg.ciphertext,
    senderPubKey: msg.senderPubKey
  }
})

export const addModalRedux = (endModal) => ({
  type: ADD_MODAL,
  payload: {
    endModal
  }
})

export const userExitRedux = () => ({
  type: USER_EXIT
})

export const userExitedRedux = () => ({
  type: USER_EXITED
})

export const endSessionRedux = () => ({
  type: END_SESSION
})

export const errorRedux = (msg) => ({
  type: ERROR,
  payload: {
    msg
  }
})

export const resetRedux = (msg) => ({
  type: RESET_REDUX
})

/**
 * Template calling client.js example
 *
 * export const actionName = () => {
 *    return dispatch => {
 *      myFunction(result => {
 *          dispatch(...an action that updates the store...)
 *      })
 *    }
 * }
 */
