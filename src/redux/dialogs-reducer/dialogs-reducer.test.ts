import dialogsReducer, {addMessage, DialogsInitialStateType, updateMessage} from './dialogs-reducer';

let initialState: DialogsInitialStateType;
beforeEach(() => {
  initialState = {
    dialogs: [
      {id: 1, name: 'Dimych', avatar: 'https://finance.kz/static/images/default-avatar.png'},
      {id: 2, name: 'Viktor', avatar: 'https://finance.kz/static/images/default-avatar.png'},
      {id: 3, name: 'Sveta', avatar: 'https://finance.kz/static/images/default-avatar.png'}
    ],
    messages: [
      {id: 1, text: 'Hi!'},
      {id: 2, text: 'How are you!'},
      {id: 3, text: 'Hello, my friend!'}
    ],
    newTextMessage: ''
  }
})
test('message text should be updated', () => {
  const action = updateMessage('Have a nice day!');
  const endState = dialogsReducer(initialState, action);

  expect(endState).toEqual({
    dialogs: [
      {id: 1, name: 'Dimych', avatar: 'https://finance.kz/static/images/default-avatar.png'},
      {id: 2, name: 'Viktor', avatar: 'https://finance.kz/static/images/default-avatar.png'},
      {id: 3, name: 'Sveta', avatar: 'https://finance.kz/static/images/default-avatar.png'}
    ],
    messages: [
      {id: 1, text: 'Hi!'},
      {id: 2, text: 'How are you!'},
      {id: 3, text: 'Hello, my friend!'}
    ],
    newTextMessage: 'Have a nice day!'
  })
})

test('new message should be added', () => {
  const action = addMessage();
  const endState = dialogsReducer(initialState, action);

  expect(endState).toEqual({
    dialogs: [
      {id: 1, name: 'Dimych', avatar: 'https://finance.kz/static/images/default-avatar.png'},
      {id: 2, name: 'Viktor', avatar: 'https://finance.kz/static/images/default-avatar.png'},
      {id: 3, name: 'Sveta', avatar: 'https://finance.kz/static/images/default-avatar.png'}
    ],
    messages: [
      {id: 1, text: 'Hi!'},
      {id: 2, text: 'How are you!'},
      {id: 3, text: 'Hello, my friend!'},
      {id: 4, text: ''}
    ],
    newTextMessage: ''
  })
})