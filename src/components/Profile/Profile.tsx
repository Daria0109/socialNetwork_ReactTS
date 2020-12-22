import React, {FC} from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPosts from './MyPosts/MyPosts';
import {ProfileType} from '../../redux/types/types';


export type ProfilePropsType = {
  profile: ProfileType
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (photo: File) => void
  saveProfile: (profile: ProfileType) => void
  editMode: boolean
  setEditModeProfile: (editMode: boolean) => void
}

const Profile: FC<ProfilePropsType> = function ({profile, status, updateStatus, isOwner,
                                                  savePhoto, saveProfile, editMode, setEditModeProfile}) {
   return (
    <div>
      <ProfileInfo isOwner={isOwner}
                   profile={profile}
                   status={status}
                   updateStatus={updateStatus}
                   savePhoto={savePhoto}
                   saveProfile={saveProfile}
                   editMode={editMode}
                   setEditModeProfile={setEditModeProfile}/>
      <MyPosts/>
    </div>
  )
}
export default Profile