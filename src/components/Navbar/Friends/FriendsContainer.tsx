import {connect} from 'react-redux';
import Friends from './Friends';
import {RootStoreType} from '../../../redux/redux-store';


const mapStateToProps = (state: RootStoreType) => {
    return {
        friends: state.navbar.friends
    }
}
const  mapDispatchToProps = (dispatch: () => void) => {
    return {

    }
}

const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends);
export default FriendsContainer;