const dotenv = require("dotenv");
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const { logger } = require('./middlewares/logEvents');
const  errorHandler  = require('./middlewares/errorHandler');
const verifyJWT = require('./middlewares/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middlewares/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3000;
dotenv.config();

//const { swaggerUi, swaggerDocs } = frorequire('./swagger');

// Serve Swagger docs
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

//handle options credentials check - before cors!
// and fetch cookiescredentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
//app.use('/', require('./routes/root'));
//app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
//app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use("/api/profile", require('./routes/api/profileRoutes'));

//app.all is for routin and apply for all http methods at once
//app.use is for middleware and not support rjax
 app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));        
    } else if (req.accepts('json')) {
        res.json({ error: "404 Not Found"});        
    } else {
        res.type('txt').send("404 Not Found");
    }
 });
 
 app.use(errorHandler);
 mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running 
        on port ${PORT}`));    
})
 
