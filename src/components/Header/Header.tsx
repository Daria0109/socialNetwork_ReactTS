import React from 'react';
import c from './Header.module.css'
import { NavLink } from 'react-router-dom';

type HeaderPropsType = {
  login: string | null
  isAuth: boolean
}

const Header = function (props: HeaderPropsType) {
    return (
        <header className={c.header}>
          <div className={c.logo_block}>
            <img className={c.logo} src="https://www.freelogodesign.org/Content/img/logo-samples/flooop.png" alt="Logo" />
          </div>
          <div className={c.login_block}>
            {props.isAuth ? <NavLink to='/login'>{props.login}</NavLink> : "LogIn"}
            </div>
          </header>
    )
}
export default Header