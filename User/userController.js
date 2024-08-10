const express = require("express")
const router = express.Router()
const userService = require("./userService")
const log = require("../Logger/loggerSrevice")


// http://localhost:8001/auth/login
router.post("/login", async (req,res) => {

    const {username,password} = req.body
    
    if (!username || !password) return res.status(401).send({error: "username and password are required"})
    try{
        const {token} = await userService.login(username,password)
        log.info(`user:${username} - successfully logged in`)
        res.cookie('loginToken',token)
        res.json({success: true})
    }
    catch (err) {
        log.error(`There was an error to logged in:${err}`)
        res.status(500).send({ err: 'Failed to login' })
    }
})

router.post("/signup", async (req,res) => {
        try{
        const data = req.body  
        if (!data.username || !data.password) return res.status(401).send({error: "username and password are required"})

        const sighupData = await userService.signup(data)
        if(sighupData.token){
            log.info(`user:${data.username} - successfully signed up`)
            res.cookie('loginToken',sighupData.token)
            res.json({success: true})
        }
    }
    catch (err) {
        log.error(`There was an error to sign up:${err}`)
        res.status(500).send({ error: `Failed to signup:${err}` })
    }
})

router.post("/logout", async (req,res) => {
    try {
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ error: `Failed to logout: ${err}` })
    }
})



module.exports = router





/*function getLoginToken(user) {
    const userInfo = { 
        _id : user._id, 
        username: user.username, 
        email: user.email, 
    }
    return cryptr.encrypt(JSON.stringify(userInfo))    
}

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser
    } catch(err) {
        console.log('Invalid login token')
    }
    return null
}

function decryptLoginToken(encryptedToken) {
    const decryptedUserInfo = cryptr.decrypt(encryptedToken);
    return JSON.parse(decryptedUserInfo);
}*/