import React from 'react';
import {AppStateType} from '../../../redux/redux-store';
import {addPost, ProfileInitialStateType} from '../../../redux/profile-reducer/profile-reducer';
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

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>
(mapStateToProps, {addPost})(MyPosts);
export default MyPostsContainer;




// const MyPostsContainer = function (props: MyPostsContainerPropsType) {
//     let state = props.store.getState();
//
//     const addPost = () => {
//         let action = addPostActionCreator();
//         props.store.dispatch(action);
//
//     }
//     const updatePost = (updatedPostText: string) => {
//         let action = updatePostActionCreator(updatedPostText);
//         props.store.dispatch(action);
//     }
//
//     return (
//         <MyPosts profilePage={state.profilePage}
//                  addPost={addPost}
//                  updatePost={updatePost}/>
//     )
// }
// export default MyPostsContainer;