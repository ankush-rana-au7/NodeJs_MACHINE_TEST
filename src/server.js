require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const ApiError = require('./utils/ApiError');
const httpStatus = require('http-status');
const routes = require('./routes/v1');


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

/*Mongodb Connection*/
mongoose.connect(process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("DB Connected successfully");
});

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  });

app.listen(port, () => {
  console.log(`Server is started on the port ${port}`)
}); 

