import { Action } from "redux";
import {AppStateType} from '../redux-store';
import {ThunkAction} from 'redux-thunk';

export type Nullable<T> = null | T;

// A c t i o n   C r e a t o r s
export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never

// T h u n k
export type ThunkType<A extends Action, P = Promise<void>> = ThunkAction<P, AppStateType, unknown, A>;



// A u t h



// D i a l o g s
export type DialogType = {
  id: number
  name: string
  avatar: string
}
export type MessageType = {
  id: number
  text: string
}

// N a v b a r
export type FriendType = {
  id: number
  name: string
  avatar: string
}


// P r o f i l e
export type PostType = {
  id: number
  message: string
  likesCount: number
  avatar: string
};
export type PhotosType = {
  large: Nullable<string>
  small: Nullable<string>
}
export type ContactsType = {
  [key: string]: string
  facebook: string
  website: string
  vk: string
  twitter: string
  instagram: string
  youtube: string
  github: string
  mainLink: string
}
export type ProfileType = {
  aboutMe: string
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  userId: number
  contacts: ContactsType
  photos: PhotosType
}


// U s e r s
export type UserType = {
  name: string
  id: number
  uniqueUrlName: Nullable<string>
  photos: {
    small: Nullable<string>
    large: Nullable<string>
  }
  status: Nullable<string>
  followed: boolean
};

export type UsersSearchFormType = {
  term: string
  friend: Nullable<boolean>
}
