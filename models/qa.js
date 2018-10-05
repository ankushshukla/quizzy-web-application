var mongoose=require('mongoose');

//Genre Schema
var qaSchema=new mongoose.Schema({
  question:{
    type:String,
    required:true
  },
  answer:{
    type:String,
    required:true
  },
  create_date:{
    type:Date,
    default: Date.now
  },


});

var qa=module.exports= mongoose.model('qa', qaSchema);
