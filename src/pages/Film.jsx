import React, { useEffect, useState } from 'react'
import back_arrow_icon from '../assets/back_arrow_icon.png'
import { Link, useParams } from 'react-router-dom';

const Film = () => {

    const { id } = useParams();

  const [apiData, setapiData] = useState({
    key: "",
  })

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  }
};

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setapiData(res.results[0]))
      .catch((err) => console.error(err));
  }, []);


  return (
    <div className="player">
        <Link to={`/search/${id}`}>
            <img src={back_arrow_icon} alt=""/>
        </Link>
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="Trailer"
        frameborder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Film;