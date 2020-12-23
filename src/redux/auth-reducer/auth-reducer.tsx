import {authAPI, securityAPI} from '../../api/api';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from '../redux-store';
import {stopSubmit} from 'redux-form';
import {FormAction} from 'redux-form/lib/actions';
import {Nullable, ResultCodeForCaptcha, ResultCodes} from '../types/types';

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
export type AuthThunkType = ThunkAction<void, AppStateType, unknown, ThunkActionsType>
export const getAuthUserData = (): AuthThunkType => {
  return async (dispatch) => {
    const data = await authAPI.getAuth();
    if (data.resultCode === ResultCodes.Success) {
      let {id, email, login} = data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): AuthThunkType => {
  return async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodes.Success) {
      dispatch(getAuthUserData());
    } else {
      if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
        dispatch(getCaptcha())
      }
      let message = data.messages.length > 0 ? data.messages[0] : 'Another error'
      dispatch(stopSubmit('login', {_error: message}))
    }
  }
}
export const logout = (): AuthThunkType => {
  return async (dispatch) => {
    const data = await authAPI.logout();
    if (data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  }
}
export const getCaptcha = (): AuthThunkType => {
  return async (dispatch) => {
    const response = await securityAPI.getCaptcha();
    const captchaUrl = response.url;
    dispatch(getCaptchaSuccess(captchaUrl))
  }
}

// I n i t i a l  S t a t e
const initialState = {
  id: null as Nullable<number>,
  email: null as Nullable<string>,
  login: null as Nullable<string>,
  isAuth: false,
  captchaUrl: null as Nullable<string>
}
type AuthInitialStateType = typeof initialState;

 // R e d u c e r
const authReducer = (state = initialState, action: AuthActionsType): AuthInitialStateType => {
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