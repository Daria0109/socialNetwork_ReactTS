import React, {ChangeEvent, FC, useState} from 'react';
import c from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader';
import userPhoto from '../../../assets/images/default-avatar.png'
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import ProfileData from '../ProfileData/ProfileData';
import ProfileDataForm from '../ProfileData/ProfileDataForm';
import {ProfileType} from '../../../redux/types/types';

type ProfileInfoPropsType = {
  profile: ProfileType
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (photo: File) => void
  saveProfile: (profile: ProfileType) => void
  editMode: boolean
  setEditModeProfile: (editMode: boolean) => void
}

const ProfileInfo: FC<ProfileInfoPropsType> = function ({profile, status,
                                                          updateStatus, isOwner, savePhoto,
                                                          saveProfile, editMode, setEditModeProfile}) {
  // const [editMode, setEditMode] = useState(false);

  const onSubmit = (formData: ProfileType) => {
    saveProfile(formData)
  }

  const onLoadPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files![0])
    }
  }

  if (!Object.keys(profile).length) {
    return <Preloader/>
  }
  return (
    <div>
      {/*<div className={c.image_item}>*/}
      {/*  <img className={c.image} src="https://miro.medium.com/max/8576/0*zBu6EBAwjXXXHz-z" alt="Image"/>*/}
      {/*</div>*/}

      <div className={c.description}>
        <img className={c.avatar} src={profile.photos.large ? profile.photos.large : userPhoto} alt="Avatar"/>
        {isOwner &&
        <div>
          <input type='file' onChange={onLoadPhoto}/>
        </div>}
        <ProfileStatusWithHooks status={status}
                                   updateStatus={updateStatus}/>
        <hr/>
        {editMode
        ? <ProfileDataForm data={profile}
                           onSubmit={onSubmit}
                           initialValues={profile}/>
        : <ProfileData data={profile}
                       isOwner={isOwner}
                       setEditMode={setEditModeProfile}/>
        }
      </div>
    </div>
  )
}



export default ProfileInfo;