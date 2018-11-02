import mongoose from 'mongoose';
import chalk from 'chalk';
import config from '../config/config';

mongoose.connect(config.db.mongodb,{useNewUrlParser: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open',()=>{
    console.log(
        chalk.green('mongoDb 连接成功!')
    )
    
})

db.on('error',(err)=>{
    console.log(
        chalk.red('Error MongoDb connection:' + err)
    )
   
})

db.on('close',()=>{
    console.log(
        chalk.blue('MongoDb 连接断开，重新连接')
    )
    

    mongoose.connect(config.db.mongodb,{server:{auto_reconnect:true}})
})