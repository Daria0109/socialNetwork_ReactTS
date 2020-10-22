const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_MESSAGE = "UPDATE-MESSAGE";

export type MessageActionsTypes = ReturnType<typeof addMessageActionCreator> |
    ReturnType<typeof updateMessageActionCreator>;

export type DialogType = {
    id: number
    name: string
    avatar: string
}
export type MessageType = {
    id: number
    text: string
}
export type DialogsInitialStateType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newTextMessage: string
}

export type DialogsReducerType = typeof initialState;

export let addMessageActionCreator = () => ({
    type: ADD_MESSAGE
} as const);
export let updateMessageActionCreator = (message: string) => ({
    type: UPDATE_MESSAGE,
    updatedMessage: message
} as const);

let initialState = {
    dialogs: [
        {id: 1, name: 'Dimych', avatar: 'https://finance.kz/static/images/default-avatar.png'},
        {id: 2, name: 'Viktor', avatar: 'https://finance.kz/static/images/default-avatar.png'},
        {id: 3, name: 'Sveta', avatar: 'https://finance.kz/static/images/default-avatar.png'},
        {id: 4, name: 'Valera', avatar: 'https://finance.kz/static/images/default-avatar.png'},
        {id: 5, name: 'Sasha', avatar: 'https://finance.kz/static/images/default-avatar.png'},
        {id: 6, name: 'Ignat', avatar: 'https://finance.kz/static/images/default-avatar.png'},
        {id: 7, name: 'Valera', avatar: 'https://finance.kz/static/images/default-avatar.png'}
    ],
    messages: [
        {id: 1, text: 'Hi!'},
        {id: 2, text: 'How are you!'},
        {id: 3, text: 'Hello, my friend!'}
    ],
    newTextMessage: ""
}

let dialogsReducer = (state: DialogsReducerType = initialState, action: MessageActionsTypes):DialogsReducerType => {
    switch (action.type) {
        case (ADD_MESSAGE): {
            return {
                ...state,
                newTextMessage: '',
                messages: [...state.messages,
                    {
                        id: 4,
                        text: state.newTextMessage
                    }
                ]
            }
        }
            case (UPDATE_MESSAGE): {
                return {
                    ...state,
                    newTextMessage: action.updatedMessage,
                }
            }
            default:
            return state;
    }
}

export default dialogsReducer;