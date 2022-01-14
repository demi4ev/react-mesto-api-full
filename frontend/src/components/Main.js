import React from 'react';
import Card from './Card';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main (props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (

    <main className="content">

      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-image" src={currentUser.avatar} alt="Фото профиля"/>
          <button type="button" className="profile__avatar-edit-button" onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__name">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>

      <section className="photo-items">
        {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          )
        )}
      </section>

      {/* <div className="popup popup_delete-card">
        <form className="popup__container" name="popup_delete-card" novalidate>
          <h2 className="popup__title popup__title_question">Вы уверены?</h2>
          <button className="popup__submit-button" type="submit">Да</button>
          <button className="popup__close-button" type="reset"></button>
        </form>
      </div> */}

    </main>

  )
}

export default Main;
