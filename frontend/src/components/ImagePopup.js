import React from 'react';

function ImagePopup (props) {
  return (
    <div className={`popup popup_big-picture ${props.card && props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_img">
        <img className="popup__img" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''} />
        <p className="popup__description">{props.card ? props.card.name : ''}</p>
        <button className="popup__close-button" type="reset" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default ImagePopup;
