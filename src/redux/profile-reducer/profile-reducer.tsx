import {profileAPI} from '../../api/api';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from '../redux-store';
import {stopSubmit} from 'redux-form';
import {FormAction} from 'redux-form/lib/actions';
import {ActionsType, PhotosType, PostType, ProfileType} from '../types/types';

enum actions {
  ADD_POST = 'samurai-network/profile/ADD-POST',
  SET_USER_PROFILE = 'samurai-network/profile/SET-USER-PROFILE',
  SET_STATUS = 'samurai-network/profile/SET-STATUS',
  SAVE_PHOTO_SUCCESS = 'samurai-network/profile/SAVE_PHOTO_SUCCESS',
  SET_EDIT_MODE_PROFILE = 'samurai-network/profile/SET_EDIT_MODE_PROFILE'
}

// A c t i o n  C r e a t o r s
// export const addPost = (post: string) => ({type: actions.ADD_POST, post} as const);
// export const setUserProfile = (profile: ProfileType) => ({type: actions.SET_USER_PROFILE, profile} as const)
// export const setStatus = (status: string) => ({type: actions.SET_STATUS, status} as const)
// export const savePhotoSuccess = (photos: PhotosType) => ({type: actions.SAVE_PHOTO_SUCCESS, photos} as const)
// export const setEditModeProfile = (editMode: boolean) => ({type: actions.SET_EDIT_MODE_PROFILE, editMode} as const)
//
// export type PostActionsTypes = ReturnType<typeof addPost>
//   | ReturnType<typeof setUserProfile>
//   | ReturnType<typeof setStatus>
//   | ReturnType<typeof savePhotoSuccess>
//   | ReturnType<typeof setEditModeProfile>;


export const profileActions = {
  addPost: (post: string) => ({type: actions.ADD_POST, post} as const),
  setUserProfile: (profile: ProfileType) => ({type: actions.SET_USER_PROFILE, profile} as const),
  setStatus: (status: string) => ({type: actions.SET_STATUS, status} as const),
  savePhotoSuccess: (photos: PhotosType) => ({type: actions.SAVE_PHOTO_SUCCESS, photos} as const),
  setEditModeProfile: (editMode: boolean) => ({type: actions.SET_EDIT_MODE_PROFILE, editMode} as const)
}

export type ProfileActionsType = ReturnType<ActionsType<typeof profileActions>>
type ThunkActionsType = ProfileActionsType | FormAction


// T h u n k  C r e a t o r s
type ThunkType = ThunkAction<void, AppStateType, unknown, ThunkActionsType>
export const getUserProfileTC = (userId: number): ThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.getUserProfile(userId);
    dispatch(profileActions.setUserProfile(data));
  }
}
export const getStatus = (userId: number): ThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(profileActions.setStatus(data))
  }
}
export const updateStatus = (status: string): ThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
      dispatch(profileActions.setStatus(status))
    }
  }
}
export const savePhoto = (photo: File): ThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.uploadPhoto(photo);
    if (data.resultCode === 0) {
      dispatch(profileActions.savePhotoSuccess(data.data.photos))
    }
  }
}
export const saveProfile = (profile: ProfileType): ThunkType => {
  return async (dispatch, getState: () => AppStateType) => {
    const data = await profileAPI.updateProfile(profile);
    if (data.resultCode === 0) {
      const userId = getState().auth.id;
      await dispatch(getUserProfileTC(userId as number))
      dispatch(profileActions.setEditModeProfile(false))
    } else {
      const message = data.messages[0]
      dispatch(stopSubmit('edit-profile', {_error: message}))
    }
  }
}


// I n i t i a l    S t a t e
let initialState = {
  posts: [
    {
      id: 1,
      message: 'Hey, how are you?',
      likesCount: 15,
      avatar: 'https://i.pinimg.com/originals/32/3b/c2/323bc2e28f35a760b8d7afe48f3ffe48.png'
    },
    {
      id: 2,
      message: 'This is my first post',
      likesCount: 25,
      avatar: 'https://i.pinimg.com/originals/5a/f1/dd/5af1ddcde07255e8a999abcc061dd201.png'
    }
  ] as Array<PostType>,
  profile: {} as ProfileType,
  status: '',
  editMode: false
}
export type ProfileInitialStateType = typeof initialState;


// R e d u c e r
let profileReducer = (state = initialState, action: ProfileActionsType): ProfileInitialStateType => {
  switch (action.type) {
    case actions.ADD_POST:
      let newPost = {
        id: 5,
        message: action.post,
        likesCount: 0,
        avatar: 'https://finance.kz/static/images/default-avatar.png'
      }
      return {
        ...state,
        posts: [...state.posts, newPost],
      }
    case actions.SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      };
    case actions.SET_STATUS:
      return {
        ...state,
        status: action.status
      }
    case actions.SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photos
        }
      }
    case actions.SET_EDIT_MODE_PROFILE:
      return {
        ...state,
        editMode: action.editMode
      }
    default:
      return state;
  }
}
export default profileReducer;