export const SearchFilter = (movies, req) => {
  return movies.filter((movie) =>
    movie.nameRU.toLowerCase().includes(req.toLowerCase())
  );
};

export const SearchShortFilter = (movies, isShortMovies) => {
  if (isShortMovies) {
    return movies.filter((movie) => movie.duration <= 40);
  } else {
    return movies;
  }
};


