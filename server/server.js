var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser')

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
	// var username = req.params.name;
	// var password = req.params.password;
	// console.log(req.params);
	// console.log(req.query);
	// console.log(req.body);
	// console.log(req.body.password);
	console.log(req.body.name);
	console.log(req.body.password);

	// console.log("username:" + username + " password:" + password);

	res.send('login');
});


router.get('/',function(req,res){
    res.send("This is a test");
});

// router.get('/login',function(req,res){
// 	// console.log(req);
// 	// write("hello");
// 	res.send('hello');
// });

app.use(router);
app.listen(8080);
