import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {RootStoreType} from '../../redux/redux-store';
import axios from 'axios';
import {setAuthUserData} from '../../redux/auth-reducer';

export type HeaderContainerPropsType = {
  setAuthUserData: (id: number, email: string, login: string) => void
  login: string | null
  isAuth: boolean
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
      withCredentials: true
    }).then((response) => {
      if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        this.props.setAuthUserData(id, email, login);
      }
    })
  }
  render () {
    return (
      <Header login={this.props.login} isAuth={this.props.isAuth}/>
    )
  }
}

const mapStateToProps = (state: RootStoreType) => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);
