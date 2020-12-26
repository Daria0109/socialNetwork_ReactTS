import {getAuthUserData} from '../auth-reducer/auth-reducer';
import {InferActionsTypes, ThunkType} from '../types/types';


enum actions {
  INITIALIZED_SUCCESS = 'samurai-network/app/INITIALIZED-SUCCESS',
}

// A c t i o n  C r e a t o r s
export const appActions = {
  setInitializedSuccess: () => ({type: actions.INITIALIZED_SUCCESS} as const)
}

export type AppActionsType = InferActionsTypes<typeof appActions>;

// T h u n k  C r e a t o r s
export type AppThunkType = ThunkType<AppActionsType>
export const initializeApp = (): AppThunkType => {
  return async (dispatch) => {
    await dispatch(getAuthUserData());
    dispatch(appActions.setInitializedSuccess())
  }
}

// I n i t i a l  S t a t e
const initialState = {
  initialized: false
}
export type AppInitialStateType = typeof initialState;


// R e d u s e r
const appReducer = (state = initialState, action: AppActionsType): AppInitialStateType => {
  switch (action.type) {
    case actions.INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      };
    default:
      return state;
  }
}
export default appReducer;