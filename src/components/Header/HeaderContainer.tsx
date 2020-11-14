import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {getAuthUserDataTC} from '../../redux/auth-reducer/auth-reducer';

type MapStatePropsType = {
  login: string | null
  isAuth: boolean
}
type MapDispatchPropsType = {
  getAuthUserDataTC: any
}
export type HeaderContainerPropsType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
  componentDidMount() {
   this.props.getAuthUserDataTC();
  }
  render () {
    return <Header login={this.props.login} isAuth={this.props.isAuth}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth
})

export default connect<MapStatePropsType,
  MapDispatchPropsType, {},
  AppStateType>(mapStateToProps, {getAuthUserDataTC})
(HeaderContainer);
