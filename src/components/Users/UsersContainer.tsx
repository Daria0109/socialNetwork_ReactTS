import {connect} from 'react-redux';
import Users from './Users';
import {
    followAC,
    setUsersAC,
    unfollowAC,
    UsersAC,
    UserType
} from '../../redux/usersReducer';
import {RootStoreType} from '../../redux/redux-store';


const mapStateToProps = (state: RootStoreType) => {
    return {
      users: state.usersPage.users
    }
}
const mapDispatchToProps = (dispatch: (action: UsersAC) => void) => {
    return {
        follow: (userId: number) => dispatch(followAC(userId)),
        unfollow: (userId: number) => dispatch(unfollowAC(userId)),
        setUsers: (users: Array<UserType>) => dispatch(setUsersAC(users))
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
export default UsersContainer;