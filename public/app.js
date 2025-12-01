const express = require('express');
const app = express();
const cardRoutes = require('./routes/cardRoutes');
const path = require('path');
const bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use('/', cardRoutes);

app.listen(3000, ()=> {
    console.log('Server is running on port 3000');
});

