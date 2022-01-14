import React from 'react';

function PopupWithForm (props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <form className="popup__container" name={props.name} onSubmit={props.handleSubmit}>
        <h2 className="popup__title">{props.title}</h2>
        <fieldset className="popup__form-fields">
          {props.children}
          <button className="popup__submit-button popup__create-button" type="submit" >{props.buttonText}</button>
        </fieldset>
        <button className="popup__close-button" type="reset" onClick={props.onClose}></button>
      </form>
    </div>
  )
}

export default PopupWithForm;
