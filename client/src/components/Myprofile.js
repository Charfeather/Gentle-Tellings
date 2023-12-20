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
  const responserender=userData.responses.map((response)=>{
    return(
      <h2>{response.content}</h2>
    )
  })
    return(
        <div className="bg-stone-300 h-screen">
            <div>
                <div className="nav_menu">
                  <a href="/">Home</a>
                </div>
                  <div>
                    <h1 className="flex justify-center font-mono font-extrabold text-4xl">Welcome to your profile {userData.username}</h1>
                  </div>
                <div>
                  <div className="flex justify-center my-36 h-3/4">
                    <div className="basis-2/6">
                      <div className="neumorph_stone w-2/4 h-5/6 overflow-auto">
                        <h1 className="font-mono text-2xl font-extrabold sticky top-0 bg-stone-300">Your messages</h1>
                        {messagerender}
                      </div>
                    </div>
                    <div className="basis-2/6">
                      <div className="neumorph_stone w-2/4 h-5/6 overflow-auto">
                        <h1 className="font-mono text-2xl font-extrabold sticky top-0 bg-stone-300">Your responses</h1>
                        {responserender}
                      </div>
                    </div>
                    <div className="basis-1/6 flex flex-col">
                      <div className="flex flex-col">
                        <div className="neumorph_stone h-2/6 overflow-auto">
                            <h1 className="font-mono text-2xl font-extrabold sticky top-0 bg-stone-300">Your friends</h1>
                            <MyFriendlist userData={userData}/>
                        </div>
                        <div className="neumorph_stone h-2/4 overflow-auto">
                          <h1 className="font-mono text-2xl font-extrabold sticky top-0 bg-stone-300 ">Messages your friends made</h1>
                            <FriendMessages userData={userData}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    )
}
export default Myprofile