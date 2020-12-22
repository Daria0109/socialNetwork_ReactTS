import React, {FC} from 'react';
import s from './Users.module.css';
import {NavLink} from 'react-router-dom';
import userPhoto from '../../assets/images/default-avatar.png';
import {FollowUnfollowType, UserType} from '../../redux/types/types';

type UserPropsType = {
  user: UserType
  followingInProgress: Array<number>
  unfollow: (userId: number) => FollowUnfollowType
  follow: (userId: number) => FollowUnfollowType
}
const User: FC<UserPropsType> = ({user, followingInProgress, unfollow, follow}) => {
  return <div key={user.id} className={s.user_block}>
    <div className={s.user_left}>
      <NavLink to={'/profile/' + user.id}>
        <img src={user.photos.small ? user.photos.small : userPhoto} className={s.avatar}/>
      </NavLink>
      {user.followed
        ? <button className={s.btn}
                  disabled={followingInProgress.some(id => id === user.id)}
                  onClick={() => unfollow(user.id)}>Unfollow</button>

        : <button className={s.btn}
                  disabled={followingInProgress.some(id => id === user.id)}
                  onClick={() => follow(user.id)}>Follow</button>}
    </div>

    <div className={s.user_right}>
      <div className={s.info}>
        <div>{user.name}</div>
        <div>{user.status}</div>
      </div>
      <div className={s.place}>
        <div>{'user.location.country'}</div>
        <div>{'user.location.city'}</div>
      </div>
    </div>
  </div>
}
export default User;