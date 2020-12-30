import {connect} from 'react-redux';
import {
  follow,
  getUsers,
  unfollow, usersActions, UsersThunkType,
} from '../../redux/users-reducer/users-reducer';
import {AppStateType} from '../../redux/redux-store';
import React, {ComponentType} from 'react';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import {Nullable, UsersSearchFormType, UserType} from '../../redux/types/types';

type MapStatePropsType = {
  users: Array<UserType>
  pageSize: number
  totalUsersCount: number
  currentPage: number
  portionSize: number
  isFetching: boolean
  followingInProgress: Array<number>
  filter: UsersSearchFormType
}
type MapDispatchPropsType = {
  follow: (userId: number) => UsersThunkType
  unfollow: (userId: number) => UsersThunkType
  setCurrentPage: (pageNumber: number) => void
  toggleFollowingProgress: (isFollowingProgress: boolean, userId: number) => void
  getUsers: (currentPage: number, pageSize: number, filter: UsersSearchFormType) => UsersThunkType
}
export type UsersContainerPropsType = MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends React.Component<UsersContainerPropsType> {
  componentDidMount() {
    const {getUsers, currentPage, pageSize, filter} = this.props;
    getUsers(currentPage, pageSize, filter)
  }

  setCurrentPage = (pageNumber: number) => {
    const {setCurrentPage, getUsers, pageSize, filter} = this.props;
    setCurrentPage(pageNumber);
    getUsers(pageNumber, pageSize, filter);
  }

    onFilterChanged = (filter: UsersSearchFormType) => {
      const {getUsers, pageSize} = this.props;
      getUsers(1, pageSize, filter)
    }

  render() {
    const {isFetching, totalUsersCount, pageSize, currentPage, users, portionSize,
      follow, unfollow, followingInProgress, toggleFollowingProgress} = this.props;
    return (
      <>
        {isFetching ? <Preloader/> : null}
        <Users totalUsersCount={totalUsersCount}
               pageSize={pageSize}
               currentPage={currentPage}
               portionSize={portionSize}
               setCurrentPage={this.setCurrentPage}
               users={users}
               follow={follow}
               unfollow={unfollow}
               followingInProgress={followingInProgress}
               toggleFollowingProgress={toggleFollowingProgress}
               onFilterChanged={this.onFilterChanged}/>
      </>
    )
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
    portionSize: state.usersPage.portionSize,
    filter: state.usersPage.filter
  }
}

const setCurrentPage = usersActions.setCurrentPage;
const toggleFollowingProgress = usersActions.toggleFollowingProgress;
export default compose<ComponentType>(
  connect<MapStatePropsType,
  MapDispatchPropsType, {},
  AppStateType>(mapStateToProps, {
  setCurrentPage,
  toggleFollowingProgress,
  getUsers,
  follow,
  unfollow
}))(UsersContainer);