import UserFriendlist from "./Userfriends"
import Usermessage from "./Usermessagerender"
import { Button } from "@mui/material"
import { useState } from "react"

function UserProfile({userpage,userData}){
  const [friend,setFriend]=useState(false)
    const messagerender=userpage.messages.map((message)=>{
        return(
          <Usermessage key={message.id}message={message}/>
        )
      })
      function handlefriend(){
        console.log(`Hello ${userData.username} I am ${userpage.username} we are friends now`)
        fetch(`/add_friend/${userData.id}/${userpage.id}`,{
          method:'POST',
        })
      }
      function handledelete(){
        console.log(`Hi ${userpage.username},this is ${userData.username} we cant be friends anymore`)
        fetch(`/delete_friend/${userData.id}/${userpage.id}`,{
          method:'DELETE'
        })
        fetch(`/delete_friend/${userpage.id}/${userData.id}`,{
          method:'DELETE'
        })
      }
    function mypage(){
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
        <div>
        <h1>Welcome to {userpage.username}'s page</h1>
        <div className="nav_menu">
            <a href="/search">Back to search</a>
            <a href="/">Home</a>
        </div>
          <div>
            {mypage()}
          </div>
            <h1>Messages</h1>
            {messagerender}
            <h1>Friends</h1>
            <UserFriendlist userpage={userpage} userData={userData} setFriend={setFriend}/>
      </div>
    )
}
export default UserProfile