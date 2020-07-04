/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const chalk = require('chalk');
const express = require('express');
const { json } = require('express');
const mongoose = require('mongoose');
const Book = require('./models/bookmodel');
const bookRouter = require('./routes/bookRouter')(Book);

// config server
const app = express();
const port = process.env.PORT || 8081;

// DB config
const db = require('./config/keys').mongoURL;

// DB connect
(async function connect() {
  await mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}());

// bosy parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send(`welcome to netbot world`);
});

// listen on port
app.listen(port, () => {
  console.log(chalk.blue(`running on port ${chalk.redBright(`${port}`)}`));
});
