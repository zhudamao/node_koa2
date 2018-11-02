import Router from 'koa-router';
import { User } from '../controllers/index';

const userRouter = new Router();

userRouter.get('/userinfo/:uid',User.getUserInfo);
userRouter.post('/register',User.register);
userRouter.post('/updateAvatar',User.updateAvatar);
userRouter.get('/login',User.login);


export default userRouter;
