require('dotenv').config();
const express = require("express");
const cors = require("cors");
const authRouter = require('./routes/auth.routes')

const PORT = 8080;

const app = express();

app.use(express.json())
app.use(cors());
app.use('/api', authRouter)

app.get("/", (req, res) => {
  res.send(`
      <html>
        <head>
          <title>Пример Express сервера</title>
        </head>
        <body>
          <h1>Добро пожаловать на наш сервер!</h1>
          <p>Ебали тебя всем селом))))))))))))</p>
        </body>
      </html>
    `);
});

app.listen(PORT, () => console.log("server started!"));