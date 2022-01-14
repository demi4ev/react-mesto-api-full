const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const formEdit = document.querySelector('.popup_profile-edit');
const nameInput = document.querySelector('.popup__field_type_name');
const jobInput = document.querySelector('.popup__field_type_description');
const formAdd = document.querySelector('.popup_new-place');
const formAddAvatar = document.querySelector('.popup_new-avatar');
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const avatarInput = document.querySelector('.popup__field_type_link-avatar-image');
const editButton = document.querySelector('.profile__edit-button');
const titlePlaceInput = document.querySelector('popup__field_type_title');
const imagePlaceInput = document.querySelector('popup__field_type_link-image');
const addButton = document.querySelector('.profile__add-button');

const validationConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inputErrorClass: 'popup__field_error',
  formError: '.popup__form-error',
  formErrorActive: 'popup__form-error_active',
  formLabel: '.popup__label'
}

export {
  initialCards,
  formEdit,
  nameInput,
  jobInput,
  formAdd,
  formAddAvatar,
  avatarEditButton,
  avatarInput,
  editButton,
  titlePlaceInput,
  imagePlaceInput,
  addButton,
  validationConfig
};
