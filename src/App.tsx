import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
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
import Error404 from './components/common/Error404/Error404';
// import UsersPage from './components/Users/UsersContainer';
// import DialogsContainer from './components/Dialogs/DialogsContainer';
// import UsersContainer from './components/Users/UsersContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersPage = React.lazy(() => import('./components/Users/UsersPage'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))


const PATH = {
  Root: '/',
  Profile: '/profile',
  UserProfile: '/profile/:userId?',
  Dialogs: '/dialogs',
  Users: '/users',
  Login: '/login'
}

type MapStatePropsType = {
  initialized: boolean
}
type MapDispatchPropsType = {
  initializeApp: () => void
}
type AppPropsType = MapStatePropsType & MapDispatchPropsType

const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedUsers = withSuspense(UsersPage);

class App extends React.Component<AppPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }
    return (
      <>
        <div className='app-wrapper'>
          <HeaderContainer/>
          <Navbar/>
          <div className='app-wrapper-content'>
            <Switch>
              <Route exact path={PATH.Root} render={() => <Redirect to={PATH.Profile}/>}/>
              <Route path={PATH.UserProfile} render={() => <SuspendedProfile/>}/>
              <Route path={PATH.Dialogs} render={() => <SuspendedDialogs/>}/>
              <Route path={PATH.Users} render={() => <SuspendedUsers/>}/>
              <Route path='/news' render={() => <News/>}/>
              <Route path='/music' render={() => <Music/>}/>
              <Route path='/settings' render={() => <Settings/>}/>
              <Route path={PATH.Login} render={() => <Login/>}/>
              <Route path='*' render={() => <Error404/>}/>
            </Switch>
          </div>
        </div>

      </>
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
