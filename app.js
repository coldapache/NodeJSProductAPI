//starts up and imports express

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
require('dotenv').config();

//middleware stuff, use these functions when you hit certain endpoints like a login page, etc.
// app.use('/posts', () => {
//     console.log('heres the middleware')
// })

app.use(bodyParser.json());

//importing the routes
const productsRoute = require('./routes/products');

app.use('/products', productsRoute)

//ROUTES GO HERE
app.get("/", (req, res) => {
  res.send("Its alive homie");
});

app.get('/products', (req, res) => {
  res.send("you out here checkin out the products");
});

//DB connection
mongoose.connect(
  process.env.DB_CONNECTION,
  { dbName: "db_test",
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false },
).then(() => console.log("We are connected"))
.catch(err => console.log("Couldn't connect, sorry!"))

//this sets the port you want your app to show up on.
app.listen(3000);
