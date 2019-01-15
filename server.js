var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ani_dashboard');

var DBSchema = new mongoose.Schema({
    name: String
}, {timestamps: true});
mongoose.model('DB', DBSchema);
var D = mongoose.model('DB');

app.get('/', function(req, res){
    D.find({}, function(err, list){
        if(err){
            console.log("returned error", err);
        } else {
            res.json({message: "success", data: list})
        }
    })
})

app.get('/:name', function(req, res){
    var show = req.params.name;
    D.find({'name':show}, function(err, info){
        if (err) {
            console.log(err);
        } else {
            res.json({message: "true", data: info});
        }
    })
})

app.get('/remove/:name', function(req, res){
    var rm = req.params.name;
    D.remove({'name':rm}, function(err){
        console.log('gone');
    })
    res.redirect('/');
})

app.get('/new/:name', function(req, res){
    var nm = req.params.name;
    var newobj = new D({ name: nm});
    newobj.save(function(err){
        if(err) {
            console.log(err);
        } else {
            console.log('ok');
        }
    })
    res.redirect('/');
})

app.get('/create', function(req, res) {
    var newobj = new D ({name:"Dog"});
    newobj.save(function(err){
        if (err) {
            console.log(err);
        } else {
            console.log(D);
        }
    })
    var newobj = new D ({name:"Cat"});
    newobj.save(function(err){
        if (err) {
            console.log(err);
        } else {
            console.log(D);
        }
    })
    var newobj = new D ({name:"Fish"});
    newobj.save(function(err){
        if (err) {
            console.log(err);
        } else {
            console.log(D);
        }
    })
    var newobj = new D ({name:"Emu"});
    newobj.save(function(err){
        if (err) {
            console.log(err);
        } else {
            console.log(D);
        }
    })
    var newobj = new D ({name:"Goat"});
    newobj.save(function(err){
        if (err) {
            console.log(err);
        } else {
            console.log(D);
        }
    })
    var newobj = new D ({name:"Horse"});
    newobj.save(function(err){
        if (err) {
            console.log(err);
        } else {
            console.log(D);
        }
    })
})

app.listen(8000, function() {
    console.log("listen port 8000");
})