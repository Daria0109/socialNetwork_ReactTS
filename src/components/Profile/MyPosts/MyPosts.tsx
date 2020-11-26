import React from 'react';
import c from './MyPosts.module.css'
import Post from './Post/Post';
import {ProfileReducerType} from '../../../redux/profile-reducer/profile-reducer'
import {Field, reduxForm, InjectedFormProps} from 'redux-form';
import {maxLengthValidatorCreator, required} from '../../utilities/validators/validators';
import {Textarea} from '../../common/FormControls/FormControls';

const maxLength10 = maxLengthValidatorCreator(10)

const PostForm = reduxForm<any, any>({form: 'post'})((props: InjectedFormProps<any>) => {
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
})

type MyPostsPropsType = {
  profilePage: ProfileReducerType
  addPost: (post: string) => void
}
type PostValuePropsType = {
  post: string
}
const MyPosts = function (props: MyPostsPropsType) {

  const onAddPost = (value: PostValuePropsType) => {
    props.addPost(value.post);
  }

  const postsElement = props.profilePage.posts.map(post =>
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
}
export default MyPosts