import loggerUtil from '../utils/logger';

async function logger(ctx,next){
    let start = new Date();
    //loggerUtil.logRequest(ctx,start);
    try {
        await next();
        let costTime = new Date() - start;
        loggerUtil.logResponse(ctx,costTime)
    } catch (error) {
        let costTime = new Date() - start;
        loggerUtil.logError(ctx,error,costTime);
    }
} 

export {logger};