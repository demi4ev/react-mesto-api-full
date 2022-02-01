import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

// import '../index.css';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';

import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

import api from '../utils/api';
import * as auth from '../utils/auth';

import regOk from '../images/check.svg';
import regWrong from '../images/cross.svg';



import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App () {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({});

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState({image: '', text: ''});
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);

  const [cards, setCards] = React.useState([]);

  const history = useHistory();

  // const api = new Api ({
  //   address: 'https://api.mesto.demichev.nomoredomains.rocks',
  //   token: localStorage.getItem('jwt')
  // })


  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push('/');
        })
        .catch((err) => {
          if (err.status === 401) {
            console.log("401 — Токен не передан или передан не в том формате");
          }
          console.log("401 — Переданный токен некорректен");
        });
    }
  }, [history]);


  React.useEffect(() => {
    api.getInitialCards()
    .then(cardList => {
      setCards(cardList);
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])


  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups () {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false)
    setSelectedCard({name: '', link: ''})
    setIsTooltipOpen(false)
  }

  function handleCardClick (card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  React.useEffect(() => {
    api.getUserInfo()
    .then(res => {
      setCurrentUser(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function handleCardDelete(card) {
    api.removeCard(card._id).then(() => {
      setCards(cards.filter(c => !(c._id === card._id)))
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function handleUpdateUser({ name, about }) {
    api.setUserInfo(name, about)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function handleUpdateAvatar({ avatar }) {
    api.updateAvatar(avatar)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard(name, link)
    .then((card) => {
      setCards([card, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err)
    })
  }



  function handleLogout() {
    setEmail('')
    setLoggedIn(false)
    localStorage.removeItem('jwt')
    history.push('/sign-in')
  }


  function handleInfoTooltipOpen() {
    setIsTooltipOpen(true)
  }

  function handleInfoTooltipContent({ iconPath, text }) {
    setMessage({ iconPath: iconPath, text: text })
  }


  function handleLogin({ email, password }) {
    auth.authorize(email, password)
    .then((res) => {
      localStorage.setItem('jwt', res.token);
      setLoggedIn(true);
      setEmail(email);
      handleInfoTooltipContent({
        iconPath: regOk,
        text: 'Вы успешны авторизованы'
      });
      handleInfoTooltipOpen();
      setTimeout(history.push, 3000, "/");
      setTimeout(closeAllPopups, 2500);
    })
    .catch((err) => {
      console.log(err)
      handleInfoTooltipContent({
        iconPath: regWrong,
        text: 'Что-то пошло не так! Попробуйте еще раз'
      })
      handleInfoTooltipOpen();
      setTimeout(closeAllPopups, 2500)
    })
  }


  function handleRegister({ email, password }) {
    auth.register(email, password)
    .then((res) => {
      handleInfoTooltipOpen();
      handleInfoTooltipContent({
        iconPath: regOk,
        text: 'Вы успешно зарегистрировались'})
      setTimeout(history.push, 3000, '/sign-in');
      setTimeout(closeAllPopups, 2500)

    })
    .catch((err) => {
      console.error(err)
      handleInfoTooltipContent({
        iconPath: regWrong,
        text: 'Что-то пошло не так! Попробуйте еще раз'
      })
      handleInfoTooltipOpen()
      setTimeout(closeAllPopups, 2500);
    });
  }


  return (

    <CurrentUserContext.Provider value={currentUser}>
    <>
    <div className="default-back">

      <div className="page">

        <Header loggedIn={loggedIn} email={email} handleLogOut={handleLogout}/>

        <Switch>

          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>

          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            handleLogout={handleLogout}
            email={email}
            cards={cards}
            component={Main}
          />

          <Route path="/">
            {loggedIn ? <Redirect to="/main"/> : <Redirect to="/sign-in"/>}
          </Route>



        </Switch>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          onClose={closeAllPopups}
          title="Вы уверены?"
          buttonText="Да"
          name="popup_delete-card">
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />

        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isTooltipOpen}
          message={message}
        />

      </div>


    </div>
    </>
    </CurrentUserContext.Provider>

  );

}

export default App;

