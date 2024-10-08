const express = require("express")
const router = express.Router()
const cinemaService = require("./cinemaService.js")
const { checkPermission } = require("../middlewere/checkPermission")

router.get("/movies",checkPermission("View Movies"), async (req, res) => {
    try{
    const search = req.query.search || ''
    const pageIdx = parseInt(req.query.page, 10) || 0
    const limitPerPage = parseInt(req.query.limitPerPage, 10) || 20
    const searchByGenre = req.query.searchByGenre || ''
    const data = await cinemaService.getAllMovies(search,pageIdx,limitPerPage,searchByGenre)
    return res.json(data)
} catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Internal Server Error" });
}
})

router.get("/movies/all",checkPermission("View Movies"), async (req, res) => {
    try{
    const data = await cinemaService.getAllMovieNames()
    return res.json(data)
} catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Internal Server Error" });
}
})

router.get("/members", checkPermission("View Subscriptions"),async (req, res) => {
    try{
        const search = req.query.search || ''
        const pageIdx = parseInt(req.query.page, 10) || 0
        const limitPerPage = parseInt(req.query.limitPerPage, 10) || 10
    const members = await cinemaService.getAllMembers(search,pageIdx,limitPerPage)
    return res.json(members)
} catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ message: "Internal Server Error" });
}
})


router.get("/movies/:id",checkPermission("View Movies"), async (req, res) => {
    try{
    const id = req.params.id 
    const movie = await cinemaService.getMovieById(id)
    return res.json(movie)
} catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ message: "Internal Server Error" });
}
})

router.get("/members/:id",checkPermission("View Subscriptions"), async (req, res) => {
    try{
    const id = req.params.id 
    const member = await cinemaService.getMemberById(id)
    return res.json(member)
} catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ message: "Internal Server Error" });
}
})


router.post("/movies/", checkPermission("Create Movies"),async (req, res) => {
    try{
    const newData = req.body
    const movie = await cinemaService.createMovie(newData)
    return res.json({ movie })
} catch (error) {
    console.error("Error editind user:", error);
    res.status(500).json({ message: "Internal Server Error" });
}
})

router.post("/members/",checkPermission("Create Subscriptions"), async (req, res) => {
    try{
    const newData = req.body
    const member = await cinemaService.createMember( newData)
    return res.json({ member })
} catch (error) {
    console.error("Error editind user:", error);
    res.status(500).json({ message: "Internal Server Error" });
}
})


router.put("/movies/:id", checkPermission("Update Movies"), async (req, res) => {
    try{
    const id = req.params.id
    const newData = req.body
    const movie = await cinemaService.updateMovie(id, newData)
    return res.json({ movie })
} catch (error) {
    console.error("Error editind user:", error);
    res.status(500).json({ message: "Internal Server Error" });
}
})

router.put("/members/:id", checkPermission("Update Subscription"), async (req, res) => {
    try{
    const id = req.params.id
    const newData = req.body
    const member = await cinemaService.updateMember(id, newData)
    return res.json({ member })
} catch (error) {
    console.error("Error editind user:", error);
    res.status(500).json({ message: "Internal Server Error" });
}
})


router.delete("/movies/:id", checkPermission("Delete Movies"), async (req, res) => {
    try{
    const id = req.params.id
    const status = await cinemaService.deleteMovie(id)
    return res.json({ status })
} catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
}
})

router.delete("/members/:id", checkPermission("Delete Subscriptions"), async (req, res) => {
    try{
    const id = req.params.id
    const status = await cinemaService.deleteMember(id)
    return res.json({ status })
} catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
}
})

router.post("/subscriptions",checkPermission("Update Subscription"), async (req, res) => {
    try{
    const newData = req.body 
    const data = await cinemaService.addSubscription(newData)
    return res.json(data)
} catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Internal Server Error" });
}
})

module.exports = router