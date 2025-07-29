import React, { useRef, useEffect } from 'react'
import logo from '../../assets/Colorful_Retro_Illustrative_Tasty_Popcorn_Logo-removebg-preview.png';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Navbar = () => {

  const navRef = useRef();

  useEffect(() => {
  const handleScroll = () => {
    if (!navRef.current) return; // ✅ protect against null

    if (window.scrollY >= 80) {
      navRef.current.classList.add('nav-dark');
    } else {
      navRef.current.classList.remove('nav-dark');
    }
  };

  window.addEventListener('scroll', handleScroll);

  // 🧹 cleanup on unmount
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);


  return (
    <nav ref={navRef}>
      <div className="nav__logo">
        <img src={logo} className="nav__logo--img" alt="" />
        <Link to = "/" className="nav__logo--name">BingeBuddy</Link>
      </div>
      <div className="nav__links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "nav__link link__hover-effect link__hover-effect--yellow active"
              : "nav__link link__hover-effect link__hover-effect--yellow"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive
              ? "nav__link link__hover-effect link__hover-effect--yellow active"
              : "nav__link link__hover-effect link__hover-effect--yellow"
          }
        >
          Search <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
        </NavLink>
      </div>
      {/* <button className="btn__menu" onClick="openMenu()">
            <i className="fa-solid fa-bars"></i>
        </button>
        <div className="menu__backdrop">
            <button className="btn__menu btn__menu--close" onclick="closeMenu()">
                <i className="fa-solid fa-xmark"></i>
            </button>
            <ul className="menu__links">
                <li className="menu__list"> 
                    <a href="#" className="link__hover-effect link__hover-effect--yellow menu__link" onclick="closeMenu()">Home</a>
                </li>
                <li className="menu__list">
                    <a href="./search.html" className="link__hover-effect link__hover-effect--yellow menu__link" onclick="closeMenu()">Search movies</a>
                </li>
                <li className="menu__list">
                    <a href="" className="link__hover-effect link__hover-effect--yellow menu__link" style="cursor: not-allowed"onclick="closeMenu()">Contact</a>
                </li>
            </ul>
        </div> */}
    </nav>
  );
}

export default Navbar