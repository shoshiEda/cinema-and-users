const express = require('express')
const app = express();
const port = 8001;
const cors = require("cors")

//const authenticateToken = require('./middlewere/requireAuth')



 require("./configs/database.js")

app.use(express.json())
app.use(cors())


const userController = require("./User/userController.js")
app.use("/auth", userController)

//app.use(authenticateToken.requireAuth)






app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
});