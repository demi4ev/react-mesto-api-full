import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Register({handleRegister}) {

    const [ data , setData] = useState({
        email: '',
        password: ''
    });

   function handleChange(e) {
       const {name, value} = e.target;
       setData({...data, [name]: value})
   }

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = data;
        handleRegister({email, password})
    }

    return (
      <section className="auth">
        <form className="auth__container" onSubmit={handleSubmit}>
          <h1 className="auth__title">Регистрация</h1>
          <fieldset className="popup__form-fields">
            <label className="popup__label">
              <input type="email" className="auth__field auth__field_type_email"
                name="email" value={data.email} onChange={handleChange} placeholder="E-mail" required />
            </label>
            <label className="popup__label">
              <input type="password" className="auth__field auth__field_type_password"
                name="password" value={data.password} onChange={handleChange} placeholder="Пароль" required />
            </label>
            <button className="auth__submit-button" type="submit">Зарегистрироваться</button>
            <Link className="auth__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
          </fieldset>
        </form>
      </section>
    )
}

export default Register;
