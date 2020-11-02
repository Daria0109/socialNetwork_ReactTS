import React from 'react';
import Profile from './Profile';
import axios from 'axios';
import {connect} from 'react-redux';
import {RootStoreType} from '../../redux/redux-store';
import {ProfileType, setUserProfile} from '../../redux/profileReducer';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {profileAPI} from '../../api/api';

export type ProfileContainerPropsType = RouteComponentProps<PathParamType> & {
  setUserProfile: (profile: ProfileType) => void
  profile: ProfileType
}
export type PathParamType = {
  userId: string
}

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = "2"
    }
    profileAPI.getUserProfile(Number(userId)).then(data => {
      this.props.setUserProfile(data)
    })
  }

  render() {
    return (
      <Profile profile={this.props.profile}/>
    )
  }
}

let mapStateToProps = (state: RootStoreType) => ({
  profile: state.profilePage.profile
})

const WithURLContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfile})(WithURLContainerComponent);