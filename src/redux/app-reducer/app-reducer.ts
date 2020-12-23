import {ThunkAction} from 'redux-thunk';
import {AppStateType} from '../redux-store'
import {getAuthUserData} from '../auth-reducer/auth-reducer';

const INITIALIZED_SUCCESS = 'samurai-network/app/INITIALIZED-SUCCESS';

// A c t i o n  C r e a t o r s
export const setInitializedSuccess = () => ({type: INITIALIZED_SUCCESS} as const)
export type AppActionsType = ReturnType<typeof setInitializedSuccess>;

// T h u n k  C r e a t o r s
export type AppThunkType = ThunkAction<void, AppStateType, unknown, AppActionsType>
export const initializeApp = (): AppThunkType => {
  return async (dispatch) => {
    await dispatch(getAuthUserData());
    dispatch(setInitializedSuccess())
  }
}

// I n i t i a l  S t a t e
const initialState = {
  initialized: false
}
type AppInitialStateType = typeof initialState;


// R e d u s e r
const appReducer = (state = initialState, action: AppActionsType): AppInitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      };
    default:
      return state;
  }
}
export default appReducer;