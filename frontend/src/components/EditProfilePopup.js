import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup ({ isOpen, onClose, onUpdateUser }) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (

    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Редактировать профиль"
      buttonText="Сохранить"
      name="popup_profile-edit"
      handleSubmit={handleSubmit}>
        <label className="popup__label">
          <input type="text" id="name-input" className="popup__field popup__field_type_name"
            name="name" value={name || ''} placeholder="Имя" onChange={handleNameChange} required />
          <span id="name-input-error" className="popup__form-error"></span>
        </label>
        <label className="popup__label">
          <input type="text" id="description-input" className="popup__field popup__field_type_description"
            name="description" value={description || ''} placeholder="Род занятий" onChange={handleDescriptionChange} required />
          <span id="description-input-error" className="popup__form-error"></span>
        </label>
    </PopupWithForm>

  )

}

export default EditProfilePopup;
