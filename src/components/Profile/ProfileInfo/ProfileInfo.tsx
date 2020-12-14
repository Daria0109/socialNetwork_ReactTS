import React, {FC} from 'react';
import c from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader';
import {ProfileType} from '../../../redux/profile-reducer/profile-reducer';
import userPhoto from '../../../assets/images/default-avatar.png'
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';

type ProfileInfoPropsType = {
  profile: ProfileType
  status: string
  updateStatus: (status: string) => void
}
const ProfileInfo: FC<ProfileInfoPropsType> = function ({profile, status, updateStatus}) {
  if (!Object.keys(profile).length) {
    return <Preloader/>
  }
  return (
    <div>
      <div className={c.image_item}>
        <img className={c.image} src="https://miro.medium.com/max/8576/0*zBu6EBAwjXXXHz-z" alt="Image"/>
      </div>
      <ProfileStatusWithHooks status={status}
                     updateStatus={updateStatus}/>
      <div className={c.description}>
        <img className={c.avatar} src={profile.photos.large ? profile.photos.large : userPhoto} alt="Avatar"/>
        <div>{profile.aboutMe}</div>
      </div>
    </div>
  )
}

export default ProfileInfo;