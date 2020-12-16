import React, {ChangeEvent, FC} from 'react';
import c from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader';
import {ProfileType} from '../../../redux/profile-reducer/profile-reducer';
import userPhoto from '../../../assets/images/default-avatar.png'
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';

type ProfileInfoPropsType = {
  profile: ProfileType
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (photo: File) => void
}
const ProfileInfo: FC<ProfileInfoPropsType> = function ({profile, status, updateStatus, isOwner, savePhoto}) {
  const onLoadPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files!.length) {
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
      <ProfileStatusWithHooks status={status}
                     updateStatus={updateStatus}/>
      <div className={c.description}>
        <img className={c.avatar} src={profile.photos.large ? profile.photos.large : userPhoto} alt="Avatar"/>
        {isOwner && <div>
          <input type='file' onChange={onLoadPhoto}/>
        </div>}
        <div>{profile.aboutMe}</div>
      </div>
    </div>
  )
}

export default ProfileInfo;