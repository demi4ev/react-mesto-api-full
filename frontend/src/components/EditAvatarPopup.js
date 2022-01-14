import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatarImageInput = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarImageInput.current.value,
    });
  }

  return (

    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Обновить аватар"
      buttonText="Сохранить"
      name="popup_new-avatar"
      handleSubmit={handleSubmit}>
        <label className="popup__label">
          <input type="url" id="link-avatar-image-input" className="popup__field popup__field_type_link-avatar-image"
          name="link" placeholder="Ссылка на новый аватар" ref={avatarImageInput} required />
          <span id="link-avatar-image-input-error" className="popup__form-error"></span>
        </label>
    </PopupWithForm>

  )
}


export default EditAvatarPopup;
