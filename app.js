//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/traineesDB", {useNewUrlParser:true});

const traineesSchema = {
 id : String,
  name: String ,
  email: String,
  phoneNo : String,
  amount : String

};

const Trainee = mongoose.model("Trainee" , traineesSchema);

////////////////////////////////////REQUEST TO GET ALL ARTICLES/////////////////////////////////////////////

app.route("/trainees")
.get(function(req , res){
  Trainee.find(function(err , foundResult){
    if(!err){
      res.send(foundResult);
    } else{
      res.send(err);
    }

  });
})

//Used the POSTMAN For getting the data

.post( function(req , res){
  const newTrainee = new Trainee({
    id : req.body.id,
    name: req.body.name,
    email: req.body.email,
    phoneNo:req.body.phoneNo,
    amount: req.body.amount
  });
  newTrainee.save(function(err){
    if(!err){
      res.send("Successfully saved a new Trainee.")
    }
    else{
      res.send(err);
    }
  });
})



////////////////////////////////////REQUEST TO GET A SPECIFIC ARTICLES/////////////////////////////////////////////

//For getting a name having a space in between we use %20

app.route("/trainees/:traineeId")
.get( function(req , res){
    Trainee.findOne({id : req.params.traineeId} , function(err , foundTrainee){
      if(foundTrainee){
        res.send(foundTrainee);
      }
      else{
        res.send("Not found any Trainee with Trainee Name.");
      }
    });
})

app.listen(5001, function() {
  console.log("Server started on port 5001");
});
