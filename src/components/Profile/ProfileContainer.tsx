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
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = "12281";
    }
    this.props.getUserProfileTC(Number(userId));
    this.props.getStatus(Number(userId))
  }

  render() {
    return <Profile profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}/>
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
  withRouter,
  withAuthRedirect
)(ProfileContainer)