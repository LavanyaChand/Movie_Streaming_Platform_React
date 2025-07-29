import React, { useEffect, useState } from 'react';
import Navbar from '../components/ui/Navbar';
import FilmCard from '../components/ui/FilmCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BASE_URL = 'https://api.themoviedb.org/3';

const Search = () => {
  const [films, setFilms] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const enforceMinDelay = (startTime, minDuration = 600) => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minDuration - elapsed);
    return new Promise(resolve => setTimeout(resolve, remaining));
  };

  const fetchTopRated = async () => {
    setLoading(true);
    const startTime = Date.now();
    try {
      const res = await fetch(`${BASE_URL}/movie/top_rated?language=en-US&page=1`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      });
      const data = await res.json();
      setFilms(data.results);
      setFilteredFilms(data.results);
    } catch (err) {
      console.error('Top rated fetch failed:', err);
    }
    await enforceMinDelay(startTime);
    setLoading(false);
  };

  const fetchSearchResults = async (searchTerm) => {
    setLoading(true);
    const startTime = Date.now();
    try {
      const res = await fetch(`${BASE_URL}/search/movie?query=${encodeURIComponent(searchTerm)}&include_adult=false&language=en-US&page=1`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      });
      const data = await res.json();
      setFilms(data.results || []);
      setFilteredFilms(data.results || []);
    } catch (err) {
      console.error('Search fetch failed:', err);
    }
    await enforceMinDelay(startTime);
    setLoading(false);
  };

  useEffect(() => {
    fetchTopRated();
  }, []);

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim()) {
      await fetchSearchResults(value);
    } else {
      await fetchTopRated();
    }
  };

  const filterFilms = (e) => {
    const filter = e.target.value;
    let sorted = [...films];
    if (filter === 'Newest') {
      sorted.sort((a, b) => parseInt(b.release_date) - parseInt(a.release_date));
    } else if (filter === 'Oldest') {
      sorted.sort((a, b) => parseInt(a.release_date) - parseInt(b.release_date));
    }
    setFilteredFilms(sorted);
  };

  return (
    <>
      <Navbar />
      <section id="search__header">
        <div className="browse__movies">
          <h2 className="header__search--title">Browse our movies</h2>
          <form className="input-wrapper" onSubmit={(e) => e.preventDefault()}>
            <input
              className="search-input"
              type="text"
              value={query}
              placeholder="Search By Movie Name"
              onChange={handleSearchChange}
            />
            <button className="search-button" type="submit">
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            </button>
          </form>
        </div>
      </section>

      <main id="films__main">
        <section>
          <div className="container">
            <div className="row">
              <div className="search__row">
                <h2 className="search-results">Search Results:</h2>
                <select id="filter" defaultValue="" onChange={filterFilms}>
                  <option value="" disabled>Sort by</option>
                  <option value="Newest">Newest</option>
                  <option value="Oldest">Oldest</option>
                </select>
              </div>
              <div className="films">
                {loading ? (
                  new Array(20).fill(0).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))
                ) : filteredFilms.length > 0 ? (
                  filteredFilms
                    .filter((film) => film.poster_path)
                    .map((film) => <FilmCard key={film.id} film={film} />)
                ) : (
                  <p style={{ color: 'white' }}>No results found.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Search;


// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/ui/Navbar';
// import FilmCard from '../components/ui/FilmCard';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


// const Search = () => {
//   const [films, setFilms] = useState([]);
//   const [filteredFilms, setFilteredFilms] = useState([]);
//   const [query, setQuery] = useState('');
//   // const [loading, setLoading] = useState(false);

  

//   const fetchFilms = async (searchTerm = 'action') => {
//     // setLoading(true);
//     try {
//       const res = await fetch(`https://www.omdbapi.com/?apikey=4ffeac5&s=${searchTerm}`);
//       const data = await res.json();
//       if (data.Search) {
//         setFilms(data.Search);
//         setFilteredFilms(data.Search);
//       } else {
//         setFilms([]);
//         setFilteredFilms([]);
//       }
//     } catch (error) {
//       console.error('Fetch failed:', error);
//     }
//     // setLoading(false);
//   };

//   useEffect(() => {
//     fetchFilms();
//   }, []);

//   const handleSearchChange = async (e) => {
//     const value = e.target.value;
//     setQuery(value);
//     if (value.trim() !== '') {
//       await fetchFilms(value);
//     }
//   };

//   const filterFilms = (e) => {
//     const filter = e.target.value;
//     let sorted = [...films];
//     if (filter === 'Newest') {
//       sorted.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
//     } else if (filter === 'Oldest') {
//       sorted.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
//     }
//     setFilteredFilms(sorted);
//   };

//   return (
//     <>
//       <Navbar />
//       <section id="search__header">
//         <div className="browse__movies">
//           <h2 className="header__search--title">Browse our movies</h2>
//           <form className="input-wrapper" onSubmit={(e) => e.preventDefault()}>
//             <input
//               className="search-input"
//               type="text"
//               value={query}
//               placeholder="Search By Movie Or Series"
//               onChange={handleSearchChange}
//             />
//             <button className="search-button" type="submit">
//               <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
//             </button>
//           </form>
//         </div>
//       </section>

//       <main id="films__main">
//         <section>
//           <div className="container">
//             <div className="row">
//               <div className="search__row">
//                 <h2 className="search-results">Search Results:</h2>
//                 <select id="filter" defaultValue="" onChange={filterFilms}>
//                   <option value="" disabled>
//                     Sort by
//                   </option>
//                   <option value="Newest">Newest</option>
//                   <option value="Oldest">Oldest</option>
//                 </select>
//               </div>
//               <div className="films">
//                 {filteredFilms.length > 0 ? (
//                   filteredFilms
//                     .filter((film) => film.Poster && film.Poster !== "N/A")
//                     .map((film) => <FilmCard key={film.imdbID} film={film} />)
//                 ) : (
//                   <p style={{ color: "white" }}>No results found.</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// };

// export default Search;