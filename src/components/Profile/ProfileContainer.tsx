import React, {ComponentType} from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
  getStatus,
  getUserProfileTC,
  ProfileType,
  savePhoto, saveProfile, setEditModeProfile,
  updateStatus
} from '../../redux/profile-reducer/profile-reducer';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {compose} from 'redux';

type MapStatePropsType = {
  profile: ProfileType
  status: string
  authorizedUserId: number | null
  editMode: boolean
}
type MapDispatchPropsType = {
  getUserProfileTC: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: (status: string) => void
  savePhoto: (photo: File) => void
  saveProfile: (profile: ProfileType) => void
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
    const {match, getUserProfileTC, getStatus} = this.props;
    let userId = Number(match.params.userId);
    if (!userId) {
      userId = this.props.authorizedUserId as number;
      if (!userId) {
        this.props.history.push('/login')
      }
    }
    getUserProfileTC(userId);
    getStatus(userId)
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps: Readonly<ProfileContainerPropsType>, prevState: Readonly<{}>, snapshot?: any) {
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


export default compose<ComponentType>(
  connect<MapStatePropsType,
    MapDispatchPropsType, {},
    AppStateType>(mapStateToProps,
    {getUserProfileTC, getStatus, updateStatus, savePhoto, saveProfile, setEditModeProfile}),
  withRouter
)(ProfileContainer)