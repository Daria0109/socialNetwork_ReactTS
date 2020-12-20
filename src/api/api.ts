import axios from 'axios';
import {DataType, FollowDataType} from '../redux/users-reducer/users-reducer';
import {AuthType} from '../redux/auth-reducer/auth-reducer'
import {ProfileType, ResponseProfilePhotoType} from '../redux/profile-reducer/profile-reducer';


const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  withCredentials: true,
  headers: {
    'API-KEY': 'bcb04db8-51e3-4a52-abad-1b8669db5951'
  }
})

export const usersAPI = {
  // getUsers(currentPage: number, pageSize: number) {
  //   return instance.get<DataType>(`users?page=${currentPage}&count=${pageSize}`)
  //     .then(response => {
  //     return response.data
  //   })
  // },
  async getUsers(currentPage: number, pageSize: number) {
    let response = await instance.get<DataType>(`users?page=${currentPage}&count=${pageSize}`)
    let {data} = response;
    console.log(data)
    return data
  },
  async followUsers(userId: number) {
    let response = await instance.post<FollowDataType>(`follow/${userId}`);
    let {data} = response;
    return data
  },
  async unfollowUsers(userId: number) {
    let response = await instance.delete<FollowDataType>(`follow/${userId}`);
    let {data} = response;
    return data
  }
}


export const headerAPI = {
  getAuth() {
    return instance.get<AuthType>(`auth/me`).then(response => {
      return response.data
    })
  },
  login(email: string, password: string, rememberMe: boolean) {
    return instance.post<AuthType>(`/auth/login`, {email, password, rememberMe}).then(response => {
      return response.data
    })
  },
  logout() {
    return instance.delete<AuthType>(`/auth/login`).then(response => {
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
    return instance.put<FollowDataType>(`profile/status`, {status}).then(res => {
      return res.data
    })
  },
  uploadPhoto(photo: File) {
    let formData = new FormData();
    formData.append('image', photo)
    return instance.put<ResponseProfilePhotoType>('profile/photo',
      formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    }).then(response => response.data)
  },
  updateProfile(profile: ProfileType) {
    return instance.put<FollowDataType>(`profile`, profile).then(res => res.data)
  }
}



