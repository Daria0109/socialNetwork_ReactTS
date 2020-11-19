import React from 'react';
import c from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader';
import {ProfileType} from '../../../redux/profile-reducer/profile-reducer';
import userPhoto from '../../../assets/images/default-avatar.png'
import ProfileStatus from './ProfileStatus/ProfileStatus';

type ProfileInfoPropsType = {
  profile: ProfileType
  status: string
  updateStatus: (status: string) => void
}
const ProfileInfo = function (props: ProfileInfoPropsType) {
  if (!Object.keys(props.profile).length) {
    return <Preloader/>
  }
  return (
    <div>
      <div className={c.image_item}>
        <img className={c.image} src="https://miro.medium.com/max/8576/0*zBu6EBAwjXXXHz-z" alt="Image"/>
      </div>
      <ProfileStatus status={props.status}
                     updateStatus={props.updateStatus}/>
      <div className={c.description}>
        <img className={c.avatar} src={props.profile.photos.large ? props.profile.photos.large : userPhoto} alt="Avatar"/>
        <div>{props.profile.aboutMe}</div>
      </div>
    </div>
  )
}

export default ProfileInfo;