import {connect} from 'react-redux';
import Users from './Users';
import {
    followAC, setCurrentPageAC, setTotalUsersCountAC,
    setUsersAC,
    unfollowAC,
    UsersAC,
    UserType
} from '../../redux/usersReducer';
import {RootStoreType} from '../../redux/redux-store';


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

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
export default UsersContainer;