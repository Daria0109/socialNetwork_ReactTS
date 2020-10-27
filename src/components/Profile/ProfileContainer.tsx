import React from 'react';
import Profile from './Profile';
import axios from 'axios';
import {connect} from 'react-redux';
import {RootStoreType} from '../../redux/redux-store';
import {ProfileType, setUserProfile} from '../../redux/profileReducer';
import {withRouter, RouteComponentProps} from 'react-router-dom';

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
    axios.get<ProfileType>(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then((response) => {
      this.props.setUserProfile(response.data)
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