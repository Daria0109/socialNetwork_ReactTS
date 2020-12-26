import {FriendType} from '../types/types';
import defaultAvatar from '../../assets/images/default-avatar.png'


let initialState = {
    friends: [
        {id: 1, name: 'Dimych', avatar: defaultAvatar},
        {id: 2, name: 'Viktor', avatar: defaultAvatar},
        {id: 3, name: 'Sveta', avatar: defaultAvatar},
        {id: 4, name: 'Valera', avatar: defaultAvatar},
        {id: 5, name: 'Sasha', avatar: defaultAvatar},
        {id: 6, name: 'Ignat', avatar: defaultAvatar},
        {id: 7, name: 'Valera', avatar: defaultAvatar}
    ] as Array<FriendType>
}
type NavbarInitialStateType = typeof initialState;

let navbarReducer = (state = initialState, action: any):NavbarInitialStateType => {
return state;
}

export default navbarReducer;