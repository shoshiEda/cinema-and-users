const userModel = require("./userModel")


const getAllUsers = async()=>{
    try{
        const users = await userModel.find({}).lean()
        const fixedUsers = users.map(({ passwordHash, __v, ...rest }) => rest)
        return fixedUsers
    
} catch (error) {
    console.error("Error in user service:", error)
    throw new Error("Service unavailable")
}
}


const getById = async(id)=>{
    try{
    const user = await userModel.findById(id)
    return user?  user :  {}
} catch (error) {
    console.error("Error in user service:", error)
    throw new Error("Service unavailable")
}
}

const updateUser = async(id, newData)=>{
    try{
    const updatedUser = await userModel.findByIdAndUpdate(id, newData)
    return updatedUser
} catch (error) {
    console.error("Error in user service:", error)
    throw new Error("Service unavailable")
}
}
const deleteUser = async(id)=>{
    try{
    await userModel.findByIdAndDelete(id)
    return "Deleted"
} catch (error) {
    console.error("Error in user service:", error)
    throw new Error("Service unavailable")
}
}

module.exports = {getAllUsers,updateUser,deleteUser,getById}
