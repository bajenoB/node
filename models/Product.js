const{
    Schema,model

}=require('mongoose')

const schema=new Schema({
    Name: {type:String,required:true, unique: false},
    Price:{type:Number,required:true, unique: false},
    Manufakturer:{type:String,required:true, unique: false},
    Image:{type:String,required:true, unique: false},
    Country:{type:String,required:true, unique: false},
    Rating:{type:Number,required:true, unique: false},
    Tuning:{type:String,required:true,unique:false}
    
})
module.exports=model('Product',schema)