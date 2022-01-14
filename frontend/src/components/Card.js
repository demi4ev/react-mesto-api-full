import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card (props, {onCardLike}) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `photo-items__like-button ${isLiked ? 'photo-items__like-button_active' : ''}`
  );

  const cardDeleteButtonClassName = (
    `photo-items__del-button ${isOwn ? 'popup_opened' : ''}`
  );


  function handleClick () {
    props.onCardClick(props.card)
  }

  function handleLikeClick () {
    props.onCardLike(props.card)
  }

  function handleCardDelete () {
    props.onCardDelete(props.card)
  }

  return (
    // <template className="template">
      <article className="photo-items__post">
        <button type="button" className={cardDeleteButtonClassName} onClick={handleCardDelete}></button>
        <button type="button" className="photo-items__img-button">
          <img className="photo-items__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
        </button>
        <div className="photo-items__description">
          <h2 className="photo-items__title">{props.card.name}</h2>
          <div className="photo-items__like-container">
            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            <p className="photo-items__like-counter">{props.card.likes.length}</p>
          </div>
        </div>
      </article>
    // </template>
  )
}

export default Card;
