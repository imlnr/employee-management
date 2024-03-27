const express = require('express');
const { connection } = require('./config/db');
require('dotenv').config();
const cors = require("cors");
const { userRouter } = require('./routes/user.routes');
const { employeeRouter } = require('./routes/employee.routes');

const app = express();

app.use(express.json())
app.use(cors());
app.use('/user', userRouter);
app.use('/emp', employeeRouter);

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Connected to db...");
        console.log("your server is running at port http://localhost:4500");
    } catch (error) {
        console.log(error);
    }
})