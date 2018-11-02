import fs from 'fs';
import path from 'path';
import moment from 'moment';

import config from '../config/config';

function getFileDir(){
    let date = new Date();
    let dateString = moment().format('YYYY-MM-DD');;
    let fullPath = path.resolve(config.upload.path,dateString);

    if (!fs.existsSync(fullPath)){
        fs.mkdirSync(fullPath);
    }

    return {dateString,fullPath};
}


export {getFileDir};