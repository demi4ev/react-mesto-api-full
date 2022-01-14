const Card = require('../models/card');

const NotFoundError = require('../errors/NotFoundError'); // 404
const BadRequestError = require('../errors/BadRequestError'); // 400
const ForbiddenError = require('../errors/ForbiddenError'); // 403

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new Error('NotValidId'))
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return Promise.reject(new ForbiddenError('Нельзя удалять чужие карточки'));
      }
      Card.deleteOne({ _id: card._id })
        .then(() => {
          res.status(200).send({ card });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        throw new NotFoundError('Карточка не найдена');
      } else if (err.name === 'CastError') {
        throw new BadRequestError('Некорректные данные');
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((card) => { res.send({ data: card }); })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((card) => { res.send({ data: card }); })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    })
    .catch(next);
};
