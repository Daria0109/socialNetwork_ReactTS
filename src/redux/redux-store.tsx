import { createStore, combineReducers } from "redux";
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import navbarReducer from './navbarReducer';
import usersReducer from './usersReducer';


export type RootStoreType = ReturnType<typeof reducers>;

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    navbar: navbarReducer
});

let store = createStore(reducers);

export default store;