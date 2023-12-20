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
  const [friend,setFriend]=useState(false)
  const [render,setRender]=useState(false)
  useEffect(()=>{
    const fetchData=async()=>{
        try{
            const response=await fetch('/users')
            const data=await response.json()
            setData(data)
        }catch(error){console.error("error",error)}
    }
    fetchData()
},[friend])
useEffect(()=>{
  console.log('I was called')
},[render])
const userrender=data.filter((data)=>
data.username.toLowerCase().includes(search)).map((data)=>{return(
  <div>
    <div className="flex justify-center text-lg font-bold font-mono">
      <Userpage key={data.id} user={data} setPage={setUserPage} userpage={userpage} />
    </div> 
  </div>
  )
})


  if(userpage===null){
    return (
      <div className="h-screen bg-stone-300">
        <div>
          <div className="nav_menu">
              <a href="/">Go Home</a>
          </div>
        </div>
        <div>
          <div className="flex justify-center">
            <h1 className="flex justify-center text-2xl font-mono font-extrabold">Time to search for a user, {userData.username}</h1>
          </div>
          <div className="flex justify-center ">
            <SearchBar setSearch={setSearch}/>
          </div>
          <div>
            <div className="flex justify-center">
              <h1 className="flex justify-center bg-white w-80 text-3xl font-mono font-bold">Users</h1>
            </div>
            <div className="flex justify-center">
              <div className="box-content bg-green-200 h-3/4 w-80 p-4 border-4 relative overflow-auto">
                {userrender}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }else{
    return(
      <UserProfile userpage={userpage} userData={userData} friend={friend} setFriend={setFriend}/>
    )
  }
}

export default Usersearch