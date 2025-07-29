import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import FilmInfo from './pages/FilmInfo';
import Film from './pages/Film';

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
           <Route
            path="/search/:id"
            element={
              <FilmInfo />
            }
          />
          <Route path='/film/:id' element={<Film />} />
        </Routes>
    </Router>
  )
}

export default App