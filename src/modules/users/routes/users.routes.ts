import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { Router } from 'express';
import UsersControllers from '../controllers/UsersController';
import UserAvatarControllers from '../controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersControllers();
const userAvatarControllers = new UserAvatarControllers();

const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  userAvatarControllers.update,
);

export default usersRouter;
