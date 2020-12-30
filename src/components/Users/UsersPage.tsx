import {useSelector} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import React from 'react';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';


const UsersPage = () => {
  const isFetching = useSelector<AppStateType, boolean>(state => state.usersPage.isFetching);

  return (
    <>
      {isFetching ? <Preloader/> : null}
      <Users/>
    </>
  )
}
export default UsersPage;