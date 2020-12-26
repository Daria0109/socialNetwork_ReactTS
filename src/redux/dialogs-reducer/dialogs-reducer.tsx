import {DialogType, InferActionsTypes, MessageType} from '../types/types';
import defaultAvatar from '../../assets/images/default-avatar.png';


enum actions {
  ADD_MESSAGE = 'samurai-network/dialogs/ADD-MESSAGE'
}

// A c t i o n  C r e a t o r s
export const dialogsActions = {
  addMessage: (message: string) => ({type: actions.ADD_MESSAGE, message} as const)
}
export type DialogsActionsTypes = InferActionsTypes<typeof dialogsActions>;

// I n i t i a l  S t a t e
let initialState = {
  dialogs: [
    {id: 1, name: 'Dimych', avatar: defaultAvatar},
    {id: 2, name: 'Viktor', avatar: defaultAvatar},
    {id: 3, name: 'Sveta', avatar: defaultAvatar},
    {id: 4, name: 'Valera', avatar: defaultAvatar},
    {id: 5, name: 'Sasha', avatar: defaultAvatar},
    {id: 6, name: 'Ignat', avatar: defaultAvatar},
    {id: 7, name: 'Valera', avatar: defaultAvatar}
  ] as Array<DialogType>,
  messages: [
    {id: 1, text: 'Hi!'},
    {id: 2, text: 'How are you!'},
    {id: 3, text: 'Hello, my friend!'}
  ] as Array <MessageType>
}
export type DialogsInitialStateType = typeof initialState;


// R e d u c e r
let dialogsReducer = (state = initialState, action: DialogsActionsTypes): DialogsInitialStateType => {
  switch (action.type) {
    case actions.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages,
          {
            id: 4,
            text: action.message
          }
        ]
      }
   default:
      return state;
  }
}

export default dialogsReducer;