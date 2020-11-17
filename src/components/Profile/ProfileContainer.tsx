import React, {ComponentType} from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {getUserProfileTC, ProfileType} from '../../redux/profile-reducer/profile-reducer';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';

type MapStatePropsType = {
  profile: ProfileType
}
type MapDispatchPropsType = {
  getUserProfileTC: (userId: number) => void
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
      userId = "2";
    }
    this.props.getUserProfileTC(Number(userId));
  }

  render() {
    return <Profile profile={this.props.profile}/>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  profile: state.profilePage.profile,
})


export default compose<ComponentType>(
  connect<MapStatePropsType,
  MapDispatchPropsType, {},
  AppStateType>(mapStateToProps, {getUserProfileTC}),
  withRouter,
  withAuthRedirect
)(ProfileContainer)