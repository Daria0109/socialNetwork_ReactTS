import React, {ChangeEvent} from 'react';
import c from './MyPosts.module.css'
import Post from './Post/Post';
import {ProfileReducerType} from '../../../redux/profile-reducer'

type MyPostsPropsType = {
    profilePage: ProfileReducerType
    addPost: () => void
    updatePost: (updatedPostText: string) => void
}

const MyPosts = function (props: MyPostsPropsType) {

    const onAddPost = () => {
        props.addPost();
    }

    const onUpdatePost =(e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updatePost(e.currentTarget.value)
    }

    const postsElement = props.profilePage.posts.map(post =>
        <Post id={post.id}
              avatar={post.avatar}
              message={post.message}
              likesCount={post.likesCount}/>)
    return (
        <div className={c.posts}>
            My posts
            <div>
                <textarea value={props.profilePage.newTextPost}
                          onChange={onUpdatePost}></textarea>
                <button onClick={onAddPost}>Add Post</button>
            </div>
            {postsElement}
        </div>
    )
}
export default MyPosts