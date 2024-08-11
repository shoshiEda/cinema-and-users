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
        res.cookie('loginToken',token, { httpOnly: true, secure: false, sameSite: 'None' })
        res.json({success: true})
        }else{
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
        const sighupData = await authService.signup(user)
        if(sighupData.token){
            log.info(`user:${user.username} - successfully signed up`)
            res.cookie('loginToken',sighupData.token)
            res.json({success: true})
        }
        else{
            res.status(401).send({ error: sighupData.error });
            log.error(`There was an error to logged in:${sighupData.error}`)
        }
    }
    catch (err) {
        log.error(`There was an error to sign up:${err}`)
        res.status(500).send({ err})
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