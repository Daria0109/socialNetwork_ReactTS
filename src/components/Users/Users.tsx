import React from 'react';
import s from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import {UserType} from '../../redux/types/types';
import {UsersThunkType} from '../../redux/users-reducer/users-reducer';


export type UsersPropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  portionSize: number
  setCurrentPage: (pageNumber: number) => void
  users: Array<UserType>
  follow: (userId: number) => UsersThunkType
  unfollow: (userId: number) => UsersThunkType
  followingInProgress: Array<number>
  toggleFollowingProgress: (isFollowingProgress: boolean, userId: number) => void
}


const Users: React.FC<UsersPropsType> = function ({totalUsersCount, pageSize, currentPage,
                                              portionSize, setCurrentPage, users, followingInProgress,
                                              unfollow, follow}) {
  return (
    <div className={s.users}>
      <Paginator totalUsersCount={totalUsersCount}
                 pageSize={pageSize}
                 currentPage={currentPage}
                 setCurrentPage={setCurrentPage}
                 portionSize={portionSize}/>
      {
        users.map(u => <User key={u.id}
                             user={u}
                             unfollow={unfollow}
                             follow={follow}
                             followingInProgress={followingInProgress}/>)
      }
    </div>
  )
}

export default Users;