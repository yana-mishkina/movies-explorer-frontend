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

  getMovies(token) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    }).then((res) => this._checkResponse(res));
  }

  saveMovie(card, token) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        country: card.country || "No data",
        director: card.director || "No data",
        duration: card.duration || 0,
        year: card.year || 0,
        description: card.description || "No data",
        image: `https://api.nomoreparties.co/${card.image.url}`,
        trailerLink: card.trailerLink || "No data",
        nameRU: card.nameRU,
        nameEN: card.nameEN || "No data",
        thumbnail: `https://api.nomoreparties.co/${card.image.formats.thumbnail.url}`,
        movieId: card.id,
      }),
    }).then((res) => this._checkResponse(res));
  }

  editProfile(data, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._checkResponse);
  }
  
}

export const mainApi = new MainApi({
  baseUrl: "https://diploma.mishkinayana.nomoredomains.xyz",
  headers: {
    // authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});
