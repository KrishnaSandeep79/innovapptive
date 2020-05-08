var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var session = require('express-session');
var redis = require('redis');
var redisStore = require('connect-redis')(session);
var client  = redis.createClient();
//var url = require('url');
//var redisURL = url.parse(process.env.REDISTOGO_URL );
    app.use(session({
      secret: 'shhhhh',
      store: new redisStore({ host: 'https://innovapptive-app.herokuapp.com', port: 6379, client: client,ttl : 260}),
      saveUninitialized: false,
      resave: false
    }));


  /*if (process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    var redis = require("redis").createClient(rtg.port, rtg.hostname);

    redis.auth(rtg.auth.split(":")[1]);
    
  } else {
    var redis = require("redis").createClient();
  }*/
mongoose.connect("mongodb+srv://test:test1234@todo-qqfes.mongodb.net/test?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true });

app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());

var a;

  const WorkerSchema = new mongoose.Schema({
    worker_id: {
      type: String,
      default: "0",
      
    },
    worker_name: {
      type: String,
      required: true
    },
    worker_pwd: {
      type: String,
      required: true
    },
    worker_mail: {
      type: String
    },
    worker_location:{
        type:[Object],
        default:[]
    },
    time:{
        type:[Date],
        default:[]
    }
  });

  const MachineSchema = new mongoose.Schema({
    machine_id: {
      type: String,
      default: "0",
      required: true
    },
    machine_type: {
      type: String
    },
    machine_lat: {
      type: String,
      required: true
    },
    machine_lon: {
      type: String,
      required: true
    },
    machine_status: {
      type: Boolean,
      default: true
    },
    machine_problem: {
      type: String
    }
  });

  const WorkSchema = new mongoose.Schema({
    worker_id: {
      type: String,
      default: "0",
      required: true
    },
    machine_id: {
      type: String,
      default: "0",
      required: true
    },
    work_status: {
      type: String,
      default: "None"
    }
  });

  var worker=mongoose.model('WorkerSchema',WorkerSchema);
  var machine=mongoose.model('MachineSchema',MachineSchema);
  var work=mongoose.model('WorkSchema',WorkSchema);
  

var urlencodedParser = bodyparser.urlencoded({ extended: false });

app.use('/assets',express.static('./public/assets'));

app.get('/choice',function(req,res){
    res.render('choice');
});

app.get('/signin',function(req,res){
    res.render('signin');
});

app.post('/signin',async function(req,res){
  var w= await worker.find(req.body);
  if(w){
       req.session.key=req.body.worker_mail;
        
      res.render('login');
  }else{
      console.log("invalid");
  }
});




app.get('/signup',function(req,res){
    res.render('signup');
});

app.post('/signup',async function(req,res){
    console.log(req.body);
    await worker(req.body).save();
    res.render('signin');
});

app.get('/',function(req,res){
    res.render('index');
});


app.get('/login',function(req,res){
    if(a===undefined){
        a=[];
    }
    res.render('login');
});

app.get('/show',function(req,res){
    if(a===undefined){
        a=[];
    }
    console.log(a);
    res.render('sample',{d:a});
});


app.post('/login',urlencodedParser,async function(req,res){
    if(a===undefined){
        a=[];
    }
    a.push(req.body);
    var d = new Date();
   //  worker.updateOne({"worker_mail":req.session.key},{$push:{"worker_location":req.body}});
   var w=await worker.findOne({worker_mail:req.session.key});
    w.worker_location.push(req.body);
    w.time.push(d);
   await worker(w).save();
    res.send(undefined);
});


app.set('view engine','ejs');
var PORT = process.env.PORT || 3000;
app.listen(PORT);


console.log("you are listening to port 3000");