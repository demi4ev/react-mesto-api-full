const userRouter = require('express').Router();

const {
  getUsers, getUserId, updateUser, updateAvatar, getUserInfo,
} = require('../controllers/users');
const {
  validateUserId, validateUpdateUser, validateUpdateAvatar,
} = require('../middlewares/validators');

userRouter.get('/', getUsers);
userRouter.get('/me', getUserInfo);
userRouter.get('/:userId', validateUserId, getUserId);
userRouter.patch('/me', validateUpdateUser, updateUser);
userRouter.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = userRouter;
