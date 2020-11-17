import {profileAPI} from '../../api/api';
import { ThunkAction } from 'redux-thunk';
import {AppStateType} from '../redux-store';

export const ADD_POST = 'ADD-POST';
export const UPDATE_POST = 'UPDATE-POST';
export const SET_USER_PROFILE = 'SET-USER-PROFILE'

export type PostActionsTypes = ReturnType<typeof addPost> |
  ReturnType<typeof updatePost> |
  ReturnType<typeof setUserProfile>;

// A c t i o n  C r e a t o r s
export let addPost = () => ({type: ADD_POST} as const);
export let updatePost = (post: string) => ({type: UPDATE_POST, post} as const);
export let setUserProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const)

// T h u n k  C r e a t o r s
type ThunkType = ThunkAction<void, AppStateType, unknown, PostActionsTypes>
export const getUserProfileTC = (userId: number): ThunkType => {
  return (dispatch) => {
    profileAPI.getUserProfile(Number(userId)).then(data => {
      dispatch(setUserProfile(data));
    })
  }
}

export type PostType = {
  id: number
  message: string
  likesCount: number
  avatar: string
};
export type ProfileInitialStateType = {
  posts: Array<PostType>
  newTextPost: string
  profile: ProfileType
}
export type ProfileType = {
  aboutMe: string
  contacts: {
    facebook: string
    website: null | string
    vk: string
    twitter: string
    instagram: string
    youtube: null | string
    github: string
    mainLink: null | string
  },
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  userId: number
  photos: {
    large: string
    small: string
  }
}
export type ProfileReducerType = typeof initialState;

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
  ],
  newTextPost: '',
  profile: {} as ProfileType
}

let profileReducer = (state = initialState, action: PostActionsTypes): ProfileReducerType => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        message: state.newTextPost,
        likesCount: 0,
        avatar: 'https://finance.kz/static/images/default-avatar.png'
      }
      return {
        ...state,
        posts: [...state.posts, newPost],
        newTextPost: ''
      }
    case UPDATE_POST:
      return {
        ...state,
        newTextPost: action.post,
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      };
    default:
      return state;
  }
}

export default profileReducer;