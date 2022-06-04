const express = require('express');
var http = require('http');

const db = require("./db");

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.json());

app.use('/public', express.static('public'));

const userRouter = require('./routes/users');
app.use('/users', userRouter);


 app.get('/', function(req, res){

//   //db.none("CREATE TABLE IF NOT EXISTS Users (id SERIAL PRIMARY KEY, user_id varchar(255), user_name varchar(255), d_len integer, d_col integer, d_hat integer, d_bg integer, d_effect integer, d_anim integer, updated DATE NOT NULL DEFAULT CURRENT_DATE);").catch(console.error());
//   // db.one('$<userID>',
//   // {
//   //   userID: '367022076'
//   // });

   res.render("main");
 });
 
app.listen(port);