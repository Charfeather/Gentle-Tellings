import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import Signup from "./Signup";
import { Button } from "@mui/material";
import Navbar from "./Navbar";
import HourlyMessage from "./Hourlymessage";

function App() {
  const [message,setmessage]=useState([])
  const [number,setNumber]=useState([])
  const messageList=[]

  function messagePicker(){
    return Math.floor(Math.random() * messageList.length)+1
  }
  
  function logOut(){
    fetch('/logout',{
      method:'DELETE'
    }).then((resp)=>{
      if (resp.ok){
        //handle logout on front end
        console.log(typeof(setUser))
        setUser(null)
        //or navigate to another route
      }
    })
  }

  useEffect(()=>{
    //authorizing user
    fetch('/authorized')
    .then((resp)=>{
      if (resp.ok){
        resp.json().then((data)=>{
          setUser(data)
          console.log(data)
        })
      }else{
        //handle what should happen if not logged in or request is bad
        console.log('error')
      }
    })

    const allMessage=async()=>{
      try{
        const response=await fetch(`/messages`)
        const data=await response.json()
        data.map((data)=>{
          messageList.push(data)
        })
        console.log(messageList)
      }catch(error){console.error("error",error)}
      setNumber(messagePicker())
    }
    allMessage()
    
    
    const fetchData=async()=>{
      console.log(number)
      try{
          const response=await fetch(`/messages/${number}`)
          const data=await response.json()
          setmessage(data)
      }catch(error){console.error("error",error)}
  }
  fetchData()

  const interval=setInterval(()=>{
    fetchData();
  },3600000);

  return()=>clearInterval(interval)

  },[number])

  const [user,setUser]=useState(null)
   if (!user){
     return <Signup setUser={setUser}/>
   }
  
  return(
  <div>
    <h1>Hello {user.username}</h1>
    <Button variant="contained" onClick={logOut}>Log Out</Button>
    <Navbar user={user} setUser={setUser}/>
    <div>
      <HourlyMessage message={message} user={user} number={number}/>
    </div>
  </div>
  )
}

export default App;
