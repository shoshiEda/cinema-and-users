const userModel = require("./userModel")


const getAllUsers = async(search,pageIdx,limitPerPage)=>{
    try{

        const allUsers = await userModel.countDocuments({})
        const lastPage = allUsers%limitPerPage? Math.floor(allUsers/limitPerPage)+1 : Math.floor(allUsers/limitPerPage)
        const isLastPage = lastPage===pageIdx+1? true : false
        const skip = pageIdx * limitPerPage;

        const users = await userModel.find({
            $or: [
                { userName: { $regex: search, $options: "i" } }, 
                { firstName: { $regex: search, $options: "i" } },
                { lastName: { $regex: search, $options: "i" } }
            ]
        })
        .skip(skip)
        .limit(limitPerPage) 
        .lean()        
        const fixedUsers = users.map(({ passwordHash, __v, ...rest }) => rest)
        return {fixedUsers,isLastPage}
    
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
