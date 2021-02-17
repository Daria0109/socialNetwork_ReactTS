import React, {useEffect} from 'react';
import s from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import {UsersSearchFormType, UserType} from '../../redux/types/types';
import {follow, getUsers, unfollow, usersActions} from '../../redux/users-reducer/users-reducer';
import UsersSearchForm from './UsersSearchForm';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import { useHistory } from 'react-router-dom';
import * as queryString from 'querystring'


export type UsersPropsType = {
}
type QueryParamsType = {
  page?: string
  term?: string
  friend?: string
}


const Users: React.FC<UsersPropsType> = function ({}) {
  const totalUsersCount = useSelector<AppStateType, number>(state => state.usersPage.totalUsersCount);
  const portionSize = useSelector<AppStateType, number>(state => state.usersPage.portionSize);
  const pageSize = useSelector<AppStateType, number>(state => state.usersPage.pageSize)
  const currentPage = useSelector<AppStateType, number>(state => state.usersPage.currentPage);
  const users = useSelector<AppStateType, Array<UserType>>(state => state.usersPage.users);
  const followingInProgress = useSelector<AppStateType, Array<number>>(state => state.usersPage.followingInProgress);
  const filter = useSelector<AppStateType, UsersSearchFormType>(state => state.usersPage.filter);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType;

    let actualPage = currentPage;
    if (!!parsed.page) actualPage = Number(parsed.page);
    let actualFilter = filter;
    if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term};
    switch (parsed.friend) {
      case 'null':
        actualFilter = {...actualFilter, friend: null};
        break;
      case 'true':
        actualFilter = {...actualFilter, friend: true};
        break;
      case 'false':
        actualFilter = {...actualFilter, friend: false};
        break;
    }

    dispatch(getUsers(actualPage, pageSize, actualFilter))
  }, [])

  useEffect(() => {
    const query: QueryParamsType = {};
    if (currentPage !== 1) query.page = String(currentPage);
    if (filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend)

    history.push({
      pathname: '/users',
      search: queryString.stringify(query)
    })
  }, [filter, currentPage])

  const onChangeCurrentPage = (pageNumber: number) => {
    dispatch(usersActions.setCurrentPage(pageNumber));
    dispatch(getUsers(pageNumber, pageSize, filter));
  }
  const onFilterChanged = (filterForm: UsersSearchFormType) => {
    dispatch(getUsers(1, pageSize, filterForm));
  }
  const followUser = (userId: number) => {
    dispatch(follow(userId))
  }
  const unfollowUser = (userId: number) => {
    dispatch(unfollow(userId))
  }


  return <div className={s.users}>
      <UsersSearchForm onFilterChanged={onFilterChanged}/>
      <Paginator totalUsersCount={totalUsersCount}
                 pageSize={pageSize}
                 currentPage={currentPage}
                 setCurrentPage={onChangeCurrentPage}
                 portionSize={portionSize}/>
      {
        users.map(u => <User key={u.id}
                             user={u}
                             unfollow={unfollowUser}
                             follow={followUser}
                             followingInProgress={followingInProgress}/>)
      }
    </div>
}

export default Users;