import React from 'react';
import {Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {connect} from 'react-redux';
import {AppStateType} from './redux/redux-store';
import {initializeApp} from './redux/app-reducer/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import {withSuspense} from './hoc/withSuspense';

// import DialogsContainer from './components/Dialogs/DialogsContainer';
// import UsersContainer from './components/Users/UsersContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

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
          <Route render={withSuspense(ProfileContainer)} path='/profile/:userId?'/>
          <Route render={withSuspense(DialogsContainer)} path='/dialogs'/>
          <Route render={withSuspense(UsersContainer)} path="/users"/>
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
