class MainApi {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getMovies() {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => this._checkResponse(res));
  }

  saveMovie(card) {
    return fetch(this._baseUrl + "/movies", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        country: card.country || "No data",
            director: card.director || "No data",
            duration: card.duration || 0,
            year: card.year || 0,
            description: card.description || "No data",
            image: `https://api.nomoreparties.co/${card.image.url}` || "https://api.nomoreparties.co/",
            trailer: card.trailerLink || "No data",
            nameRU: card.nameRU,
            nameEN: card.nameEN || "No data",
            thumbnail: `https://api.nomoreparties.co/${card.image.formats.thumbnail.url}`,
            movieId: card.id
      }),
    }).then((res) => this._checkResponse(res));
  }

  createMovie(card) {
    return fetch(`${this._url}/movies`,{
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
            country: card.country || "No data",
            director: card.director || "No data",
            duration: card.duration || 0,
            year: card.year || 0,
            description: card.description || "No data",
            image: `https://api.nomoreparties.co/${card.image.url}` || "No data",
            trailer: card.trailerLink,
            nameRU: card.nameRU,
            nameEN: card.nameEN || "No data",
            thumbnail: `https://api.nomoreparties.co/${card.image.formats.thumbnail.url}`,
            movieId: card.id
          })
 })
 .then((res) => this._checkResponse(res));
}

  // saveMovie(
  //   country,
  //   director,
  //   duration,
  //   year,
  //   description,
  //   image,
  //   trailerLink,
  //   nameRU,
  //   nameEN,
  //   thumbnail,
  //   movieId,
  //   token
  // ) {
  //   return fetch(`${this._baseUrl}/movies`, {
  //     method: "POST",
  //     headers: {
  //       ...this._headers,
  //       authorization: "Bearer " + token,
  //     },
  //     body: JSON.stringify({
  //       country,
  //       director,
  //       duration,
  //       year,
  //       description,
  //       image,
  //       trailerLink,
  //       nameRU,
  //       nameEN,
  //       thumbnail,
  //       movieId,
  //     }),
  //   }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  // }

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`,{
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      })
  })
  .then(this._checkResponse);
   }
}

export const mainApi = new MainApi({
  baseUrl: "https://diploma.mishkinayana.nomoredomains.xyz",
  headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});
