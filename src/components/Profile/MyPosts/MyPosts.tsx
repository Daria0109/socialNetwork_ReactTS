import React from 'react';
import c from './MyPosts.module.css'
import Post from './Post/Post';
import {profileActions, ProfileInitialStateType} from '../../../redux/profile-reducer/profile-reducer'
import {reduxForm, DecoratedComponentClass, DecoratedFormProps} from 'redux-form';
import {maxLengthValidatorCreator, required} from '../../utilities/validators/validators';
import {createForm, Textarea} from '../../common/FormControls/FormControls';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../../redux/redux-store';

const maxLength10 = maxLengthValidatorCreator(10)

const PostForm: DecoratedComponentClass<PostFormValuesPropsType, DecoratedFormProps<PostFormValuesPropsType>> =
  reduxForm<PostFormValuesPropsType, {}>({form: 'post'})(({handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      {createForm<PostFormKeysType>(Textarea, 'post', 'New post...', [required, maxLength10])}
      <div>
        <button>Add Post</button>
      </div>
    </form>
  )
})


type PostFormValuesPropsType = {
  post: string
}
type PostFormKeysType = Extract<keyof PostFormValuesPropsType, string>

const MyPosts = React.memo(() =>  {
  const dispatch = useDispatch();
  const profilePage = useSelector<AppStateType, ProfileInitialStateType>(state => state.profilePage);

  const onAddPost = (value: PostFormValuesPropsType) => {
    dispatch(profileActions.addPost(value.post));
  }

  const postsElement = profilePage.posts.map(post =>
    <Post key={post.id} id={post.id}
          avatar={post.avatar}
          message={post.message}
          likesCount={post.likesCount}/>)
  return (
    <div className={c.posts}>
      <PostForm onSubmit={onAddPost}/>
      {postsElement}
    </div>
  )
})
export default MyPosts