import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPosts from './MyPosts/MyPosts';
import {ProfileType} from '../../redux/profile-reducer/profile-reducer';


export type ProfilePropsType = {
  profile: ProfileType
  status: string
  updateStatus: (status: string) => void
}

const Profile = function (props: ProfilePropsType) {
   return (
    <div>
      <ProfileInfo profile={props.profile}
                   status={props.status}
                   updateStatus={props.updateStatus}/>
      <MyPosts/>
    </div>
  )
}
export default Profile