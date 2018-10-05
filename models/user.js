let mongoose= require("mongoose");
import bcrypt from 'bcrypt-nodejs';

var UserSchema=new mongoose.Schema({
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});


UserSchema.pre('save', function(next) {
  var user = this;
  if(!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10,(err, salt) => {
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if(err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});


UserSchema.methods.comparePassword = function(password) {
  var user = this;
  return bcrypt.compareSync(password, user.password);
};
export default mongoose.model('User', UserSchema);
