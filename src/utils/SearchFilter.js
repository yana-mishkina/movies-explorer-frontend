function SearchFilter(searchQueries, moviesData) {
  // const { search = "", shortfilm = false } = searchQueries;

  // const filterKeyword = (movie) => {
  //   return JSON.stringify(movie).toLowerCase().includes(search.toLowerCase());
  // };

  const { shortfilm = false } = searchQueries;

  function filterShortfilm(movie) {
    return movie.duration <= 40;
  };

  if (shortfilm) {
    return moviesData.filter(filterShortfilm);

  }
}

export default SearchFilter;
