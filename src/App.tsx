import React from 'react';
import {Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';


type AppPropsType = {}

function App(props: AppPropsType) {
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

export default App;
