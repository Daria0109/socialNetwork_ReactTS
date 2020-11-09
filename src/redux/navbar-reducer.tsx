export type NavbarReducerType = typeof initialState;
export type NavbarInitialStateType = {
    friends: Array<FriendType>
}
export type FriendType = {
    id: number
    name: string
    avatar: string
}

let initialState = {
    friends: [
        {id: 1, name: 'Dimych', avatar: 'https://finance.kz/static/images/default-avatar.png'},
        {id: 2, name: 'Viktor', avatar: 'https://finance.kz/static/images/default-avatar.png'},
        {id: 3, name: 'Sveta', avatar: 'https://finance.kz/static/images/default-avatar.png'},
        {id: 4, name: 'Valera', avatar: 'https://finance.kz/static/images/default-avatar.png'},
        {id: 5, name: 'Sasha', avatar: 'https://finance.kz/static/images/default-avatar.png'},
        {id: 6, name: 'Ignat', avatar: 'https://finance.kz/static/images/default-avatar.png'},
        {id: 7, name: 'Valera', avatar: 'https://finance.kz/static/images/default-avatar.png'}
    ]
}

let navbarReducer = (state = initialState, action: any):NavbarReducerType => {
return state;
}

export default navbarReducer;