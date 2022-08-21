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

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ 
        name: name,
        email: email, 
        password: password 
      }),
    })
    .then(this._checkResponse);
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ 
        email: email, 
        password: password 
      }),
    })
    .then(this._checkResponse);
  }

  getToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
          "Accept": "application.json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      }
    })
    .then(this._checkResponse);
  }
 
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

editProfile(name, email) {
  return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
          name,
          email
        })
  })
  .then(this._checkResponse)
}
}

export const mainApi = new MainApi({
  baseUrl: "https://diploma.mishkinayana.nomoredomains.xyz",
  headers: {
    "Content-Type": "application/json",
  },
});
