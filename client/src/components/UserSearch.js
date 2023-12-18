import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import SearchBar from "./SearchBar"
import Userpage from "./Usersearchpop"
import UserProfile from "./UserProfile"

function Usersearch() {
  const location = useLocation()
  const userData = location.state
  const [data,setData]=useState([])
  const [search,setSearch]=useState("")
  const [userpage,setUserPage]=useState(null)
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
const userrender=data.filter((data)=>
data.username.toLowerCase().includes(search)).
map((data)=>{return <Userpage key={data.id} user={data} setPage={setUserPage} userpage={userpage}/>})


  if(userpage===null){
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
          {userrender}
        </div>
      </div>
    )
  }else{
    return(
      <UserProfile userpage={userpage} userData={userData}/>
    )
  }
}

export default Usersearch