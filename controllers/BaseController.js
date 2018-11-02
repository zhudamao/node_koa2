import fs from 'fs';
import path from 'path';

import { Ids } from '../models/index';
import { getFileDir } from '../utils/index';


export default class BaseControler {
    constructor(){
        this.idList = ['user_id','good_id']
    }

    getIdByType = async (type) => {
        if (!this.idList.includes(type)){
            throw new Error('id 类型错误!');
            return;
        }

        try {
            const idData = await Ids.findOne();
            idData[type]++;
            await idData.save();

            return idData[type];
        } catch (error) {
            console.log('获取ID数据失败');
            throw Error(error)
        }
    }

    getPath = (type,id,files)=> {
        let keys = Object.keys(files);
        
        if (keys.length){
            let arry = [];
            keys.forEach(element => {
                let file = files[element];
                let file_0 = this.uploadImage(file,type,id);
                arry.push(file_0)
            });
            return arry;
        }else{
            throw new Error('没有图片！');
        }
    }

    uploadImage = (file,type,id)=>{
        const ext = path.extname(file.name);
        if (!['.jpg','.jpeg','.png'].includes(ext)){
                    throw new Error('图片照片格式不正确！');
                    return;
        }

        let {dateString,fullPath} = getFileDir();

        const reader = fs.createReadStream(file.path);
        const full_file_name = `${type}-${id}-${ Date.now()}-${file.name}`;
        let filePath = path.resolve(fullPath,full_file_name);
        const writer = fs.createWriteStream(filePath);
        reader.pipe(writer);

        return `${dateString}/${full_file_name}`;
    }


}
