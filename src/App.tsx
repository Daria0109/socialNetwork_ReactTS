import React from 'react';
import {Route, withRouter, RouteComponentProps, RouteChildrenProps, RouteProps} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer, {PathParamType} from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {connect} from 'react-redux';
import {AppStateType} from './redux/redux-store';
import {initializeApp} from './redux/app-reducer';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';

// export interface RouteProps {
//   path: string
// }

type MapStatePropsType = {
  initialized: boolean
}
type MapDispatchPropsType = {
  initializeApp: () => void
}
type AppPropsType = MapStatePropsType & MapDispatchPropsType

class App extends React.Component<AppPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }
    return (
      <div className='app-wrapper'>
        <HeaderContainer/>
        <Navbar/>
        <div className='app-wrapper-content'>
          <Route render={() => <ProfileContainer/>} path='/profile/:userId?'/>
          <Route render={() => <DialogsContainer/>} path='/dialogs'/>
          <Route render={() => <UsersContainer/>} path="/users"/>
          <Route render={() => <News/>} path='/news'/>
          <Route render={() => <Music/>} path='/music'/>
          <Route render={() => <Settings/>} path='/settings'/>
          <Route render={() => <Login/>} path='/login'/>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  initialized: state.app.initialized
})
export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
  mapStateToProps,
  {initializeApp}
  )(App);
