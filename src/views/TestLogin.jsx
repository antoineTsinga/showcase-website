import React, { useState } from "react";
import axios from "axios";
import "../App.css";

export default function TestLogin() {
  const [user, setUser] = useState({});

  const backendUrl = "https://localhost:8000/";

  function login(e) {
    e.preventDefault();

    const dataLogin = {
      username: e.target.email.value,
      password: e.target.password.value,
    };

    console.log(dataLogin);
    const url = new URL(`${backendUrl}api/login`);

    // 'Access-Control-Allow-Origin: *'
    // 'Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'
    // 'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'
    // const httpRequest = new XMLHttpRequest();
    // httpRequest.onreadystatechange = function (e) {
    //   console.log(e);
    // };
    // httpRequest.open("GET", "http://localhost:8001/api/docs", true);
    // httpRequest.send();

    axios({
      method: "POST",
      url: url.toString(),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
      data: dataLogin,
    }).then(({ data }) => {
      setUser(data);
    });
  }

  function logout() {
    const url = new URL(`${backendUrl}api/logout`);
    axios({
      method: "POST",
      url: url.toString(),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    }).then(({ data }) => {
      setUser(data);
    });
  }

  function register(e) {
    const url = new URL(`${backendUrl}api/users`);
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      surname: e.target.surname.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    axios({
      method: "POST",
      url: url.toString(),
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data,
    }).then((res) => {
      console.log(res);
    });
  }

  function editProfil(e) {
    const url = new URL(`${backendUrl}api/users/${user.id ? user.id : 2}`);
    e.preventDefault();
    const data = {
      name: e.target.name.value ? e.target.name.value : user.name,
      surname: e.target.surname.value ? e.target.surname.value : user.surname,
      email: e.target.email.value ? e.target.email.value : user.email,
    };
    axios({
      method: "PUT",
      url: url.toString(),
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data,
    }).then((res) => {
      console.log(res);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <div
          style={{
            width: "700px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <input
            type="button"
            value="logout"
            onClick={logout}
            style={{
              width: "200px",
              color: "white",
              backgroundColor: "red",
            }}
          />
        </div>

        <div
          style={{
            width: "1300px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            border: "3px solid white",
          }}
        >
          <form onSubmit={login}>
            <fieldset>
              <legend>Login:</legend>
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" name="email" />
              <br />
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" />
              <br />
              <input
                type="submit"
                id="login"
                name="login"
                value="Login"
                onSubmit={login}
                style={{
                  width: "200px",
                  color: "white",
                  backgroundColor: "blue",
                }}
              />
              <br />
            </fieldset>
          </form>
          <form onSubmit={editProfil}>
            <fieldset>
              <legend>Edid profil:</legend>
              <label htmlFor="fname">First name:</label>
              <input type="text" id="fname" name="name" value={user.name} />
              <br />
              <label htmlFor="lname">Last name:</label>
              <input
                type="text"
                id="lname"
                name="surname"
                value={user.surname}
              />
              <br />
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" name="email" value={user.email} />
              <br />
              <br />
              <input
                type="submit"
                id="editProfil"
                name="editProfil"
                value="Edit Profil"
                onSubmit={editProfil}
                style={{
                  width: "200px",
                  color: "white",
                  backgroundColor: "blue",
                }}
              />
              <br />
            </fieldset>
          </form>

          <form onSubmit={register}>
            <fieldset>
              <legend>Registration:</legend>
              <label htmlFor="fname">First name:</label>
              <input type="text" id="fname" name="name" />
              <br />
              <label htmlFor="lname">Last name:</label>
              <input type="text" id="lname" name="surname" />
              <br />
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" name="email" />
              <br />
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" />
              <br />
              <label htmlFor="remember">Remember me:</label>
              <input type="checkbox" id="remember" name="remember" />
              <br />
              <input
                type="submit"
                id="register"
                name="register"
                value="Register"
                onSubmit={register}
                style={{
                  width: "200px",
                  color: "white",
                  backgroundColor: "blue",
                }}
              />
              <br />
            </fieldset>
          </form>
        </div>
      </header>
    </div>
  );
}
