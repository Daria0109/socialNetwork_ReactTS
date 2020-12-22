import {connect} from 'react-redux';
import Friends from './Friends';
import {AppStateType} from '../../../redux/redux-store';
import {FriendType} from '../../../redux/types/types';

type MapStatePropsType = {
    friends: Array<FriendType>
}

const mapStateToProps = (state: AppStateType) => {
    return {
        friends: state.navbar.friends
    }
}
const  mapDispatchToProps = (dispatch: () => void) => {
    return {
    }
}

const FriendsContainer = connect<MapStatePropsType, {}, {}, AppStateType>
(mapStateToProps, mapDispatchToProps)(Friends);
export default FriendsContainer;