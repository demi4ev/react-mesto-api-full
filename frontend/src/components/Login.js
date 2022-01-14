import React, {useState} from 'react';

function Login({handleLogin}) {
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  function handleChange(e) {
    const {name, value} = e.target;
    setData({...data,
    [name]: value
    });
  }
  function handleSubmit(e){
    e.preventDefault();
    if(!data.email || !data.password) {
      return
    }
    const { email, password } = data;
    handleLogin({ email, password })
  }


  return (
    <section className="auth">
      <form className="auth__container" onSubmit={handleSubmit}>
        <h1 className="auth__title">Вход</h1>
        <fieldset className="popup__form-fields">
          <label className="popup__label">
            <input type="email" className="auth__field auth__field_type_email"
              name="email" value={data.email} onChange={handleChange} placeholder="E-mail" required />
          </label>
          <label className="popup__label">
            <input type="password" className="auth__field auth__field_type_password"
              name="password" value={data.password} onChange={handleChange} placeholder="Пароль" required />
            <span id="password-input-error" className="popup__form-error"></span>
          </label>
          <button className="auth__submit-button" type="submit" >Войти</button>
        </fieldset>
      </form>
    </section>
  )
}

export default Login;
















// import React from 'react';

// function Login({ authorization }) {

//   const [valueEmail, setValueEmail] = React.useState('');
//   const [valuePassword, setValuePassword] = React.useState('');

//   function handleChangeEmail(evt) {
//     setValueEmail(evt.target.value)
//   }

//   function handleChangePassword(evt) {
//     setValuePassword(evt.target.value)
//   }

//   function handleSubmit(evt) {
//     evt.preventDefault();
//     const email = valueEmail;
//     const password = valuePassword;
//     authorization(email, password);
//   }


//   return (
//     <section className="auth">
//       <form className="auth__container" onSubmit={handleSubmit}>
//         <h1 className="auth__title">Вход</h1>
//         <fieldset className="popup__form-fields">
//           <label className="popup__label">
//             <input type="email" className="auth__field auth__field_type_email"
//               name="email" value={valueEmail} onChange={handleChangeEmail} placeholder="E-mail" required />
//           </label>
//           <label className="popup__label">
//             <input type="password" className="auth__field auth__field_type_password"
//               name="password" value={valuePassword} onChange={handleChangePassword} placeholder="Пароль" required />
//             <span id="password-input-error" className="popup__form-error"></span>
//           </label>
//           <button className="auth__submit-button" type="submit" >Войти</button>
//         </fieldset>
//       </form>
//     </section>
//   )
// }

// export default Login;
