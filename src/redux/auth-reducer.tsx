const SET_AUTH_USER_DATA = "SET-AUTH-USER-DATA";

export type authAC = ReturnType<typeof setAuthUserData>

export const setAuthUserData = (id: number, email: string, login: string) => ({
  type: SET_AUTH_USER_DATA, data: {id, email, login} as const
})

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


const authReducer = (state = initialState, action: authAC): AuthReducerType => {
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