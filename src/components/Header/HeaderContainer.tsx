import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {RootStoreType} from '../../redux/redux-store';
import {setAuthUserData} from '../../redux/auth-reducer';
import {headerAPI} from '../../api/api';

export type HeaderContainerPropsType = {
  setAuthUserData: (id: number, email: string, login: string) => void
  login: string | null
  isAuth: boolean
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
  componentDidMount() {
    headerAPI.getAuth().then(data => {
      if (data.resultCode === 0) {
        let {id, email, login} = data.data;
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
