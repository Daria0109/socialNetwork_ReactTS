import {usersAPI} from '../api/api';
import {Dispatch} from 'react';
import { ThunkAction } from 'redux-thunk';
import {AppStateType} from './redux-store';

export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const SET_USERS = 'SET-USERS';
export const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
export const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
export const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
export const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE-FOLLOWING-PROGRESS'

export type UsersActionsType = ReturnType<typeof follow> |
  ReturnType<typeof unfollow> |
  ReturnType<typeof setUsers> |
  ReturnType<typeof setCurrentPage> |
  ReturnType<typeof setTotalUsersCount> |
  ReturnType<typeof toggleIsFetching> |
  ReturnType<typeof toggleFollowingProgress>;

// A c t i o n  C r e a t o r s
export const follow = (userId: number) => ({type: FOLLOW, userId} as const);
export const unfollow = (userId: number) => ({type: UNFOLLOW, userId} as const);
export const setUsers = (users: Array<UserType>) => ({type: SET_USERS, users} as const);
export const setCurrentPage = (pageNumber: number) => ({type: SET_CURRENT_PAGE, pageNumber} as const);
export const setTotalUsersCount = (totalUsers: number) => ({type: SET_TOTAL_USERS_COUNT, totalUsers} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const)
export const toggleFollowingProgress = (isFollowingProgress: boolean, userId: number) => ({
  type: TOGGLE_FOLLOWING_PROGRESS, isFollowingProgress, userId} as const)

// T h u n k  C r e a t o r s
type ThunkType = ThunkAction<void,AppStateType, unknown, UsersActionsType>;
export const getUsersTC = (currentPage: number, pageSize: number): ThunkType => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    usersAPI.getUsers(currentPage, pageSize).then(data => {
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount))
    })
  }
}
export const followTC = (userId: number): ThunkType => {
  return (dispatch: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    usersAPI.followUsers(userId).then(data => {
      if (data.resultCode === 0) {
        dispatch(follow(userId))
      }
      dispatch(toggleFollowingProgress(false, userId));
    })
  }
}
export const unfollowTC = (userId: number): ThunkType => {
  return (dispatch: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    usersAPI.unfollowUsers(userId).then(data => {
      if (data.resultCode === 0) {
        dispatch(unfollow(userId))
      }
      dispatch(toggleFollowingProgress(false, userId));
    })
  }
}


export type DataType = {
  items: Array<UserType>
  totalCount: number
  error: string
}
export type FollowDataType = {
  resultCode: number
  messages: Array<string>
  data: {}
}
export type UserType = {
  name: string
  id: number
  uniqueUrlName: null
  photos: {
    small: null | undefined
    large: null | undefined
  }
  status: null
  followed: boolean
};
export type UsersInitialStateType = {
  users: Array<UserType>,
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: Array<number>
}
export type UsersReducerType = typeof initialState;

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>
}

let usersReducer = (state: UsersInitialStateType = initialState, action: UsersActionsType): UsersReducerType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return {...u, followed: true}
          } else {
            return {...u}
          }
        })
      }
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
            if (u.id === action.userId) {
              return {...u, followed: false}
            } else {
              return {...u}
            }
          }
        )
      };
    case SET_USERS:
      return {
        ...state,
        users: state.users = action.users
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage = action.pageNumber
      }
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: state.totalUsersCount = action.totalUsers
      }
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: state.isFetching = action.isFetching
      }

    case TOGGLE_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFollowingProgress
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      }
    default:
      return state;
  }
}


export default usersReducer;