const jFile = require("jsonfile")
const path = require("path")


const USERFILE = path.join(__dirname, "../data/users.json" )
const PERMISSIONSFILE = path.join(__dirname, "../data/permissions.json" )



const getUsersWithPremissions = async() => {
try{
    const users = await jFile.readFile(USERFILE)
    const permissions = await jFile.readFile(PERMISSIONSFILE)
    return {...users,permissions}
}catch(err){
    console.log("error at user repo:getting users:",err)
}
}

const updateUsersWithPremissions = async(newUser) => {
    try{
    let oldUsers = await jFile.readFile(USERFILE) 
    let oldPermissions = await jFile.readFile(PERMISSIONSFILE) 
    const { permissions, ...newUserWithoutPermissions } = newUser
    oldUsers.push(newUserWithoutPermissions)
    oldPermissions.push({userId:newUser._id,permissions})
    await jFile.writeFile(USERFILE, oldUsers)
    await jFile.writeFile(PERMISSIONSFILE, oldPermissions)
}catch(err){
    console.log("error at user repo:updating users:",err)
}
}


module.exports = {getUsersWithPremissions,updateUsersWithPremissions}
