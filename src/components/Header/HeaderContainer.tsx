import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {getAuthUserDataTC, logout} from '../../redux/auth-reducer/auth-reducer';

type MapStatePropsType = {
  login: string | null
  isAuth: boolean
}
type MapDispatchPropsType = {
  getAuthUserDataTC: any
  logout: () => void
}
export type HeaderContainerPropsType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
  render () {
    const {login, isAuth, logout} = this.props;
    return <Header login={login} isAuth={isAuth} logout={logout}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth
})

export default connect<MapStatePropsType,
  MapDispatchPropsType, {},
  AppStateType>(mapStateToProps, {getAuthUserDataTC, logout})
(HeaderContainer);
