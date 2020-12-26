import {ApiResponseType, ResultCodes, usersAPI} from '../../api/api';
import {Dispatch} from 'react';
import {updateObjInArray} from '../../components/utilities/helpers/object-helpers';
import {InferActionsTypes, ThunkType, UserType} from '../types/types';


enum actions {
  FOLLOW = 'samurai-network/users/FOLLOW',
  UNFOLLOW = 'samurai-network/users/UNFOLLOW',
  SET_USERS = 'samurai-network/users/SET-USERS',
  SET_CURRENT_PAGE = 'samurai-network/users/SET-CURRENT-PAGE',
  SET_TOTAL_USERS_COUNT = 'samurai-network/users/SET-TOTAL-USERS-COUNT',
  TOGGLE_IS_FETCHING = 'samurai-network/users/TOGGLE-IS-FETCHING',
  TOGGLE_FOLLOWING_PROGRESS = 'samurai-network/users/TOGGLE-FOLLOWING-PROGRESS'
}

// A c t i o n  C r e a t o r s
export const usersActions = {
  follow: (userId: number) => ({type: actions.FOLLOW, userId} as const),
  unfollow: (userId: number) => ({type: actions.UNFOLLOW, userId} as const),
  setUsers: (users: Array<UserType>) => ({type: actions.SET_USERS, users} as const),
  setCurrentPage: (pageNumber: number) => ({type: actions.SET_CURRENT_PAGE, pageNumber} as const),
  setTotalUsersCount: (totalUsers: number) => ({type: actions.SET_TOTAL_USERS_COUNT, totalUsers} as const),
  toggleIsFetching: (isFetching: boolean) => ({type: actions.TOGGLE_IS_FETCHING, isFetching} as const),
  toggleFollowingProgress: (isFollowingProgress: boolean, userId: number) => ({
    type: actions.TOGGLE_FOLLOWING_PROGRESS, isFollowingProgress, userId
  } as const)
}
export type UsersActionsType = InferActionsTypes<typeof usersActions>;


// T h u n k  C r e a t o r s
export type UsersThunkType = ThunkType<UsersActionsType>;
export const getUsers = (currentPage: number, pageSize: number): UsersThunkType => {
  return async (dispatch) => {
    dispatch(usersActions.toggleIsFetching(true));
    let users = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(usersActions.toggleIsFetching(false));
    dispatch(usersActions.setUsers(users.items));
    dispatch(usersActions.setTotalUsersCount(users.totalCount))
  }
}
const followUnfollowFlow = async (dispatch: Dispatch<UsersActionsType>, userId: number,
                                  apiMethod: (userId: number) => Promise<ApiResponseType>,
                                  actionCreator: (userId: number) =>
                                  ReturnType<typeof usersActions.follow> | ReturnType<typeof usersActions.unfollow>) => {
  dispatch(usersActions.toggleFollowingProgress(true, userId));
  let result = await apiMethod(userId);
  if (result.resultCode === ResultCodes.Success) {
    dispatch(actionCreator(userId))
  }
  dispatch(usersActions.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): UsersThunkType => {
  return async (dispatch) => {
    const apiMethod = usersAPI.followUsers.bind(usersAPI);
    await followUnfollowFlow(dispatch, userId, apiMethod, usersActions.follow)
  }
}
export const unfollow = (userId: number): UsersThunkType => {
  return async (dispatch) => {
    const apiMethod = usersAPI.unfollowUsers.bind(usersAPI);
    await followUnfollowFlow(dispatch, userId, apiMethod, usersActions.unfollow)
  }
}

// I n i t i a l  S t a t e
let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  portionSize: 10,
  isFetching: true,
  followingInProgress: [] as Array<number>,

}
export type UsersInitialStateType = typeof initialState;


// R e d u c e r
let usersReducer = (state = initialState, action: UsersActionsType): UsersInitialStateType => {
  switch (action.type) {
    case actions.FOLLOW:
      return {
        ...state,
        users: updateObjInArray(state.users, action.userId, 'id', {followed: true})
      }
    case actions.UNFOLLOW:
      return {
        ...state,
        users: updateObjInArray(state.users, action.userId, 'id', {followed: false})
      };
    case actions.SET_USERS:
      return {
        ...state,
        users: action.users
      }
    case actions.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.pageNumber
      }
    case actions.SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalUsers
      }
    case actions.TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      }

    case actions.TOGGLE_FOLLOWING_PROGRESS:
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