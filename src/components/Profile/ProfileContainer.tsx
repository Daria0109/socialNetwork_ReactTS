import React from 'react';
import Profile from './Profile';
import axios from 'axios';
import { connect } from 'react-redux';
import {RootStoreType} from '../../redux/redux-store';
import {ProfileType, setUserProfile} from '../../redux/profileReducer';

export type ProfileContainerPropsType = {
  setUserProfile: (profile: ProfileType) => void
  profile: ProfileType
}



class ProfileContainer extends React.Component<ProfileContainerPropsType> {
  componentDidMount() {
    axios.get<ProfileType>('https://social-network.samuraijs.com/api/1.0/profile/2').then((response) => {
      this.props.setUserProfile(response.data)
    })
  }

  render () {
    return (
        <Profile profile={this.props.profile}/>
      )
  }
}
let mapStateToProps = (state: RootStoreType) => ({
  profile: state.profilePage.profile
})

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);