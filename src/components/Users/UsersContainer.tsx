import {connect} from 'react-redux';
import {
    followAC, setCurrentPageAC, setTotalUsersCountAC,
    setUsersAC,
    unfollowAC,
    UsersAC,
    UserType
} from '../../redux/usersReducer';
import {RootStoreType} from '../../redux/redux-store';
import React from 'react';
import axios from 'axios';
import Users from './Users';


export type UsersContainerPropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalUsers: number) => void
}

class UsersContainer extends React.Component<UsersContainerPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then((response: any) => {
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount)
        })
    }

    setCurrentPage = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then((response: any) => {
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount)
        })
    }

    render() {
        return <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      setCurrentPage={this.setCurrentPage}
                      users={this.props.users}
                      follow={this.props.follow}
                      unfollow={this.props.follow}/>
    }
}

const mapStateToProps = (state: RootStoreType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}
const mapDispatchToProps = (dispatch: (action: UsersAC) => void) => {
    return {
        follow: (userId: number) => dispatch(followAC(userId)),
        unfollow: (userId: number) => dispatch(unfollowAC(userId)),
        setUsers: (users: Array<UserType>) => dispatch(setUsersAC(users)),
        setCurrentPage: (pageNumber: number) => dispatch(setCurrentPageAC(pageNumber)),
        setTotalUsersCount: (totalUsers: number) => dispatch(setTotalUsersCountAC(totalUsers))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);