import React, {FC} from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPosts from './MyPosts/MyPosts';
import {ProfileType} from '../../redux/profile-reducer/profile-reducer';


export type ProfilePropsType = {
  profile: ProfileType
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (photo: File) => void
}

const Profile: FC<ProfilePropsType> = function ({profile, status, updateStatus,
                                                  isOwner, savePhoto}) {
   return (
    <div>
      <ProfileInfo isOwner={isOwner}
                   profile={profile}
                   status={status}
                   updateStatus={updateStatus}
                   savePhoto={savePhoto}/>
      <MyPosts/>
    </div>
  )
}
export default Profile