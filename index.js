const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

//DB conncetion
require('./api/database/connection');
require('./api/services/passport');

const userRoutes = require("./api/routes/users");
const logoRoutes = require('./api/routes/logos');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

app.use('/user',userRoutes);
app.use('/logo', logoRoutes);


const port = process.env.PORT || 5000;

app.listen(port,  () =>{
    console.log('Server is listening on port '+ port)
});