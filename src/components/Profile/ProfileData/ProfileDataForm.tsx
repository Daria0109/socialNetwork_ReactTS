import React from 'react';
import {ProfileType} from '../../../redux/profile-reducer/profile-reducer';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {createForm, Input, Textarea} from '../../common/FormControls/FormControls';
import SocialContactForm from './SocialContactForm';
import s from '../../common/FormControls/FormControls.module.css';

type ProfileDataFormPropsType = {
  data: ProfileType
}

const ProfileDataForm = reduxForm<any, any>({form: 'edit-profile'})(
  (props: InjectedFormProps<ProfileType> & ProfileDataFormPropsType) => {
  return <form onSubmit={props.handleSubmit}>
    <div>Full name: {createForm(Input, 'fullName', 'Name...', [])}</div>
    <div>About Me: {createForm(Textarea, 'aboutMe', 'About me...', [])}</div>
    <div>Look for a job: {createForm('input', 'lookingForAJob', null, [], {type: 'checkbox'})}</div>
    <div>My skills: {createForm(Textarea, 'lookingForAJobDescription', 'My skills...', [])}</div>
    <div>Contacts: </div>
    {Object.keys(props.data.contacts).map(key =>
      <SocialContactForm key={key} title={key} socialLink={props.data.contacts[key]}/>)}

    {props.error && <div className={s.errorSubmit}>{props.error}</div>}
    <button onClick={() => {}}>Save</button>
  </form>

})
export default ProfileDataForm;