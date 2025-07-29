import React from 'react';
import { Link } from 'react-router-dom';

const FilmCard = ({ film }) => {
  const imageBase = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="film">
      <Link to={`/search/${film.id}`}>
        <figure className="film__img--wrapper">
          <img
            src={`${imageBase}${film.poster_path}`}
            alt={film.title}
            className="film__img"
          />
        </figure>
      </Link>
      <div className="film__title">
        <Link to={`/search/${film.id}`}>{film.title}</Link>
      </div>
      <div className="film__year">
        {film.release_date?.split('-')[0] || 'N/A'}
        <span className="film__type"> Movie </span>
      </div>
    </div>
  );
};

export default FilmCard;








// import React, { useState, useRef, useEffect } from 'react';
// import { Link } from 'react-router-dom';


// const FilmCard = ({ film }) => {

//   const [poster, setPoster] = useState(false);
//   const mountedRef = useRef(true);

//   useEffect(() => {
//     if (!film.Poster || film.Poster === "N/A") return;

//     mountedRef.current = true;
//     const image = new Image();
//     image.src = film.Poster;

//     image.onload = () => {
//       if (mountedRef.current) {
//         setPoster(true); // just flag it's OK
//       }
//     };

//     image.onerror = () => {
//       if (mountedRef.current) {
//         setPoster(false); // don't render image
//       }
//     };

//     return () => {
//       mountedRef.current = false;
//     };
//   }, [film.Poster]);



//   return (
//     <div className="film">
//       {poster ? (
//         <>
//           <Link to={`/search/${film.imdbID}`}>
//             <figure className="film__img--wrapper">
//               <img src={film.Poster} alt={film.Title} className="film__img" />
//             </figure>
//           </Link>

//           <div className="film__title">
//             <Link to={`/search/${film.imdbID}`}>{film.Title}</Link>
//           </div>
//           <div className="film__year">
//             {film.Year} <span className="film__type">{film.Type}</span>
//           </div>
//         </>
//       ) : (
//         <>
//           <div className="film__img--skeleton"></div>
//           <div className="skeleton film__title--skeleton"></div>
//         </>
//       )}
//     </div>
//   );
// };

// export default FilmCard;