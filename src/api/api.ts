import axios from 'axios';
import {ApiResponseType, AuthDataType, PhotosType, ProfileType, UsersResponseDataType} from '../redux/types/types';


const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  withCredentials: true,
  headers: {
    'API-KEY': 'bcb04db8-51e3-4a52-abad-1b8669db5951'
  }
})

export const usersAPI = {
   async getUsers(currentPage: number, pageSize: number) {
    let response = await instance.get<UsersResponseDataType>(`users?page=${currentPage}&count=${pageSize}`)
    let {data} = response;
    console.log(data)
    return data
  },
  async followUsers(userId: number) {
    let response = await instance.post<ApiResponseType<{}>>(`follow/${userId}`);
    let {data} = response;
    return data
  },
  async unfollowUsers(userId: number) {
    let response = await instance.delete<ApiResponseType<{}>>(`follow/${userId}`);
    let {data} = response;
    return data
  }
}


export const authAPI = {
  getAuth() {
    return instance.get<ApiResponseType<AuthDataType>>(`auth/me`).then(response => {
      return response.data
    })
  },
  login(email: string, password: string, rememberMe: boolean, captcha: string) {
    return instance.post<ApiResponseType<{}>>(`/auth/login`, {email, password, rememberMe, captcha}).then(response => {
      return response.data
    })
  },
  logout() {
    return instance.delete<ApiResponseType<{}>>(`/auth/login`).then(response => {
      return response.data
    })
  }
}


export const profileAPI = {
  getUserProfile(userId: number) {
    return instance.get<ProfileType>(`profile/${userId}`).then(response => {
      return response.data
    })
  },
  getStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`).then(response => {
      return response.data
    })
  },
  updateStatus(status: string) {
    return instance.put<ApiResponseType<{}>>(`profile/status`, {status}).then(res => {
      return res.data
    })
  },
  uploadPhoto(photo: File) {
    let formData = new FormData();
    formData.append('image', photo)
    return instance.put<ApiResponseType<{photos: PhotosType}>>('profile/photo',
      formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    }).then(response => response.data)
  },
  updateProfile(profile: ProfileType) {
    return instance.put<ApiResponseType<{}>>(`profile`, profile).then(res => res.data)
  }
}

export const securityAPI = {
  getCaptcha() {
    return instance.get<{url: string}>('security/get-captcha-url').then(res => res.data)
  }
}

