import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Navbar from "./Navbar"
import {TextField} from "@mui/material"
import SearchBar from "./SearchBar"
import Userpage from "./Userpage"

function Usersearch() {
  const location = useLocation()
  const userData = location.state
  const [data,setData]=useState([])
  const [search,setSearch]=useState("")
  useEffect(()=>{
    const fetchData=async()=>{
        try{
            const response=await fetch('/users')
            const data=await response.json()
            setData(data)
        }catch(error){console.error("error",error)}
    }
    fetchData()
},[])
const render=data.filter((data)=>
data.username.toLowerCase().includes(search)).
map((data)=>{return <Userpage user={data}/>})

  return (
    <div>
      <h1>Time to search for a user, {userData.username}</h1>
      <div>
        <div className="nav_menu">
            <a href="/">Go Home</a>
        </div>
      </div>
      <SearchBar setSearch={setSearch}/>
      <div className='username-container'>
        {render}
      </div>
    </div>
  )
}

export default Usersearch