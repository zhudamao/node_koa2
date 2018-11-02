import crypto from 'crypto';
import { User } from '../models/index';
import BaseController from './BaseController';


class UserController extends BaseController {
    constructor(props) {
        super(props);
    }

    /**
     * 用户登陆
     * @param(*) ctx
     * @param(*) next
     */
    login = async (ctx, next) => {
        try {
            const { name, password } = ctx.query;
            if (!name || !password) {
                ctx.body = {
                    code: -1,
                    desc: '参数不正确！',
                    data: {}
                };
            } else if (name && password) {
                let newPass = this.encryption(password);
                const user = await User.findOne({ user_name:name, password:newPass }, '-_id -password -__v');
                if (user) {
                    ctx.body = {
                        code: 0,
                        desc: '登陆成功!',
                        data: user
                    }
                } else {
                    throw new Error('账号密码不正确！');
                }

            } else {
                throw new Error('账号密码不正确！');
            }
        } catch (error) {
            ctx.body = {
                code: -1,
                desc: error.message,
                data: {}
            }
        }
    }

    encryption = (password) => {
        return this.md5(this.md5(password).substr(2, 7) + this.md5(password));
    }

    md5 = (password) => {
        const md_5 = crypto.createHash('md5');
        return md_5.update(password).digest('base64');
    }

    /**
     * 用户注册
     * @param(*) ctx
     * @param(*) next
     */
    register = async (ctx, next) => {
        const { user_name, sex, job, avatar, address, nick_name, password } = ctx.request.body;
        if (!(user_name && job && avatar && address && nick_name && password)) {
            ctx.body = {
                code: -1,
                desc: '必填数据不能为空！',
                data: {}
            }
        } else {
            try {
                const user_id = await this.getIdByType('user_id');
                let new_pass =  this.encryption(password);
                console.log(new_pass)
                let user = { ...ctx.request.body, id:user_id, password:new_pass };

                //const newUserinfo = new User(user);
                //const userinfo = await newUserinfo.save();
                User.create(user);
                ctx.body = {
                    code: 0,
                    desc: '注册成功！',
                    data: user
                }
            } catch (error) {
                ctx.body = {
                    code: -1,
                    desc: error.message,
                    data: {}
                }
            }
        }
    }


    /**
     * 获取用户信息
     * @param(*) ctx
     * @param(*) next
     */
    getUserInfo = async (ctx, next) => {
        const { uid } = ctx.params; 

        if (uid) {
            try {
                let user = await User.findOne({id:uid},'-_id -password -__v');
                if (user){
                    ctx.body = {
                        code: 0,
                        desc: '查询成功！',
                        data: user
                    }
                }else{
                    throw new Error('未找到该用户！');
                }    
            } catch (error) {
                ctx.body = {
                    code: -1,
                    desc: '查询失败！',
                    data: error
                }
            }
        } else {
            ctx.throw('bad request', 500);
        }
    }

    /**
     * 上传用户头像
     * @param(*) ctx,
     * @param(*) next
     */

    updateAvatar = async (ctx,next)=>{
        const { uid } = ctx.request.body; 
        
        if (uid) {
            try {
                let user = await User.findOne({id:uid});
                if (user){
    
                    let src = this.getPath('user_avatar',user.id,ctx.request.files)
                    
                    user.avatar = src;
                    await user.save();

                    ctx.body = {
                        code:0,
                        desc:'上传成功！',
                        data:src 
                    }

                }else{
                    throw new Error('未找到该用户！');
                }

            } catch (error) {
                ctx.body = {
                    code: -1,
                    desc: error.message,
                    data: error
                }
            }
        } else {
            ctx.throw('bad request', 500);
        }
    }



}


export default new UserController();