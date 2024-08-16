const axios = require("axios")

const url = 'http://127.0.0.1:8000'

const getAllMovies =async(search,pageIdx,limitPerPage,searchByGenre)=>{
    const params = new URLSearchParams({
        search,
        page: pageIdx,
        limitPerPage,
        searchByGenre
    })
    const urlWithParams = `${url}/movies?${params.toString()}`
    const resp =await axios.get(urlWithParams)
    return resp.data
}

const getAllMembers =async()=>{
    const resp =await axios.get(url+'/members')
    return resp.data
}

const getMovieById = async(id)=>{
    const resp =await axios.get(url+`/movies/${id}`)
    return resp.data
}

const getMemberById = async(id)=>{
    const resp =await axios.get(url+`/members/${id}`)
    return resp.data
}

const createMovie= async(newData)=>{
    const resp =await axios.post(url+`/movies`,newData)
    return resp.data
}

const createMember = async(newData)=>{
    const resp =await axios.post(url+`/members`,newData)
    return resp.data
}

const updateMovie= async(id,newData)=>{
    const resp =await axios.put(url+`/movies/${id}`,newData)
    return resp.data
}

const updateMember = async(id,newData)=>{
    const resp =await axios.put(url+`/members/${id}`,newData)
    return resp.data
}

const deleteMovie= async(id)=>{
    const resp =await axios.delete(url+`/movies/${id}`)
    return resp.data
}

const deleteMember = async(id)=>{
    const resp =await axios.delete(url+`/members/${id}`)
    return resp.data
}

module.exports = {getAllMovies,getAllMembers,getMovieById,getMemberById,createMovie,createMember,updateMovie,updateMember,deleteMovie,deleteMember}