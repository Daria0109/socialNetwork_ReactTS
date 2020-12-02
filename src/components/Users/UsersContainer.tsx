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
import {Redirect} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';

type MapStatePropsType = {
  users: Array<UserType>
  pageSize: number
  totalUsersCount: number
  currentPage: number
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
    this.props.getUsersTC(this.props.currentPage, this.props.pageSize)
    // this.props.toggleIsFetching(true);
    // usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
    //     this.props.toggleIsFetching(false);
    //     this.props.setUsers(data.items);
    //     this.props.setTotalUsersCount(data.totalCount)
    // })
  }

  setCurrentPage = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber);
    this.props.getUsersTC(pageNumber, this.props.pageSize);
  }

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader/> : null}
        <Users totalUsersCount={this.props.totalUsersCount}
               pageSize={this.props.pageSize}
               currentPage={this.props.currentPage}
               setCurrentPage={this.setCurrentPage}
               users={this.props.users}
               follow={this.props.followTC}
               unfollow={this.props.unfollowTC}
               followingInProgress={this.props.followingInProgress}
               toggleFollowingProgress={this.props.toggleFollowingProgress}/>
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