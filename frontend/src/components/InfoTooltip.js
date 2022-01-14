import React from 'react';

// import registrationOk from '../images/check.svg';
// import registrationWrong from '../images/cross.svg';

function InfoTooltip({ isOpen, onClose, message }) {

  return (

    <div className={`popup popup__infoTooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <img className="popup__resImage" src={message.iconPath} alt="Картинка сообщения" />
        <button className="popup__close-button" type="reset" onClick={onClose}></button>
        <h2 className="popup__subtitle">{message.text}</h2>
      </div>
    </div>
  )
}


export default InfoTooltip;
