
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , product=require('./routes/product')
   , index1=require('./routes/index1')
   ,sell=require('./routes/sell')
   ,cart=require('./routes/cart')
   ,myebay=require('./routes/myebay')
   ,checkout=require('./routes/checkout')
   ,product=require('./routes/product')
   ,prodlist=require('./routes/prodlist');
var mysql=require('mysql');
var bcrypt = require('bcryptjs');
var mongo = require("./routes/mongo");
var session = require("express-session");


//var session = require('client-sessions');//Require the client-sessions module

var login=require('./routes/login');

var app = express();
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);

var passport = require('passport');
require('./routes/passport')(passport);

var mongoURL = "mongodb://localhost:27017/myEbay";


app.use(expressSession({  secret: 'cmpe273_teststring',  
	resave: false, 
	//don't save session if unmodified   // don't create session until something stored 
	saveUninitialized: false,
	duration: 30 * 60 * 1000,      
	activeDuration: 5 * 60 * 1000,  
	store: new mongoStore({   url: mongoURL  })
	}));

app.use(passport.initialize());
app.use(passport.session());
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon(path.join(__dirname, 'public','img','ebay_favicon.png')));
app.use(express.logger('dev'));
app.use(express.bodyParser());

//app.use(session({resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE', cookie: { maxAge: 60000 }}));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
//app.get('/login',login.login);

app.get('/sell',sell.sellProduct);
app.get('/login',login.checkLogin);
app.get('/logout',login.logout);
app.post('/signin', function(req, res, next) {
	  passport.authenticate('login', function(err, user, info) {
	    if(err) {
	      return next(err);
	    }
console.log(user+" .harsh.......................................................")
	    if(!user) {
	      return res.redirect('/');
	    }

	    req.logIn(user, {session:false}, function(err) {
	      if(err) {
	        return next(err);
	      }

	     // req.session.user = user.username;

	      var user_id = user.email;
			username = user.firstname;
			req.session.user_id = user_id;
			req.session.username = username;
			req.session.user=user;
			req.session.email = user.email;
			req.session.fname = user.firstname;
			req.session.lastname = user.lastname;
			req.session.mobile = user.phone;

			
			json_responses = {
				"statusCode" : 200
			};
			res.send(json_responses);
	     
	    })
	  })(req, res, next);
	});



//app.post('/signin',login.loginDetails);
app.post('/signup',login.signup);
app.get('/homepage',login.redirectToHomepage);
app.get('/product',product.product);
app.post('/checkSession',index1.checkSession);
app.get('/addcat',sell.addCategory);
app.post('/addProduct',sell.addProduct);
app.get('/cart',cart.showCart);
app.get('/myebay', myebay.myebay);
app.get('/checkout',checkout.checkout);
app.post('/productlist',product.getproducts);
app.get('/getCategories',index1.getCategories);
app.get('/getproducts',index1.getproducts);
app.get('/getSubcats',product.getSubcats);
app.get('/getItem',product.getItem);
app.get('/getItemDetails',product.getItemDetails);
app.get('/rendercart',product.showcart);
app.get('/rendercheckout',checkout.rendercheckout);
app.post('/addToCart',product.addToCart);
app.post('/checkout',checkout.checkout);
app.get('/prodlist',prodlist.prodlist);
app.get('/getpurchase',myebay.getpurchase);
app.get('/getsell',myebay.getsell);
app.get('/rendercart',product.showcart);
app.get('/showcart',product.viewcart);
app.post('/pay',checkout.pay);
app.get('/removefromcart',product.removefromcart);

mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});  
});
