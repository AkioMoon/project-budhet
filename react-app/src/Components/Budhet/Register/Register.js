import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ setUser }) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  const registerUser = async (event) => {
    event.preventDefault();

    var { email, password } = document.forms[0];

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    };

    return await fetch("api/account/register", requestOptions)
      .then((response) => {
        if (response.status === 201) {
          setUser({ isAuthenticated: false, userName: "" });
          navigate("/login");
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.error) {
          setErrorMessages([data.error]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderErrorMessage = () =>
    errorMessages.map((error, index) => <div key={index}>{error}</div>);

  return (
    <>
      <h3>Регистрация</h3>
      <form onSubmit={registerUser}>
        <label>Пользователь </label>
        <input type="text" name="email" placeholder="Email" required />
        <br />
        <label>Пароль </label>
        <input type="password" name="password" placeholder="Пароль" required />
        <br />
        <button type="submit">Зарегистрироваться</button>
      </form>
      {renderErrorMessage()}
    </>
  );
};

export default Register;