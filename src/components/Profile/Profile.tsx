import React, {FC} from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPosts from './MyPosts/MyPosts';
import {ProfileType} from '../../redux/profile-reducer/profile-reducer';


export type ProfilePropsType = {
  profile: ProfileType
  status: string
  updateStatus: (status: string) => void
}

const Profile: FC<ProfilePropsType> = function ({profile, status, updateStatus}) {
   return (
    <div>
      <ProfileInfo profile={profile}
                   status={status}
                   updateStatus={updateStatus}/>
      <MyPosts/>
    </div>
  )
}
export default Profile