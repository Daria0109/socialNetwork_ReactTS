import React from 'react';
import s from './../ProfileInfo/ProfileInfo.module.css'
import {createForm, Input} from '../../common/FormControls/FormControls';

type SocialContactPropsType = {
  title: string
  socialLink: string
}
const SocialContactForm: React.FC<SocialContactPropsType> = ({title, socialLink}) => {
  return (
    <div className={s.social}>
      {createForm(Input, `contacts.${title}`, title, [])}
    </div>
  )
}
export default SocialContactForm;