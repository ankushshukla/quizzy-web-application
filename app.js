var express=require('express');
import authController from './controllers/authController.js';
var app=express();
var bodyparser=require('body-parser');
var mongoose=require('mongoose');
mongoose.set('debug',true);
var db=require('./models/qa.js');

import user from './models/user.js'

//cONNECT TO MONGOOSE

mongoose.connect('mongodb://ankush:ankush044@ds121593.mlab.com:21593/quizzyapi');
mongoose.Promise=Promise;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

// app.get('/',function(req,res){
//   res.sendfile('026/index.html');
// })


app.get('/api/quizzyqa', function(req,res){
 db.find()
  .then(function(qa){
    res.json(qa);
  })
  .catch(function(err){
    res.send(err);
  })
})
app.get('/api/quizzyqa/:id', function(req,res){
 db.findById(req.params.id)
  .then(function(geners){
    res.json(geners);
  })
  .catch(function(err){
    res.send(err);
  })
});
app.get('/api/quizzyqa/delete/:id', function(req,res){
 db.findOneAndDelete(req.params.id)
  .then(function(geners){
    res.json(geners);
  })
  .catch(function(err){
    res.send(err);
  })
})

app.post('/api/quizzyqa', function(req,res){

  db.create(req.body)
  .then(function(newTodo){
    res.json(newTodo);
  })
  .catch(function(err){
    res.send(err);
  })
});
app.get('/api/users', function(req,res){
  user.find()
   .then(function(users){
     res.json(users);
   })
   .catch(function(err){
     res.send(err);
   })
})

app.post('/signup' , authController.signup);
app.post('/login', authController.login);
app.listen(process.env.PORT || 5000)
