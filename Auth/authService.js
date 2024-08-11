const userRepo = require("../User/userRepo.js")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const userModel = require("../User/userModel.js")

const secret =process.env.SECRET1 || 'Secret'

const saltRounds = 10

const admin = {
    userName:"admin",
    firstName: "admin",
    lastName: "admin",
    sessionTimeOut: 300,
    createdDate:  Date.now(),
    permissions:["View Subscriptions","Create Subscriptions","Delete Subscriptions","View Movies","Create Movies","Delete Movies"],
    passwordHash:"",
    isAdmin:true
}

const login = async (username, password) =>{
    if (!username || !password) {
        throw new Error('Username and password are required');
    }

    const users = await userModel.find({})
    let selectedUser

    if(!users || !users.length)  //initial login by admin
    {
        if(username==='admin'){
            const hashedPassword = await bcrypt.hash(password, saltRounds)
            admin.passwordHash = hashedPassword

            const newUser = new userModel(admin)
            await newUser.save()
            const { passwordHash, ...fullNewUserWithoutPassword } = newUser
            const {_doc:newUserWithoutPassword} = fullNewUserWithoutPassword

            await userRepo.updateUsersWithPremissions(newUserWithoutPassword)
            selectedUser = {...newUserWithoutPassword}
            }
        else
            throw new Error("error logging in")
    }
    else{
        const user = users.find(user=>user.userName===username)
        if(!user) return{token:null,error: "Invalid username or password"}
        else{
            const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)
            if(isPasswordCorrect){
                const { password, ...userWithoutPassword } = user
                selectedUser = {...userWithoutPassword._doc}
            }
            else return{token:null,error: "Invalid username or password"}
    }
}
    const token =  jwt.sign({userName:selectedUser.userName,sessionTimeOut:selectedUser.sessionTimeOut,permissions:selectedUser.permissions}, secret)
    if(token)   return { token }  
}

const signup = async (newData) =>{

        if (!newData.username || !newData.password) {
            throw new Error('Username and password are required');
        }

        const userNames = await userModel.find({}).select('userName')
        const user = userNames.find(userName => userName.userName===newData.username)
        if(user) return{token:null,error: "username already exist"}

        const newUser = {
            userName:newData.username,
            firstName: newData.firstName || "",
            lastName: newData.lastName || "",
            sessionTimeOut: newData.sessionTimeOut || 30,
            createdDate:  Date.now(),
            permissions:newData.permissions || [],
            passwordHash:"",
            isAdmin:false
        }

        const hashedPassword = await bcrypt.hash(newData.password, saltRounds)
        newUser.passwordHash = hashedPassword
        updatedNewUser = new userModel(newUser)
        await updatedNewUser.save()
        const { passwordHash, ...fullNewUserWithoutPassword } = updatedNewUser
        const {_doc:newUserWithoutPassword} = fullNewUserWithoutPassword
        await userRepo.updateUsersWithPremissions(newUserWithoutPassword)             
        const token =  jwt.sign({userName:newUserWithoutPassword.userName,sessionTimeOut:newUserWithoutPassword.sessionTimeOut,permissions:newUserWithoutPassword.permissions}, secret)
        if(token)   return { token }  
    }



module.exports = {login,signup}


