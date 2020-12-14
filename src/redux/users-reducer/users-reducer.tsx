import {usersAPI} from '../../api/api';
import {Dispatch} from 'react';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppStateType} from '../redux-store';
import {updateObjInArray} from '../../components/utilities/helpers/object-helpers';

export const FOLLOW = 'samurai-network/users/FOLLOW';
export const UNFOLLOW = 'samurai-network/users/UNFOLLOW';
export const SET_USERS = 'samurai-network/users/SET-USERS';
export const SET_CURRENT_PAGE = 'samurai-network/users/SET-CURRENT-PAGE';
export const SET_TOTAL_USERS_COUNT = 'samurai-network/users/SET-TOTAL-USERS-COUNT';
export const TOGGLE_IS_FETCHING = 'samurai-network/users/TOGGLE-IS-FETCHING'
export const TOGGLE_FOLLOWING_PROGRESS = 'samurai-network/users/TOGGLE-FOLLOWING-PROGRESS'

// A c t i o n  C r e a t o r s
export const follow = (userId: number) => ({type: FOLLOW, userId} as const);
export const unfollow = (userId: number) => ({type: UNFOLLOW, userId} as const);
export const setUsers = (users: Array<UserType>) => ({type: SET_USERS, users} as const);
export const setCurrentPage = (pageNumber: number) => ({type: SET_CURRENT_PAGE, pageNumber} as const);
export const setTotalUsersCount = (totalUsers: number) => ({type: SET_TOTAL_USERS_COUNT, totalUsers} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const)
export const toggleFollowingProgress = (isFollowingProgress: boolean, userId: number) => ({
  type: TOGGLE_FOLLOWING_PROGRESS, isFollowingProgress, userId
} as const)
export type FollowUnfollowType = {
  type: string
  userId: number
}

export type UsersActionsType = ReturnType<typeof follow> |
  ReturnType<typeof unfollow> |
  ReturnType<typeof setUsers> |
  ReturnType<typeof setCurrentPage> |
  ReturnType<typeof setTotalUsersCount> |
  ReturnType<typeof toggleIsFetching> |
  ReturnType<typeof toggleFollowingProgress>;

// T h u n k  C r e a t o r s
export type ThunkType = ThunkAction<void, AppStateType, unknown, UsersActionsType>;
export const getUsersTC = (currentPage: number, pageSize: number): ThunkType => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let users = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(users.items));
    dispatch(setTotalUsersCount(users.totalCount))
  }
}
const followUnfollowFlow = async (dispatch: Dispatch<any>, userId: number,
                                  apiMethod: (userId: number) => Promise<FollowDataType>,
                                  actionCreator: Function) => {
  dispatch(toggleFollowingProgress(true, userId));
  let result = await apiMethod(userId);
  if (result.resultCode === 0) {
    dispatch(actionCreator(userId))
  }
  dispatch(toggleFollowingProgress(false, userId));
}

export const followTC = (userId: number): ThunkType => {
  return async (dispatch) => {
    const apiMethod = usersAPI.followUsers.bind(usersAPI);
    await followUnfollowFlow(dispatch, userId, apiMethod, follow)
  }
}
export const unfollowTC = (userId: number): ThunkType => {
  return async (dispatch) => {
    const apiMethod = usersAPI.unfollowUsers.bind(usersAPI);
    await followUnfollowFlow(dispatch, userId, apiMethod, unfollow)
  }
}
export type getUsersTCType = ReturnType<typeof getUsersTC>
export type followTCType = ReturnType<typeof followTC>
export type unfollowTCType = ReturnType<typeof unfollowTC>


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
  status: null | string
  followed: boolean
};
export type UsersInitialStateType = {
  users: Array<UserType>,
  pageSize: number
  totalUsersCount: number
  currentPage: number
  portionSize: number
  isFetching: boolean
  followingInProgress: Array<number>
}
export type UsersReducerType = typeof initialState;

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  portionSize: 10,
  isFetching: true,
  followingInProgress: [] as Array<number>
}

let usersReducer = (state: UsersInitialStateType = initialState, action: UsersActionsType): UsersReducerType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjInArray(state.users, action.userId, 'id', {followed: true})
      }
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjInArray(state.users, action.userId, 'id', {followed: false})
      };
    case SET_USERS:
      return {
        ...state,
        users: action.users
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.pageNumber
      }
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalUsers
      }
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
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