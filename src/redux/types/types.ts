export type Nullable<T> = null | T;
export type ActionsType<T> = T extends {[key: string]: infer U} ? U : never

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



// API
export enum ResultCodes {
  Success = 0,
  Error = 1,
}
export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10
}

export type AuthDataType = {
  id: number
  email: string
  login: string
}
export type ApiResponseType<T> = {
  data: T
  resultCode: ResultCodes | ResultCodeForCaptcha
  messages: Array<string>
}
export type UsersResponseDataType = {
  items: Array<UserType>
  totalCount: number
  error: string
}
