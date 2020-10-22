import React from 'react';
import {RootStoreType} from '../../../redux/redux-store';
import {
    addPostActionCreator,
    PostActionsTypes,
    updatePostActionCreator
} from '../../../redux/profileReducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';

type MyPostsContainerPropsType = {
    // store: RootStoreType
}

const mapStateToProps = (state: RootStoreType) => {
    return {
        profilePage: state.profilePage,
    }
}
const mapDispatchToProps = (dispatch: (action: PostActionsTypes) => void) => {
    return {
        addPost: () => dispatch(addPostActionCreator()),
        updatePost: (updatedPostText: string) =>
            dispatch(updatePostActionCreator(updatedPostText))
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
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