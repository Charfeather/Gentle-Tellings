import { Link } from "react-router-dom"
import MessageList from "./MessageList"
import { useState } from "react"


function Navbar({user,setUser}){
    return(
        <div>
            <div className="nav_menu">
                <Link to="/message-list" state={user}>Message list</Link>
                <Link to="/search" state={user}>User Search</Link>
                <Link to="/my-profile" state={user}>My profile</Link>
                <a href="/">Home</a>
            </div>
        </div>
    )
}
export default Navbar