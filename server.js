//Install Express, install body-parser, set to json 
const express = require('express');
const app = express();
//Install Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/1955_api');
//Install Body-Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//Set Path and Port
const path = require('path');
const port = 8000;

const NamesSchema = new mongoose.Schema({
    name:{ type: String, required: true, minlength: 1}
})
mongoose.model('Names', NamesSchema);
const Names = mongoose.model('Names')

app.get('/', function(req,res){
    Names.find({}, function(err, names){
        if(err){
            console.log("Returned error", err);
            res.json({message: "Error", err})
        }
        else{
            res.json({message: "Success", data: names})
        }
    })
})
app.get('/new/:name/', function(req,res){
var newName = new Names({name: req.params.name})
newName.save(function(err){
    if(err){
        console.log(newName.errors)
    }
    else{
        res.redirect('/')
    }
})
})

app.get('/:name', function(req,res){
Names.find({name: req.params.name}, function(err, name){
    if(err){
        console.log(err);
    }
    else{
        res.json({message: "Success", data: name})
    }
})
})

app.get('/remove/:name', function(req,res){
Names.remove({name: req.params.name}, function(err){
    if(err){
        console.log(err);
    }
    else{
        res.redirect('/')
    }
})
})


app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});