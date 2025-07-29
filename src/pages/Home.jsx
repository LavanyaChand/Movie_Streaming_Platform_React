import React from 'react'
import Navbar from '../components/ui/Navbar'
import home_image from "../assets/Staying in-bro.svg";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Navbar />
      <header className="home__header">
        <div className="header__title">
          America's favourite movie streaming platform
        </div>
        <div className="header__sub-title">
          Find all your favourite movies to binge🍿
        </div>
        <Link to="/search" className="browse__button">
          Browse movies
        </Link>
        <img className="header__img" src={home_image} alt="" />
      </header>
    </>
  );
}

export default Home