import React from 'react';
import {ProfileType} from '../../../redux/profile-reducer/profile-reducer';
import SocialContact from './SocialContact';

type ProfileDataPropsType = {
  data: ProfileType
  isOwner: boolean
  setEditMode: (mode: boolean) => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({data, isOwner, setEditMode}) => {
  return <div>
    {isOwner && <button onClick={() => setEditMode(true)}>Edit Profile</button>}
    <div>Full name: {data.fullName}</div>
    <div>About Me: {data.aboutMe}</div>
    <div>Look for a job: {data.lookingForAJob ? 'Yes' : 'No'}</div>
    <div>My skills: {data.lookingForAJobDescription}</div>
    <div>Contacts: </div>
    {Object.keys(data.contacts).map(key =>
      <SocialContact key={key} title={key} socialLink={data.contacts[key]}/>)}
  </div>

}
export default ProfileData;