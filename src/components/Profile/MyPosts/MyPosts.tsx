import React from 'react';
import c from './MyPosts.module.css'
import Post from './Post/Post';
import {profileActions, ProfileInitialStateType} from '../../../redux/profile-reducer/profile-reducer'
import {Field, reduxForm, InjectedFormProps} from 'redux-form';
import {maxLengthValidatorCreator, required} from '../../utilities/validators/validators';
import {Textarea} from '../../common/FormControls/FormControls';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../../redux/redux-store';

const maxLength10 = maxLengthValidatorCreator(10)

const PostForm = React.memo(reduxForm<any, any>({form: 'post'})((props: InjectedFormProps<any>) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={Textarea} name='post' placeholder='New post...' validate={[required, maxLength10]}/>
      </div>
      <div>
        <button>Add Post</button>
      </div>
    </form>
  )
}))

// type MyPostsPropsType = {
//   profilePage: ProfileReducerType
//   addPost: (post: string) => void
// }
type PostValuePropsType = {
  post: string
}

const MyPosts = React.memo(() =>  {
  // debugger
  const dispatch = useDispatch();
  const profilePage = useSelector<AppStateType, ProfileInitialStateType>(state => state.profilePage);

  const onAddPost = (value: PostValuePropsType) => {
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