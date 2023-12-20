import UserFriendlist from "./Userfriends"
import Usermessage from "./Usermessagerender"
import { Button } from "@mui/material"
import { useEffect, useState } from "react"

function UserProfile({userpage,userData,friend,setFriend}){

    const [render,setRender]=useState(false)
    const messagerender=userpage.messages.map((message)=>{
        return(
          <Usermessage key={message.id}message={message}/>
        )
      })
      useEffect(()=>{
        console.log('I was called')
      },[render])
      function handlefriend(){
        console.log(`Hello ${userData.username} I am ${userpage.username} we are friends now`)
        fetch(`/add_friend/${userData.id}/${userpage.id}`,{
          method:'POST',
        }).then(()=>{
          setRender(!render)
        })
      }
      function handledelete(){
        console.log(`Hi ${userpage.username},this is ${userData.username} we cant be friends anymore`)
        fetch(`/delete_friend/${userData.id}/${userpage.id}`,{
          method:'DELETE'
        }).then(()=>{
          setRender(!render)
        })
        fetch(`/delete_friend/${userpage.id}/${userData.id}`,{
          method:'DELETE'
        }).then(()=>{
          setRender(!render)
        })
      }
    function Mypage(){
      useEffect(()=>{
        console.log('I was called')
      },[render])
      if(userpage.username==userData.username){
        console.log('this is my page')
      }else{
        if(friend==false){
          return(
            <Button variant="outlined" onClick={handlefriend}>add friend</Button>
          )
        }if(friend==true){
          return(
            <Button variant="outlined" onClick={handledelete}>delete friend</Button>
          )
        }
      }
    }
    return(
        <div className="bg-stone-300 overflow-auto h-screen">
          <div className="nav_menu">
              <a href="/search">Back to search</a>
              <a href="/">Home</a>
          </div>
          <div className="flex justify-center">
            <h1 className="text-3xl font-mono font-bold">Welcome to {userpage.username}'s page</h1>
          </div>
          <div className="flex justify-center">
            {Mypage()}
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col">
              <div className="flex justify-center bg-white">
                <h1 className="flex justify-center">Messages</h1>
              </div>
              <div className="box-content bg-green-200 h-3/4 w-80 p-4 border-4 relative overflow-auto justify-center">
                <div>
                  {messagerender}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col">
              <div className="flex justify-center bg-white">
                <h1>Friends</h1>
              </div>
              <div className="box-content bg-green-200 h-3/4 w-80 p-4 border-4 relative overflow-auto justify-center">
                <div>
                  <UserFriendlist userpage={userpage} userData={userData} setFriend={setFriend}/>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}
export default UserProfile