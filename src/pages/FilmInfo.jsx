import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import back_arrow from '../assets/back_arrow_icon.png'
import play_icon from '../assets/play_icon.png'

const FilmInfo = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch film details');
        const data = await res.json();
        setFilm(data);
      } catch (error) {
        console.error('Error fetching film details:', error);
      }
    };

    fetchFilmDetails();
  }, [id]);

  if (!film) return <div className="loading">Loading...</div>;

  return (
    <div className="film-info-page">
      <div className="film-info-container">
        <Link to="/search" className="back-button">
          <img src={back_arrow} alt="" />
          <span>Back to Search</span>
        </Link>
        <div className="film-detail">
          <img
            src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
            alt={film.title}
            className="film-poster"
          />
          <div className="film__description">
            <h1>{film.title}</h1>
            <p>
              <strong>Release Date:</strong> {film.release_date}
            </p>
            <p>
              <strong>Rating:</strong> {film.vote_average}/10
            </p>
            <p>
              <strong>Runtime:</strong> {Math.floor(film.runtime / 60)}hr{" "}
              {film.runtime % 60}min
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {film.genres.map((g) => g.name).join(", ")}
            </p>
            <p className="film-overview">
              <strong>Summary:</strong> {film.overview}
            </p>
            <Link to={`/film/${id}`} className="play-btn">
              <img src={play_icon} alt="Play Icon" />
              Watch Movie
            </Link>
          </div>
          {/* <Link to="/film" className='btn'>
              <img src={play_icon} alt="" />Play
            </Link> */}
        </div>
      </div>
    </div>
  );
};

export default FilmInfo;
