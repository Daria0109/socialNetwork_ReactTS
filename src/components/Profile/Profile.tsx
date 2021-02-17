import React, {useEffect} from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPosts from './MyPosts/MyPosts';
import {Nullable, ProfileType} from '../../redux/types/types';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
  profileActions,
  savePhoto,
  saveProfile,
  updateStatus,
  getUserProfile,
  getStatus
} from '../../redux/profile-reducer/profile-reducer';
import {useHistory, useRouteMatch} from 'react-router-dom';

interface MatchParams {
  userId: string;
}
export type ProfilePropsType = {
}

const Profile: React.FC<ProfilePropsType> = function ({}) {
  const history = useHistory();
  const match = useRouteMatch<MatchParams>('/profile/:userId?');

  const profile = useSelector<AppStateType, ProfileType>(state => state.profilePage.profile);
  const status = useSelector<AppStateType, string>(state => state.profilePage.status);
  const editMode = useSelector<AppStateType, boolean>(state => state.profilePage.editMode);
  const authorizedUserId = useSelector<AppStateType, Nullable<number>>(state => state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    let userId = Number(match?.params.userId);
      if (!userId) {
        userId = authorizedUserId as number;
        if (!userId) {
          history.push('/login')
        }
      }

    dispatch(getUserProfile(userId));
    dispatch(getStatus(userId))
  }, [match?.params.userId])

  const onUpdateStatus = (status: string) => {
    dispatch(updateStatus(status))
  }
  const onSavePhoto = (photo: File) => {
    dispatch(savePhoto(photo))
  }
  const onSaveProfile = (profile: ProfileType) => {
    dispatch(saveProfile(profile))
  }
  const onSetEditModeProfile = (editMode: boolean) => {
    dispatch(profileActions.setEditModeProfile((editMode)))
  }

  return (
    <div>
      <ProfileInfo isOwner={!match?.params.userId}
                   profile={profile}
                   status={status}
                   updateStatus={onUpdateStatus}
                   savePhoto={onSavePhoto}
                   saveProfile={onSaveProfile}
                   editMode={editMode}
                   setEditModeProfile={onSetEditModeProfile}/>
      <MyPosts/>
    </div>
  )
}
export default Profile