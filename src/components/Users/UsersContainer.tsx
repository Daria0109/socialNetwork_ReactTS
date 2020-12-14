import {connect} from 'react-redux';
import {
  followTC,
  getUsersTC,
  setCurrentPage,
  toggleFollowingProgress,
  unfollowTC,
  UserType
} from '../../redux/users-reducer/users-reducer';
import {AppStateType} from '../../redux/redux-store';
import React, {ComponentType} from 'react';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';

type MapStatePropsType = {
  users: Array<UserType>
  pageSize: number
  totalUsersCount: number
  currentPage: number
  portionSize: number
  isFetching: boolean
  followingInProgress: Array<number>,
}
type MapDispatchPropsType = {
  followTC: any
  unfollowTC: any
  setCurrentPage: (pageNumber: number) => void
  toggleFollowingProgress: (isFollowingProgress: boolean, userId: number) => void
  getUsersTC: any,
}
export type UsersContainerPropsType = MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends React.Component<UsersContainerPropsType> {
  componentDidMount() {
    const {getUsersTC, currentPage, pageSize} = this.props;
    getUsersTC(currentPage, pageSize)
    // this.props.toggleIsFetching(true);
    // usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
    //     this.props.toggleIsFetching(false);
    //     this.props.setUsers(data.items);
    //     this.props.setTotalUsersCount(data.totalCount)
    // })
  }

  setCurrentPage = (pageNumber: number) => {
    const {setCurrentPage, getUsersTC, pageSize} = this.props;
    setCurrentPage(pageNumber);
    getUsersTC(pageNumber, pageSize);
  }

  render() {
    const {isFetching, totalUsersCount, pageSize, currentPage, users, portionSize,
      followTC, unfollowTC, followingInProgress, toggleFollowingProgress} = this.props;
    return (
      <>
        {isFetching ? <Preloader/> : null}
        <Users totalUsersCount={totalUsersCount}
               pageSize={pageSize}
               currentPage={currentPage}
               portionSize={portionSize}
               setCurrentPage={this.setCurrentPage}
               users={users}
               follow={followTC}
               unfollow={unfollowTC}
               followingInProgress={followingInProgress}
               toggleFollowingProgress={toggleFollowingProgress}/>
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
    portionSize: state.usersPage.portionSize
  }
}

export default compose<ComponentType>(
  connect<MapStatePropsType,
  MapDispatchPropsType, {},
  AppStateType>(mapStateToProps, {
  setCurrentPage,
  toggleFollowingProgress,
  getUsersTC,
  followTC,
  unfollowTC
}))(UsersContainer);