import React from 'react';
import c from './Navbar.module.css'
import {NavLink} from 'react-router-dom';
import Friends from './Friends/Friends';
import FriendsContainer from './Friends/FriendsContainer';


type NavbarPropsType = {
    // store: RootStoreType
}

const Navbar = function (props: NavbarPropsType) {
    // let state = props.store;
        return (
        <nav className={c.nav}>
            <div className={c.item}><NavLink to='/profile' activeClassName={c.active}>Profile</NavLink></div>
            <div className={c.item}><NavLink to='/dialogs' activeClassName={c.active}>Messages</NavLink></div>
            <div className={c.item}><NavLink to='/users' activeClassName={c.active}>Users</NavLink></div>
            <div className={c.item}><NavLink to='/news' activeClassName={c.active}>News</NavLink></div>
            <div className={c.item}><NavLink to='/music' activeClassName={c.active}>Music</NavLink></div>
            <div className={c.item}><NavLink to='/settings' activeClassName={c.active}>Settings</NavLink></div>

            <FriendsContainer/>

        </nav>

    )
}
export default Navbar