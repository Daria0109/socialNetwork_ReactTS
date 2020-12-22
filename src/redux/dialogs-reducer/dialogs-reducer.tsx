import {DialogType, MessageType} from '../types/types';

const ADD_MESSAGE = 'samurai-network/dialogs/ADD-MESSAGE';

// A c t i o n  C r e a t o r s
export let addMessage = (message: string) => ({type: ADD_MESSAGE, message} as const);
export type DialogsActionsTypes = ReturnType<typeof addMessage>;

// I n i t i a l  S t a t e
let initialState = {
  dialogs: [
    {id: 1, name: 'Dimych', avatar: 'https://finance.kz/static/images/default-avatar.png'},
    {id: 2, name: 'Viktor', avatar: 'https://finance.kz/static/images/default-avatar.png'},
    {id: 3, name: 'Sveta', avatar: 'https://finance.kz/static/images/default-avatar.png'},
    {id: 4, name: 'Valera', avatar: 'https://finance.kz/static/images/default-avatar.png'},
    {id: 5, name: 'Sasha', avatar: 'https://finance.kz/static/images/default-avatar.png'},
    {id: 6, name: 'Ignat', avatar: 'https://finance.kz/static/images/default-avatar.png'},
    {id: 7, name: 'Valera', avatar: 'https://finance.kz/static/images/default-avatar.png'}
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
    case ADD_MESSAGE:
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