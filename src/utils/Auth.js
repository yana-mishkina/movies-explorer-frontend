// class Auth {
//   constructor({ baseUrl, headers }) {
//     this._headers = headers;
//     this._baseUrl = baseUrl;
//   }

//   _checkResponse(res) {
//     if (res.ok) {
//       console.log(res);
//       return res.json();
//     }
//     console.log(res);
//     return Promise.reject(res.status);
//   }

//   register(name, email, password) {
//     return fetch(`${this._baseUrl}/signup`, {
//       method: "POST",
//       headers: this._headers,
//       body: JSON.stringify({ 
//         name: name,
//         email: email, 
//         password: password 
//       }),
//     })
//     .then(this._checkResponse);
//   }

//   login(email, password) {
//     return fetch(`${this._baseUrl}/signin`, {
//       method: "POST",
//       headers: this._headers,
//       body: JSON.stringify({ 
//         email: email, 
//         password: password 
//       }),
//     })
//     .then(this._checkResponse);
//   }

//   getToken(token) {
//     return fetch(`${this._baseUrl}/users/me`, {
//       method: 'GET',
//       headers: {
//           "Accept": "application.json",
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//       }
//     })
//     .then(this._checkResponse);
//   }
// }

// export const auth = new Auth({
//   baseUrl: "https://diploma.mishkinayana.nomoredomains.xyz",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// import handleOriginalResponse from "./utils";

class Auth {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      console.log(res);
      return res.json();
    }
    console.log(res);
    return Promise.reject(res.status);
  }

  register (name, email, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    })
    .then(this._checkResponse)
      .then(data => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data;
        }
      })
  }

  login(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
      .then(this._checkResponse)
      .then(data => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data;
        }
      })
  }

  getToken(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    })
    .then(this._checkResponse)
      .then(data => {
        return data;
      })
  }
}

export const auth = new Auth({
  baseUrl: 'https://diploma.mishkinayana.nomoredomains.xyz',
})