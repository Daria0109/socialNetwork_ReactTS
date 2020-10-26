import React from 'react';
import c from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader';
import {ProfileType} from '../../../redux/profileReducer';

type ProfileInfoPropsType = {
  profile: ProfileType
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
      <div className={c.description}>
        <img src={props.profile?.photos?.large} alt="Avatar"/>
        <div>{props.profile.aboutMe}</div>
      </div>
    </div>
  )
}

export default ProfileInfo;