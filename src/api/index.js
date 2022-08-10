require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require('./database');
const errorMiddleware = require('./middlewares/errorMiddleware');

const router = require('./router/router');

sequelize.sync().then(() => console.log('db is ready'));

const PORT = process.env.API_PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/v1', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`)
    })
  } catch (e) {
    console.log(e);
  }
}

start()
