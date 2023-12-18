import { Button } from "@mui/material"
import Navbar from "./Navbar"
import { useLocation } from "react-router-dom"
import React, { useEffect, useState } from "react"
import Test from "./Usermessagerender"
import MyFriendlist from "./Myfriends"
import FriendMessages from "./Myfriendmessages"

function Myprofile(){
  const location=useLocation()
  const userData=location.state
  const messagerender=userData.messages.map((message)=>{
    return(
      <Test message={message}/>
    )
  })
    return(
        <div>
            <h1>Welcome to your profile {userData.username}</h1>
            <div>
                <div className="nav_menu">
                  <a href="/">Home</a>
                </div>
                <div>
                  <h1>Your messages</h1>
                  {messagerender}
                </div>
                <div>
                  <h1>Your responses</h1>
                </div>
                <div>
                  <h1>Your friends</h1>
                  <MyFriendlist userData={userData}/>
                </div>
                <div>
                  <h1>Messages your friends made</h1>
                  <FriendMessages userData={userData}/>
                </div>
            </div>
        </div>
    )
}
export default Myprofile