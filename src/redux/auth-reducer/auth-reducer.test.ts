import authReducer, {authActions, AuthInitialStateType} from './auth-reducer';
import {usersActions} from '../users-reducer/users-reducer';

let initialState: AuthInitialStateType;

beforeEach(() => {
  initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
  }
})
test('user should be authorized on site', () => {
  const action = authActions.setAuthUserData(12345, "blabla@bla.la", "SomeUser", true)
  const endState = authReducer(initialState, action);

  expect(endState).toEqual({
    id: 12345,
    email: "blabla@bla.la",
    login: "SomeUser",
    isAuth: true,
    captchaUrl: null
  })
})
test('captcha should be received from server', () => {
  const action = authActions.getCaptchaSuccess('https//:IAmYourCaptcha.com');
  const endState = authReducer(initialState, action);

  expect(endState.captchaUrl).toBeDefined();
  expect(endState.captchaUrl).toBe('https//:IAmYourCaptcha.com')
})