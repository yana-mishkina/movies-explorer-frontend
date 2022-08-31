export const SearchFilter = (movies, req) => {
  return movies.filter((movie) =>
    movie.nameRU.toLowerCase().includes(req.toLowerCase())
  );
};

export const SearchShortFilter = (movies, shortMovies) => {
  if (shortMovies) {
    return movies.filter((movie) => movie.duration <= 40);
  } else {
    return movies;
  }
};


