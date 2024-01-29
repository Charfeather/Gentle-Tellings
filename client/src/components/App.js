import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import Signup from "./Signup";
import { Button, outlinedInputClasses } from "@mui/material";
import Navbar from "./Navbar";
import HourlyMessage from "./Hourlymessage";

function App() {
  const [message,setmessage]=useState([])
  const [number,setNumber]=useState([])
  const [update,setUpdate]=useState(false)
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

  //update

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
      try{
          const response=await fetch(`/messages/${number}`)
          const data=await response.json()
          setmessage(data)
      }catch(error){console.error("error",error)}
  }
  fetchData()

  // const interval=setInterval(()=>{
  //   fetchData();
  // },3600000);

  // return()=>clearInterval(interval)

  },[number])

  const [user,setUser]=useState(null)
   if (!user){
     return <Signup setUser={setUser}/>
   }
  
  return(
  <div className="h-screen bg-stone-300">
    <Navbar user={user} setUser={setUser}/>
    <Button variant="contained" onClick={logOut}>Log Out</Button>
    <h1 className="text-3xl font-bold flex justify-center font-mono absolute inset-x-0 bottom-0 h-4/6">Hello, {user.username}</h1>
    <div className="flex justify-center text-2xl font-mono font-black absolute inset-x-0 bottom-0 h-3/5">
      <HourlyMessage message={message} user={user} number={number}/>
    </div>
  </div>
  )
}

export default App;
