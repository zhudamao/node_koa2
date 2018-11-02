import moment  from 'moment';

import BaseControler from "./BaseController";

import { Good } from '../models/index';

class GoodController extends BaseControler{
    constructor(){
        super();
    
    }

    getGoodByid = async (ctx,next)=>{
        const {id} = ctx.query;
        if (id){
            try {
                let item =  await  Good.findOne({where:{id}});
                if (item){
                    ctx.body = {
                        code:0,
                        desc:'查找成功！',
                        data:item
                    }
                }else{
                    ctx.throw( new Error('查找失败！'));
                }

            } catch (error) {
                ctx.body = {
                    code:-1,
                    desc:error.message,
                    data:{}
                }
            }
        }else{
            ctx.body = {
                code:-1,
                desc:'id 不能为空！',
                data:{}
            }
        } 
    }

    addGood = async (ctx,next) => {
        const { good_name, left, good_desc } = ctx.request.body;

        if (!(good_desc&&left&&good_desc)){
            ctx.body = {
                code: -1,
                desc: '缺少字段',
                data:{}
            }
            return;
        }

        try {
            let create_date = moment().format('YYYY-MM-DD');
            let item =  await Good.create({good_name,left,good_desc,create_date});
            if (item){
                ctx.body = {
                    code: 0,
                    desc: '添加成功！',
                    data:item
                }
            }else{
                throw new Error('');
            }
        } catch (error) {
            ctx.body = {
                code: -1,
                desc: error.message,
                data:{}
            }
        }
    }
    

    deleteGood = async (ctx,next)=>{
        const {id} = ctx.params;
        if (id){
            try {
                let item =  await  Good.destroy({where:{id}});
                if (item){
                    ctx.body = {
                        code:0,
                        desc:'删除成功！',
                        data:item
                    }
                }else{
                    ctx.throw( new Error('删除失败！'));
                }

            } catch (error) {
                ctx.body = {
                    code:-1,
                    desc:error.message,
                    data:{}
                }
            }
        }else{
            ctx.body = {
                code:-1,
                desc:'参数不能为空！',
                data:{}
            }
        } 
    }

    updateGoodInfo = async (ctx,next)=>{
        const { id,good_name, left, good_desc } = ctx.request.body;

        if (!(id&&good_desc&&left&&good_desc)){
            ctx.body = {
                code: -1,
                desc: '缺少字段',
                data:{}
            }
            return;
        }

        try {
            let item =  await Good.count({where:{id}});
            if (item){
                let count = await Good.update({good_name,left,good_desc},
                    {
                        where:{id},
                        limit:1
                    }
                );
                
                if (count){
                    ctx.body = {
                        code: 0,
                        desc: '更新成功！',
                        data:item
                    }
                }else{
                    throw new Error('更新失败！');
                }

            }else{
                throw new Error('更新失败！');
            }
        } catch (error) {
            ctx.body = {
                code: -1,
                desc: error.message,
                data:{}
            }
        }
    }
}




export default  new GoodController();