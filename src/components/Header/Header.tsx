import React from 'react';
import c from './Header.module.css'

const Header = function () {
    return (
        <header className={c.header}>
            <img className={c.image} src="https://www.freelogodesign.org/Content/img/logo-samples/flooop.png" alt="Logo" />
        </header>
    )
}
export default Header