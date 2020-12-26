import React, {ComponentType} from 'react';
import {Redirect} from 'react-router-dom';
import {AppStateType} from '../redux/redux-store';
import {connect} from 'react-redux';

type mapStatePropsType = {
  isAuth: boolean
}
const mapStateToPropsForRedirect = (state: AppStateType): mapStatePropsType => ({
  isAuth: state.auth.isAuth
})

export function withAuthRedirect<WCP> (WrappedComponent: React.ComponentType<WCP>) {
  const RedirectComponent: React.FC<mapStatePropsType> = ({isAuth, ...restProps}) => {
      if (!isAuth) return <Redirect to='/login'/>
      return <WrappedComponent {...restProps as unknown as WCP}/>
    }
  const ConnectedRedirectComponent = connect<mapStatePropsType, {}, WCP, AppStateType>
  (mapStateToPropsForRedirect)(RedirectComponent)
  return ConnectedRedirectComponent
}