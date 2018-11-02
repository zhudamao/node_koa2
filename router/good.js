import Router from 'koa-router';
import { Good } from '../controllers/index';

const goodRouter = new Router();

/**
 *  根据id 获取商品信息
 */
goodRouter.get('/goodinfo/',Good.getGoodByid);
/**
 * 添加商品
 */
goodRouter.post('/addgood/',Good.addGood);

/**
 * 根据id 删除商品
 */
goodRouter.get('/deletegood/:id',Good.deleteGood);

/**
 * 根据 id 更新商品信息
 */
goodRouter.post('/updategood/',Good.updateGoodInfo);

export default goodRouter;