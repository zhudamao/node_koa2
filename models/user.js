import mongoose from 'mongoose';

const UserSchema =  new mongoose.Schema({
    id:Number,
    user_name:{type:String,default:''},
    sex:Boolean,
    job:{type:String,default:''},
    avatar:{type:String,default:'default.jpg'},
    address:String,
    nick_name:String,
    password:String
});

UserSchema.index({id:1});

UserSchema.static ={

}

const UserModel = mongoose.model('UserModel',UserSchema);

export default UserModel;