import {headerAPI} from '../api/api';
import { ThunkAction } from 'redux-thunk';
import {AppStateType} from './redux-store';

const SET_AUTH_USER_DATA = "SET-AUTH-USER-DATA";

// A c t i o n  C r e a t o r s
export const setAuthUserData = (id: number, email: string, login: string) => ({
  type: SET_AUTH_USER_DATA, data: {id, email, login} as const})
export type AuthActionsType = ReturnType<typeof setAuthUserData>

// T h u n k  C r e a t o r s
type ThunkType = ThunkAction<void, AppStateType, unknown,AuthActionsType>
export const getAuthUserDataTC = (): ThunkType => {
  return (dispatch) => {
    headerAPI.getAuth().then(data => {
      if (data.resultCode === 0) {
        let {id, email, login} = data.data;
        dispatch(setAuthUserData(id, email, login));
      }
    })
  }
}

export type DataType = {
  id: number
  email: string
  login: string
}
export type AuthType = {
  data: DataType
  resultCode: number
  messages: Array<string>
}
export type AuthInitialStateType = {
  id: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}
const initialState: AuthInitialStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: false
}
export type AuthReducerType = typeof initialState;


const authReducer = (state = initialState, action: AuthActionsType): AuthReducerType => {
  switch(action.type) {
    case SET_AUTH_USER_DATA:
      return {
        ...state,
        ...action.data,
        isAuth: true
      };
    default:
      return state;
  }
}
export default authReducer;