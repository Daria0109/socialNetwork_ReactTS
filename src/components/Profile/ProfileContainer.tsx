import React, {ComponentType} from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
  getStatus,
  getUserProfile, profileActions, ProfileThunkType,
  savePhoto, saveProfile,
  updateStatus
} from '../../redux/profile-reducer/profile-reducer';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {compose} from 'redux';
import {ProfileType} from '../../redux/types/types';

type MapStatePropsType = {
  profile: ProfileType
  status: string
  authorizedUserId: number | null
  editMode: boolean
}
type MapDispatchPropsType = {
  getUserProfile: (userId: number) => ProfileThunkType
  getStatus: (userId: number) => ProfileThunkType
  updateStatus: (status: string) => ProfileThunkType
  savePhoto: (photo: File) => ProfileThunkType
  saveProfile: (profile: ProfileType) => ProfileThunkType
  setEditModeProfile: (editMode: boolean) => void
}
export type PathParamType = {
  userId: string
}
export type ProfileContainerPropsType = RouteComponentProps<PathParamType>
  & MapStatePropsType
  & MapDispatchPropsType

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
  refreshProfile() {
    const {match, getUserProfile, getStatus} = this.props;
    let userId = Number(match.params.userId);
    if (!userId) {
      userId = this.props.authorizedUserId as number;
      if (!userId) {
        this.props.history.push('/login')
      }
    }
    getUserProfile(userId);
    getStatus(userId)
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps: ProfileContainerPropsType, prevState: ProfileContainerPropsType) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile()
    }
  }

  render() {
    const {profile, status, updateStatus, match, savePhoto, saveProfile, editMode, setEditModeProfile} = this.props;
    return <Profile isOwner={!match.params.userId}
                    profile={profile}
                    status={status}
                    updateStatus={updateStatus}
                    savePhoto={savePhoto}
                    saveProfile={saveProfile}
                    editMode={editMode}
                    setEditModeProfile={setEditModeProfile}/>
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.id,
  editMode: state.profilePage.editMode
})

const setEditModeProfile = profileActions.setEditModeProfile;
export default compose<React.ComponentType>(
  connect<MapStatePropsType,
    MapDispatchPropsType, {},
    AppStateType>(mapStateToProps,
    {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile, setEditModeProfile}),
  withRouter
)(ProfileContainer)