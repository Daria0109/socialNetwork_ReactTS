import React, {ComponentType} from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {getStatus, getUserProfileTC, ProfileType, updateStatus} from '../../redux/profile-reducer/profile-reducer';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';

type MapStatePropsType = {
  profile: ProfileType
  status: string
}
type MapDispatchPropsType = {
  getUserProfileTC: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: (status: string) => void
}
export type PathParamType = {
  userId: string
}
export type ProfileContainerPropsType = RouteComponentProps<PathParamType>
  & MapStatePropsType
  & MapDispatchPropsType

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

  componentDidMount() {
    const {match, getUserProfileTC, getStatus} = this.props;
    let userId = match.params.userId;
    if (!userId) {
      userId = "12281";
    }
    getUserProfileTC(Number(userId));
    getStatus(Number(userId))
  }
  render() {
    const {profile, status, updateStatus} = this.props;
    return <Profile profile={profile}
                    status={status}
                    updateStatus={updateStatus}/>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status
})


export default compose<ComponentType>(
  connect<MapStatePropsType,
  MapDispatchPropsType, {},
  AppStateType>(mapStateToProps, {getUserProfileTC, getStatus, updateStatus}),
  withRouter
)(ProfileContainer)