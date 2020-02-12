const express = require('express');
// const bodyParser = require('body-parser'); // in new veersion of express bodyparser is not needed
const mongoose = require('mongoose');
const cors = require('cors');

// inporting the routes
const exerciseRoute = require('./routes/exercise');
const userRoutes = require('./routes/user')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// app.use(bodyParser());// change for body parser
app.use(express.json());

// use the routes
app.use('/exercise', exerciseRoute);
app.use('/user', userRoutes);
// connnection to mongodb atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected');
}).catch((error) => {
    console.log(error)
});

// to check the connection
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connection is sucessfull')
})

app.listen(port, () => {
    console.log(`Server is runnning at port ${port}`);
})