import React, {FC} from 'react';
import c from './Header.module.css'
import {NavLink} from 'react-router-dom';

type HeaderPropsType = {
  login: string | null
  isAuth: boolean
  logout: () => void
}

const Header: FC<HeaderPropsType> = function ({login, isAuth, logout}) {
  return (
    <header className={c.header}>
      <div className={c.logo_block}>
        <img className={c.logo} src="https://www.freelogodesign.org/Content/img/logo-samples/flooop.png" alt="Logo"/>
      </div>
      <div className={c.login_block}>
        {isAuth
          ? <div className={c.login}>
            {login}
            <button onClick={() => logout()}>LogOut</button>
          </div>
          : <NavLink to='/login'>LogIn</NavLink>}
      </div>
    </header>
  )
}
export default Header