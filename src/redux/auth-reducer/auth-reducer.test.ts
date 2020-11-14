import authReducer, {AuthInitialStateType, setAuthUserData} from './auth-reducer';

let initialState: AuthInitialStateType;

beforeEach(() => {
  initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
  }
})
test('user should be authorized on site', () => {
  const action = setAuthUserData(12345, "blabla@bla.la", "SomeUser")
  const endState = authReducer(initialState, action);

  expect(endState).toEqual({
    id: 12345,
    email: "blabla@bla.la",
    login: "SomeUser",
    isAuth: true
  })
})