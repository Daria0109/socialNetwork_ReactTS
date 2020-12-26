import React from 'react';
import {DecoratedComponentClass, DecoratedFormProps, InjectedFormProps, reduxForm} from 'redux-form';
import {createForm, Input, Textarea} from '../../common/FormControls/FormControls';
import SocialContactForm from './SocialContactForm';
import s from '../../common/FormControls/FormControls.module.css';
import {ProfileType} from '../../../redux/types/types';

type ProfileDataFormPropsType = {
  data: ProfileType
}
export type ProfileTypeKeys = Extract<keyof ProfileType, string>

const ProfileDataForm:  DecoratedComponentClass<ProfileType, DecoratedFormProps<ProfileType, ProfileDataFormPropsType>> =
  reduxForm<ProfileType, ProfileDataFormPropsType>({form: 'edit-profile'})(
  (props) => {
  return <form onSubmit={props.handleSubmit}>
    <div>Full name: {createForm<ProfileTypeKeys>(Input, 'fullName', 'Name...', [])}</div>
    <div>About Me: {createForm<ProfileTypeKeys>(Textarea, 'aboutMe', 'About me...', [])}</div>
    <div>Look for a job: {createForm<ProfileTypeKeys>('input', 'lookingForAJob', null, [], {type: 'checkbox'})}</div>
    <div>My skills: {createForm<ProfileTypeKeys>(Textarea, 'lookingForAJobDescription', 'My skills...', [])}</div>
    <div>Contacts: </div>
    {Object.keys(props.data.contacts).map(key =>
      <SocialContactForm key={key} title={key} socialLink={props.data.contacts[key]}/>)}

    {props.error && <div className={s.errorSubmit}>{props.error}</div>}
    <button onClick={() => {}}>Save</button>
  </form>

})
export default ProfileDataForm;