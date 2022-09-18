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

export const showSearchResults = (filterResults, setIsFindMovies, showMovies) => {
  if (filterResults.length === 0) {
    setIsFindMovies(false);
  } else {
    setIsFindMovies(true);
    showMovies(filterResults);
  }
}
