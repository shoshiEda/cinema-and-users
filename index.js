const express = require('express')
const app = express();
const port = 8001;
const cors = require("cors")

const authenticateToken = require('./middlewere/requireAuth')
const authenticateAdmin = require('./middlewere/isAdmin')




 require("./configs/database.js")

app.use(express.json())
app.use(cors())

const authController = require("./Auth/authController.js")
app.use("/auth", authController)

const cinemaController = require("./Cinema/cinemaController.js")
app.use("/cinema", authenticateToken,cinemaController)

const userController = require("./User/userController.js")
app.use("/user", authenticateToken,authenticateAdmin,userController)








app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
});