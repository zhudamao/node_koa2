
export default
{
    staticPath:"./static",
    port: process.env.port || 3000,
    upload:{
        path:"./public",
        maxSize:2*1024*1024
    },
    db:{
        mongodb:"mongodb://localhost:27017/test"
    },
    mysql:{
        dbtype: "mysql",
        port: 3306,
        dbname: "i_test",
        username:'zhudm',
        password:'12345678',
        host:'localhost',
        pool: {
            maxConnections: 20,
            minConnections: 0,
            maxIdleTime: 30000
        },
    },
    logFilePath:{
        errorLogPath:'../logs/error/error',
        responseLogPath:'../logs/info/info'
    }
    
}