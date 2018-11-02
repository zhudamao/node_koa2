import log4js from 'log4js';
import log_config from '../config/log4js';

class LoggerUtil {
    constructor() {
        log4js.configure(log_config);
        this.errorLogger = log4js.getLogger('errorLogger');
        this.resLogger = log4js.getLogger('resLogger');
    }

    // 格式化错误日志
    logError = (ctx, error, resTime) => {
        if (ctx && error) {
            this.errorLogger.error(this.formatError(ctx, error, resTime));
        }
    }

    // 格式化响应日志
    logResponse = (ctx, resTime) => {
        if (ctx) {
            this.resLogger.info(this.formatRes(ctx, resTime));
        }
    }
    // 记录request 日志
    logRequest = (ctx, startTime)=>{
        if (ctx) {
            this.resLogger.info(this.formatReqLog(ctx, startTime));
        }
    }

    // 格式化响应日志
    formatRes = (ctx, resTime) => {
        var logText = new String();

        //响应日志开始
        logText += '\n' + '*************** response log start ***************' + '\n';

        //添加请求日志
        logText += this.formatReqLog(ctx.request, resTime);

        //响应状态码
        logText += 'response status: ' + ctx.status + '\n';

        //响应内容
        logText += 'response body: ' + '\n' + JSON.stringify(ctx.body) + '\n';

        //响应日志结束
        logText += '*************** response log end ***************' + '\n';

        return logText;
    }



    formatReqLog = (req, resTime) => {
        var logText = new String();

        var method = req.method;
        //访问方法
        logText += 'request method: ' + method + '\n';

        //请求原始地址
        logText += 'request originalUrl:  ' + req.originalUrl + '\n';

        //客户端ip
        logText += 'request client ip:  ' + req.ip + '\n';

        //开始时间
        var startTime;
        //请求参数
        if (method === 'GET') {
            logText += 'request query:  ' + JSON.stringify(req.query) + '\n';
            // startTime = req.query.requestStartTime;
        } else {
            logText += 'request body: ' + '\n' + JSON.stringify(req.body) + '\n';
            // startTime = req.body.requestStartTime;
        }
        //服务器响应时间
        logText += 'response time: ' + resTime +'ms' + '\n';

        return logText;
    }

    // 格式化请求日志
    formatError = (ctx, err, resTime) => {
        var logText = new String();

        //错误信息开始
        logText += '\n' + '*************** error log start ***************' + '\n';

        //添加请求日志
        logText += this.formatReqLog(ctx.request, resTime);

        //错误名称
        logText += 'err name: ' + err.name + '\n';
        //错误信息
        logText += 'err message: ' + err.message + '\n';
        //错误详情
        logText += 'err stack: ' + err.stack + '\n';

        //错误信息结束
        logText += '*************** error log end ***************' + '\n';

        return logText;
    }
}

const instance = new LoggerUtil();
export default instance; 