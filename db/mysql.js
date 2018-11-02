import sequelize from 'sequelize';
import chalk from 'chalk';

import config from '../config/config';

const seq_instance = new sequelize(
    config.mysql.dbname,
    config.mysql.username,
    config.mysql.password,
    {
        dialect:config.mysql.dbtype,
        pool:config.mysql.pool
    }
)

seq_instance.authenticate().then(()=>{
    console.log(
        chalk.green(`mysql has successed conncetd to ${config.mysql.host}:${config.mysql.port}`)
    );
}).catch((err)=>{
    console.log(
        chalk.red(err)
    )
});

export default seq_instance;
