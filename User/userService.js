const userRepo = require("./userRepo.js")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const userModel = require("./userModel.js")

const secret =process.env.SECRET1 || 'Secret'

const saltRounds = 10

const admin = {
    userName:"admin",
    firstName: "admin",
    lastName: "admin",
    sessionTimeOut: 300,
    createdDate:  Date.now(),
    permissions:["View Subscriptions","Create Subscriptions","Delete Subscriptions","View Movies","Create Movies","Delete Movies"],
    passwordHash:""
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
        if(!user) throw new Error("username or password are incorrect")
        else{
            const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)
            if(isPasswordCorrect){
                const { password, ...userWithoutPassword } = user
                selectedUser = {...userWithoutPassword._doc}
            }
            else throw new Error("username or password are incorrect")
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
        if(user) throw new Error ('username already taken')

        const newUser = {
            userName:newData.username,
            firstName: newData.firstName || "",
            lastName: newData.lastName || "",
            sessionTimeOut: newData.sessionTimeOut || 30,
            createdDate:  Date.now(),
            permissions:newData.permissions || [],
            passwordHash:""
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


