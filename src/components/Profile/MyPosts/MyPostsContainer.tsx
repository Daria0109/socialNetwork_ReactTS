import React from 'react';
import {AppStateType} from '../../../redux/redux-store';
import {profileActions, ProfileInitialStateType} from '../../../redux/profile-reducer/profile-reducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';


type MapStatePropsType = {
    profilePage: ProfileInitialStateType
}
type MapDispatchPropsType = {
    addPost: (post: string) => void
}
const mapStateToProps = (state: AppStateType) => {
    return {
        profilePage: state.profilePage,
    }
}

const addPost = profileActions.addPost;
const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>
(mapStateToProps, {addPost})(MyPosts);
export default MyPostsContainer;




