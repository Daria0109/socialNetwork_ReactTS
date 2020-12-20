import {headerAPI, securityAPI} from '../../api/api';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from '../redux-store';
import {stopSubmit} from 'redux-form';
import {FormAction} from 'redux-form/lib/actions';

const SET_AUTH_USER_DATA = 'samurai-network/auth/SET-AUTH-USER-DATA';
const GET_CAPTCHA_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_SUCCESS'

// A c t i o n  C r e a t o r s
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
  type: SET_AUTH_USER_DATA, payload: {id, email, login}, isAuth
} as const)
export const getCaptchaSuccess = (captchaUrl: string) => ({
  type: GET_CAPTCHA_SUCCESS, captchaUrl
} as const)
export type AuthActionsType = ReturnType<typeof setAuthUserData>
  | ReturnType<typeof getCaptchaSuccess>;
type ThunkActionsType = AuthActionsType | FormAction

// T h u n k  C r e a t o r s
type ThunkType = ThunkAction<void, AppStateType, unknown, ThunkActionsType>
export const getAuthUserDataTC = (): ThunkType => {
  return async (dispatch) => {
    const data = await headerAPI.getAuth();
    if (data.resultCode === 0) {
      let {id, email, login} = data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
  return async (dispatch) => {
    const data = await headerAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === 0) {
      dispatch(getAuthUserDataTC());
    } else {
      if (data.resultCode === 10) {
        dispatch(getCaptcha())
      }
      let message = data.messages.length > 0 ? data.messages[0] : 'Another error'
      dispatch(stopSubmit('login', {_error: message}))
    }
  }
}
export const logout = (): ThunkType => {
  return async (dispatch) => {
    const data = await headerAPI.logout();
    if (data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  }
}
export const getCaptcha = (): ThunkType => {
  return async (dispatch) => {
    const response = await securityAPI.getCaptcha();
    const captchaUrl = response.url;
    dispatch(getCaptchaSuccess(captchaUrl))
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
  captchaUrl: null | string
}
const initialState: AuthInitialStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null
}
export type AuthReducerType = typeof initialState;


const authReducer = (state = initialState, action: AuthActionsType): AuthReducerType => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
      return {
        ...state,
        ...action.payload,
        isAuth: action.isAuth
      };
    case GET_CAPTCHA_SUCCESS:
      return {
        ...state,
        captchaUrl: action.captchaUrl
      }
    default:
      return state;
  }
}
export default authReducer;