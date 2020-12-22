import {FriendType} from '../types/types';


let initialState = {
    friends: [
        {id: 1, name: 'Dimych', avatar: 'https://finance.kz/static/images/default-avatar.png'},
        {id: 2, name: 'Viktor', avatar: 'https://finance.kz/static/images/default-avatar.png'},
        {id: 3, name: 'Sveta', avatar: 'https://finance.kz/static/images/default-avatar.png'},
        {id: 4, name: 'Valera', avatar: 'https://finance.kz/static/images/default-avatar.png'},
        {id: 5, name: 'Sasha', avatar: 'https://finance.kz/static/images/default-avatar.png'},
        {id: 6, name: 'Ignat', avatar: 'https://finance.kz/static/images/default-avatar.png'},
        {id: 7, name: 'Valera', avatar: 'https://finance.kz/static/images/default-avatar.png'}
    ] as Array<FriendType>
}
type NavbarInitialStateType = typeof initialState;

let navbarReducer = (state = initialState, action: any):NavbarInitialStateType => {
return state;
}

export default navbarReducer;