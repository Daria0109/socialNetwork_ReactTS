import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {getUserProfileTC, ProfileType} from '../../redux/profile-reducer';
import {withRouter, RouteComponentProps} from 'react-router-dom';

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
    return (
      <Profile profile={this.props.profile}/>
    )
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  profile: state.profilePage.profile
})

const WithURLContainerComponent = withRouter(ProfileContainer);

export default connect<MapStatePropsType,
  MapDispatchPropsType, {},
  AppStateType>(mapStateToProps, {getUserProfileTC})
(WithURLContainerComponent);