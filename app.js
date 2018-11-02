import path from 'path';

import koa from 'koa';
import koa_static from 'koa-static';
import koa_body from 'koa-body';
import koa_logger from 'koa-logger';
import cors from 'koa2-cors';
import chalk from 'chalk';

import config from './config/config';
import router from './router/index';

import db from './db/index';
//import { getFileDir } from './utils/index';
import { logger } from './middleware/index';

const app =  new  koa();

app.proxy = true;
// 跨域
app.use(cors());
// 静态资源
let static_path = path.resolve(__dirname,config.staticPath);

app.use(koa_static(static_path));
// post body 
app.use(koa_body(
    {
        multipart:true,
        encoding:'gzip',
        formidable:{
            //uploadDir:path.resolve(__dirname,config.upload.path),
            keepExtensions:true,
            maxFileSize:config.upload.maxSize,
            // onFileBegin:(name,file)=>{
            //     const ext = path.extname(file.name);
            //     if (!['.jpg','.jpeg','.png'].includes(ext)){
            //         throw new Error('图片照片格式不正确！');
            //         return;
            //     }

            //     const dir_name = getFileDir();
            //     const full_file_name = `${ Date.now()}${name}${ext}`;
            //     file.path = path.resolve(dir_name,full_file_name); 
            // },
        }
    }
))

/* 自定义中间件 */
/*
app.use ( async (ctx,next)=>{
    let start = Date.now();
    await next();
    let end = Date.now();

    ctx.set("X-Respone-Time",`${end - start}ms`);
})

app.use ((ctx,next)=>{
    console.log(`${ctx.method} ${ctx.url}`)
    next();
})
*/
// 日志中间件
app.use(logger);

app.use(koa_logger());
/* 注册路由 */
app.use(router.routes(),router.allowedMethods());

app.listen(config.port,()=>{
    console.log(
        chalk.green('success open localhost:port' + `${config.port}`)
    )
    
})

app.on('error',(err)=>{
    console.log(
        chalk.red(err)
    )
})