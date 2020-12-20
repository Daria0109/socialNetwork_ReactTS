import React from 'react';
import s from './../ProfileInfo/ProfileInfo.module.css'

type SocialContactPropsType = {
  title: string
  socialLink: string
}
const SocialContact: React.FC<SocialContactPropsType> = ({title, socialLink}) => {
  return (
    <div className={s.social}><b>{title}:</b> {socialLink}</div>
  )
}
export default SocialContact;