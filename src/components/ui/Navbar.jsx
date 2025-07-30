import React, { useRef, useEffect } from 'react';
import logo from '../../assets/Colorful_Retro_Illustrative_Tasty_Popcorn_Logo-removebg-preview.png';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  const navRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;

      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const openMenu = () => {
    document.body.classList.add('menu--open');
  };

  const closeMenu = () => {
    document.body.classList.remove('menu--open');
  };

  return (
    <nav ref={navRef}>

      <Link to="/" className="nav__logo">
        <img src={logo} className="nav__logo--img" alt="BingeBuddy Logo" />
        <div className="nav__logo--name">BingeBuddy</div>
      </Link>
      

      <div className="nav__links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav__link link__hover-effect link__hover-effect--yellow${isActive ? ' active' : ''}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `nav__link link__hover-effect link__hover-effect--yellow${isActive ? ' active' : ''}`
          }
        >
          Search <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
        </NavLink>
      </div>

      <button className="btn__menu" onClick={openMenu}>
        <FontAwesomeIcon icon="fa-solid fa-bars" />
      </button>

      <div className="menu__backdrop">
        <button className="btn__menu btn__menu--close" onClick={closeMenu}>
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </button>
        <ul className="menu__links">
          <li className="menu__list">
            <Link to="/" className="link__hover-effect link__hover-effect--yellow menu__link" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className="menu__list">
            <Link to="/search" className="link__hover-effect link__hover-effect--yellow menu__link" onClick={closeMenu}>
              Search movies
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
