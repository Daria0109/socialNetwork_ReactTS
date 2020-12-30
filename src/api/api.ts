import axios from 'axios';
import {
  Nullable,
  PhotosType,
  ProfileType, UserType
} from '../redux/types/types';


export enum ResultCodes {
  Success = 0,
  Error = 1,
}
export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10
}
export type ApiResponseType<T = {}, RC = ResultCodes> = {
  data: T
  messages: Array<string>
  resultCode: RC
}
export type AuthDataType = {
  id: number
  email: string
  login: string
}
export type UsersResponseDataType = {
  items: Array<UserType>
  totalCount: number
  error: string
}



const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  withCredentials: true,
  headers: {
    'API-KEY': 'bcb04db8-51e3-4a52-abad-1b8669db5951'
  }
})

export const usersAPI = {
   getUsers(currentPage: number, pageSize: number, term: string = '', friend: Nullable<boolean> = null) {
    return instance.get<UsersResponseDataType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
      .then(res => res.data)
  },
  followUsers(userId: number) {
    return instance.post<ApiResponseType>(`follow/${userId}`)
      .then(res => res.data)
  },
  unfollowUsers(userId: number) {
    return instance.delete<ApiResponseType>(`follow/${userId}`)
      .then(res => res.data)
  }
}

export const authAPI = {
  getAuth() {
    return instance.get<ApiResponseType<AuthDataType>>(`auth/me`)
      .then(res => res.data)
  },
  login(email: string, password: string, rememberMe: boolean, captcha: Nullable<string> = null) {
    return instance.post<ApiResponseType<{userId: number}, ResultCodes | ResultCodeForCaptcha>>(`/auth/login`, {email, password, rememberMe, captcha})
      .then(res => res.data)
  },
  logout() {
    return instance.delete<ApiResponseType>(`/auth/login`)
      .then(res => res.data)
  }
}

export const profileAPI = {
  getUserProfile(userId: number) {
    return instance.get<ProfileType>(`profile/${userId}`)
      .then(res => res.data)
  },
  getStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`)
      .then(res => res.data)
  },
  updateStatus(status: string) {
    return instance.put<ApiResponseType>(`profile/status`, {status})
      .then(res => res.data)
  },
  uploadPhoto(photo: File) {
    let formData = new FormData();
    formData.append('image', photo)
    return instance.put<ApiResponseType<{photos: PhotosType}>>('profile/photo',
      formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    }).then(res => res.data)
  },
  updateProfile(profile: ProfileType) {
    return instance.put<ApiResponseType>(`profile`, profile)
      .then(res => res.data)
  }
}

export const securityAPI = {
  getCaptcha() {
    return instance.get<{url: string}>('security/get-captcha-url')
      .then(res => res.data)
  }
}

