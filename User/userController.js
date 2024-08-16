const express = require("express")
const router = express.Router()
const userService = require("./userService.js")

router.get("/", async (req, res) => {
    try{
    const search = req.query.search || ''
    const pageIdx = parseInt(req.query.page, 10) || 0
    const limitPerPage = parseInt(req.query.limitPerPage, 10) || 6
    
    const users = await userService.getAllUsers(search,pageIdx,limitPerPage)
    return res.json(users)
} catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
}
})


router.get("/:id", async (req, res) => {
    try{
    const id = req.params.id 
    const user = await userService.getById(id)
    return res.json(user)
} catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
}
})


router.put("/:id", async (req, res) => {
    try{
    const id = req.params.id
    const newData = req.body
    const updatedUser = await userService.updateUser(id, newData)
    return res.json({ updatedUser })
} catch (error) {
    console.error("Error editind user:", error);
    res.status(500).json({ message: "Internal Server Error" });
}
})


router.delete("/:id", async (req, res) => {
    try{
    const id = req.params.id
    const status = await userService.deleteUser(id)
    return res.json({ status })
} catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
}
})

module.exports = router