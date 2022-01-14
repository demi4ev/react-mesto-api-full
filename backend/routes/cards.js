const cardRouter = require('express').Router();

const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const {
  validateCreateCard, validateCardId,
} = require('../middlewares/validators');

cardRouter.get('/', getCards);
cardRouter.post('/', validateCreateCard, createCard);
cardRouter.delete('/:cardId', validateCardId, deleteCard);
cardRouter.put('/:cardId/likes', validateCardId, likeCard);
cardRouter.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardRouter;
