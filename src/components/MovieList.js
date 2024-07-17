
import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://dummyapi.online/api/movies")
      .then((response) => {
        console.log("Fetched movies:", response.data); 
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.movie &&
      movie.movie.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Movie Database</h1>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <li key={movie.id}>
              <h2>{movie.movie}</h2>
              <p>
                <strong>Rating:</strong> {movie.rating}
              </p>
              <img
                src={`https://dummyapi.online/${movie.image}`}
                alt={movie.movie}
                style={{ width: "150px", height: "200px" }}
              />
              <p>
                <a
                  href={movie.imdb_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IMDb Link
                </a>
              </p>
            </li>
          ))
        ) : (
          <li>No movies found</li>
        )}
      </ul>
    </div>
  );
};

export default MovieList;
