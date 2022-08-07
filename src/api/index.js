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

// app.post('/users', async (req, res) => {
//   await UserModel.create(req.body);
//   res.send('user is created');
// })

// app.get('/users', async (req, res) => {
//   const users = await UserModel.findAll();
//   res.send(users);
// })

// app.get('/users/:id', async (req, res) => {
//   const requestId = req.params.id;
//   const user = await UserModel.findOne({where: {id: requestId}});
//   res.send(user);
// })

// app.put('/users/:id', async (req, res) => {
//   const requestId = req.params.id;
//   const user = await UserModel.findOne({ where: { id: requestId } });
//   user.email = req.body.email;
//   user.password = req.body.password;
//   await user.save();
//   res.send('user updated');
// })

// app.delete('/users/:id', async (req, res) => {
//   const requestId = req.params.id;
//   await UserModel.destroy({ where: { id: requestId } });
//   res.send('user removed');
// })

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
