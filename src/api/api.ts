import axios from 'axios';
import {DataType, FollowDataType} from '../redux/usersReducer';
import {AuthType} from '../redux/auth-reducer'
import {ProfileType} from '../redux/profileReducer';


type InstanceType = typeof instance;
const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  withCredentials: true,
  headers: {
    "API-KEY": "bcb04db8-51e3-4a52-abad-1b8669db5951"
  }
})

type UsersAPIType = {
  getUsers: (currentPage: number, pageSize: number) => Promise<DataType>
  followUsers: (userId: number) => Promise<FollowDataType>
  unfollowUsers: (userId: number) => Promise<FollowDataType>
}
export const usersAPI: UsersAPIType = {
  getUsers(currentPage, pageSize) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => {
      return response.data
    })
  },
  followUsers(userId) {
    return instance.post(`follow/${userId}`).then(response => {
      return response.data
    })
  },
  unfollowUsers(userId) {
    return instance.delete(`follow/${userId}`).then(response => {
      return response.data
    })
  }
}


type HeaderAPIType = {
  getAuth: () => Promise<AuthType>
}
export const headerAPI: HeaderAPIType = {
  getAuth() {
    return instance.get(`auth/me`).then(response => {
      return response.data
    })
  }
}


type ProfileAPIType = {
  getUserProfile: (userId: number) => Promise<ProfileType>
}
export const profileAPI: ProfileAPIType = {
  getUserProfile(userId) {
    return instance.get(`profile/${userId}`).then(response => {
      return response.data
    })
  }
}

