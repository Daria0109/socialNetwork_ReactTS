import appReducer, {appActions, AppInitialStateType} from './app-reducer';

let initialState: AppInitialStateType;

beforeEach(() => {
  initialState = {
    initialized: false
  }
})

test('initialization should be successful', () => {
  const action = appActions.setInitializedSuccess();

  const newState = appReducer(initialState, action);

  expect(newState.initialized).toBe(true)
})