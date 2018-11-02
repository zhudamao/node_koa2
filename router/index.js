import Router from 'koa-router';

import UserRouter from './user';
import GoodRouter from './good';

const  router = new Router();
//子路由

router.use('/user',UserRouter.routes(),UserRouter.allowedMethods());
router.use('/goods',GoodRouter.routes(),GoodRouter.allowedMethods());

export default router;