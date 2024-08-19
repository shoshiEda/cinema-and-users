const express = require("express")
const router = express.Router()
const authService = require("./authService")
const log = require("../Logger/loggerSrevice")


// http://localhost:8001/auth/login
router.post("/login", async (req,res) => {

    const {username,password} = req.body
    
    if (!username || !password) return res.status(401).send({error: "username and password are required"})
    try{
        const response = await authService.login(username,password)
        if (response.token) {
        log.info(`user:${username} - successfully logged in`)
        res.json({success: true,token:response.token})
        }else{
            res.json({success: false,error:response.error})
            res.status(401).send({ error: response.error });
            log.error(`There was an error to logged in:${response.error}`)
        }
    }
    catch (err) {
        log.error(`There was an error to logged in:${err}`)
        res.status(500).send({ error: "An internal server error occurred" });
    }
})

router.post("/signup", async (req,res) => {
        try{
        const {user} = req.body 
        if (!user.username || !user.password) return res.status(401).send({error: "username and password are required"})
        const signupData = await authService.signup(user)
    console.log('signupData:',signupData)
        if(signupData.token){
            log.info(`user:${user.username} - successfully signed up`)
            res.json({success: true,token:signupData.token})
        }
        else{
            res.json({success: false,error:signupData.error})
            res.status(401).send({ error: signupData.error });
            log.error(`There was an error to logged in:${signupData.error}`)
        }
    }
    catch (err) {
        log.error(`There was an error to sign up:${err}`)
        res.status(500).send({ err})
    }
})





module.exports = router





