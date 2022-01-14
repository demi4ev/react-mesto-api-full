import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [title, setTitle] = React.useState();
  const [link, setLink] = React.useState();

  function handlePlaceChange(evt) {
    setTitle(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: title,
      link: link,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Новое место"
      buttonText="Создать"
      name="popup_new-place"
      handleSubmit={handleSubmit}>
        <label className="popup__label">
          <input type="text" id="title-input" className="popup__field popup__field_type_title"
          name="title" value={title || ''} placeholder="Название" onChange={handlePlaceChange} required />
          <span id="title-input-error" className="popup__form-error"></span>
        </label>
        <label className="popup__label">
          <input type="url" id="link-image-input" className="popup__field popup__field_type_link-image"
          name="link" value={link || ''} placeholder="Ссылка на картинку" onChange={handleLinkChange} required />
          <span id="link-image-input-error" className="popup__form-error"></span>
        </label>
      </PopupWithForm>
  )
}

export default AddPlacePopup;
