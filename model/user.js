const mongoose=require('mongoose');

var UserSchema = new mongoose.Schema({
    phone:{type:String,required:true,min:9,max:10},
    password: {type:String,required:true,min:8,max:32},
    email:{type:String,required:true},
    date: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false }
    //confirmed:{type:Boolean,default:false}
});

var tokenSchema=new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId,required: true},
    tokenUser:{type:String,required:true},
    createdAt: { type: Date, required: true, default: Date.now }
})



let models = {
    User: mongoose.model('User', UserSchema),
    Token:mongoose.model('Token',tokenSchema)
}

module.exports= models;