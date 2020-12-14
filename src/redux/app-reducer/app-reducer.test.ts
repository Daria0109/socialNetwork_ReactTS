import appReducer, {AppInitialStateType, setInitializedSuccess} from './app-reducer';

let initialState: AppInitialStateType;

beforeEach(() => {
  initialState = {
    initialized: false
  }
})

test('initialization should be successful', () => {
  const action = setInitializedSuccess();

  const newState = appReducer(initialState, action);

  expect(newState.initialized).toBe(true)
})