var moment = require('moment');
var mysql = require('mysql');
var express = require('express');
var mysql = require('mysql');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var chnutf8 = require('./chineseUTF8.js');

var userInfo = {};

var client = mysql.createConnection({  
  host : 'localhost',
  user: 'root',  
  password: 'jiwenzhong',
  database: 'wechat'  
});  
client.connect();

function constructUserJson(input,result){
    for (var i = 0; i < input.length; i++) {
        result['id'] = input[i].user_id;
        result['name'] = input[i].name;
        result['email'] = input[i].email;
        result['nick'] = input[i].nick;
        result['sex'] = input[i].sex;
        result['avatar'] = input[i].avatar;
        result['sign_info'] = input[i].sign_info;
    }
    // console.log(JSON.stringify(result));
    return result;
}

function constructMessage(input){
    var result = [];
    for (var i = 0; i < input.length; i++) {
        result[i]={
            'from_user': input[i].src_name,
            'content': input[i].content
        }
    }
    return result;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


/* GET users listening. */
router.post('/authorization', function(req, res) {

	console.log(req.body.name);
	console.log(req.body.password);

    client.query('select * from user_account where user_id = \''+req.body.name+'\';',
        function(err,rows,fields)
        {
            if(err) throw err;
            // console.log(rows);
            
            if(rows.length<=0) {
                res.status(503).send("invalid");
            }
            else if(req.body.password==rows[0].password){
                userInfo = constructUserJson(rows,userInfo);
                (function(){
                    res.send(userInfo);
                }());
            }
            else{
                res.status(503).send("invalid");
            }
        }
    );

	// console.log("username:" + username + " password:" + password);

	// res.send('login');
});

router.post('/register',function(req,res){
    var user_name = req.body.name;
    var user_password = req.body.password;
    var user_email = req.body.email;

    // console.log(user_name);
    // console.log(user_password);
    // console.log(user_email);

    var flag = 0;
    // client.query('select ')
    (function(){
        var query_user_name = 'select user_id from user_account where user_id = \''+user_name+'\'';
        var query_user_email = 'select email from user_account where email = \''+user_email+'\'';
        console.log(query_user_name);
        console.log(query_user_email);
        client.query(query_user_name,
            function(err,rows,fields)
            {
                if(err) throw err;
                // console.log(rows);
                // console.log(rows.length);
                if (rows.length>0) flag=1;

            });
        client.query(query_user_email,
            function(err,rows,fields)
            {
                if(err) throw err;
                if (rows.length>0) flag=1;
                // console.log(flag);

                //check if duplicate
                (function(){
                // console.log(flag);
                if (flag) {
                    res.status(503).send("info_duplicate");
                }
                else{
                    var insert = 'insert into user_account values (\''+
                    user_name+'\', \''+
                    user_name+'\', \''+
                    user_email+'\','+
                    '\'\','+
                    '\'\','+
                    '\'\','+
                    '\'\','+
                    '\''+user_password+'\''
                     +');' ;
                    console.log(insert);
                    client.query(insert);
                    (function(){
                        res.send("register success!");
                    }());
                }
            }());
        });
        
    }());
});

router.post('/chat',function(req,res){
    var src_name = req.body.fromUser;
    var dst_name = req.body.toUser;
    var content = req.body.content;
    // client.
    var insertMessage = "insert into message values (\'"+
                        src_name+'\',\''+
                        dst_name+'\',\''+
                        content+'\','+
                        'null,\''+
                        '0\');';
    console.log(insertMessage);
    client.query(insertMessage,function(){
        res.send("yes!");
    })
});

router.post('/messagelist',function(req,res){
    var user_name = req.body.name;
    var queryState = "select * from message where dst_name = \'"+
                    user_name+"\' and flag = \'0\';";
    console.log(queryState);
    client.query(queryState,function(err,rows){
        if(err) throw err;
        var messageList;
        messageList=constructMessage(rows);
        console.log(messageList);
        (function(){
            var updateState = "update message set flag = 1 where dst_name = \'"+user_name+"\';";
            console.log(updateState);
            client.query(updateState);
            res.send(messageList);
        }());        
    })
    // res.send("yes");
});

router.get('/',function(req,res){
    res.send("This is a test");
});


app.use(router);
app.listen(8080);
