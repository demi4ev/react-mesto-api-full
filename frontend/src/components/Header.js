import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/mesto-logo.svg';

function Header({ loggedIn, email, handleLogOut }) {

  const { pathname } = useLocation();
  const text = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
  const linkRoute = `${pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;

  return (
    <header className="header">
      <Link className="header__link" to="/"><img src={logo} alt="Логотип Mesto" className="header__logo"/></Link>
      <div className="header__login">
        {loggedIn ? (
          <>
            <p className="header__link header__email">{email}</p>
            <Link className="header__link" to="" onClick={handleLogOut}>Выйти</Link>
          </>)
          :
          (<Link className="header__link" to={linkRoute}>{text}</Link>)
        }
      </div>
    </header>
  )
};

export default Header;
