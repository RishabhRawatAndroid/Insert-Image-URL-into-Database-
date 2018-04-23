var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var jade = require('jade');
var path=require('path');
var app=express();

var con = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'rishi@#$1996',
     database: 'wallpaper',
     port:'3308'
});

app.use(express.static(path.join(__dirname, 'htmlcss')));

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('view engine', 'jade');


//now its time to connect the database and check whether it is connect or not
con.connect((error)=>{
    if(error)
    {
        throw error;
    }
    console.log("MYSQL connected");
    });

//get request for the html page 
app.get('/index',function(req,res){
var filepath=__dirname+'/htmlcss/index.html';
//res.sendFile(filepath);//response back to html page
res.sendFile(path.join(__dirname,'htmlcss','index.html'));
});
//post the data from html page to node js 
app.post('/action',urlencodedParser, function(req, res, next) {
    console.log(req.body.smallwall);
    console.log(req.body.mediumwall);
    console.log(req.body.largewall);
   con.connect(function(err) {
  //if (err) throw  err;
  //console.log("connected");
  var sql = "INSERT INTO wallpaper.sea(`smallwall`,`mediumwall`,`largewall`) VALUES ('"+req.body.smallwall+"','"+req.body.mediumwall+"','"+req.body.largewall+"');";
  con.query(sql, function(err, result)  {
   if(err)
   {
       throw err;
       console.log(err);
       res.sendFile(path.join(__dirname,'htmlcss','error.html'));
   }else {
    console.log("table created");
    res.redirect('/index'); 
    res.end();
   }
  });
});
});

app.get('/save',(req,res)=>{
    res.sendFile(path.join(__dirname,'htmlcss','save.html'));
});

app.listen(4000,function(){
    console.log("Sever listening on port 4000");
});