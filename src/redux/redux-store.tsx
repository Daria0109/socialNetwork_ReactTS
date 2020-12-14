import { createStore, combineReducers, applyMiddleware } from "redux";
import profileReducer from './profile-reducer/profile-reducer';
import dialogsReducer from './dialogs-reducer/dialogs-reducer';
import navbarReducer from './navbar-reducer/navbar-reducer';
import usersReducer from './users-reducer/users-reducer';
import authReducer from './auth-reducer/auth-reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import appReducer from './app-reducer/app-reducer';


export type RootStoreType = typeof reducers;
export type AppStateType = ReturnType<RootStoreType>

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    navbar: navbarReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
// @ts-ignore
window.store = store;

export default store;