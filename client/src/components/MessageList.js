import { Button,TextField } from "@mui/material"
import { useEffect, useState } from "react"
import React from "react"
import Navbar from "./Navbar"
import { useLocation } from "react-router-dom"
import { useFormik } from "formik"
import Messagerender from "./Messagerender"

function MessageList(){
    const [data,setData]=useState([])
    const [newrender,setRender]=useState(true)
    const location=useLocation()
    const userdata=location.state
    const formik=useFormik({
        initialValues:{
            content:'',
            made_by_user_id:userdata.id
        },
      onSubmit:(values)=>{
        const endpoint='/messages'
        console.log(values)
        fetch(endpoint,{
          method:'POST',
          headers:{
            "Content-Type":'application/json'
          },
          body:JSON.stringify(values)
        })
      }})
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const response=await fetch('/messages')
                const data=await response.json()
                setData(data)
            }catch(error){console.error("error",error)}
        }
        fetchData()
    },[])
    const render=data.map((message)=>{
        return(
            <Messagerender key={message.id} message={message} userdata={userdata}/>
        )
    })
    function handleClick(){
       setRender(!newrender)
       console.log(newrender)
    }
    if(newrender==false){
        //Message Form
        return(
            <div>
            <div className="nav_menu">
                <a href="/">Go Home</a>
            </div>
            <div>
            <Button variant="outlined" onClick={handleClick}>Back to viewing messages</Button>
            </div>
            <h1>Say something someone wants to hear *it would be cool if this was random*</h1>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                id="content"
                label="Write whats on your mind"
                variant="filled"
                value={formik.values.content}
                onChange={formik.handleChange}
              />
              <Button variant="contained" type="submit">Submit</Button>
            </form>
        </div>
        )
    }else{
        //message list
        return(
            <div>
                <div>
                <div>
            <div className="nav_menu">
                <a href="/">Go Home</a>
            </div>
        </div>
                <Button variant="outlined" onClick={handleClick}>Add your own message</Button>
                </div>
                <h1>Take a look at these messages {userdata.username}</h1>
                {render}
            </div>
        )
    }
}
export default MessageList