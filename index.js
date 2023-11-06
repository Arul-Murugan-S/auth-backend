const express = require('express');
const connectDB = require('./db');
const signinRouter = require('./routes/signin');
const loginRouter = require('./routes/login');
const homeRouter = require('./routes/home');


const cors = require('cors');

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors({origin:'*'}))

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/signin', signinRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);

app.listen(port, () => {
    console.log(`Server has started on port: ${4000}.`);
});










// console.log("Hello");