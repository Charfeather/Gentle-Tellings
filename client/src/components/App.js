import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import Signup from "./Signup";
import { Button } from "@mui/material";
import Navbar from "./Navbar";
import MessageList from "./MessageList";

function App() {
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
  },[])

  const [user,setUser]=useState(null)
   if (!user){
     return <Signup setUser={setUser}/>
   }
  
  return(
  <div>
    <h1>Hello {user.username}</h1>
    <Button variant="contained" onClick={logOut}>Log Out</Button>
    <Navbar user={user} setUser={setUser}/>
  </div>
  )
}

export default App;
