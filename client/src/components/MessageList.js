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
    const [reRender,setReRender]=useState(false)
    const [posted,setPosted]=useState(false)
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
        }).then(()=>{
            setPosted(!posted)
            setRender(!newrender)
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
    },[posted])
    const render=data.map((message)=>{
        return(
            <div className="py-2">
                <Messagerender posted={posted} setPosted={setPosted} reRender={reRender} setReRender={setReRender} key={message.id} message={message} userdata={userdata}/>
            </div>
        )
    })
    function handleClick(){
       setRender(!newrender)
       console.log(newrender)
    }
    if(newrender==false){
        //Message Form
        return(
            <div className="h-screen bg-stone-300">
                <div className="nav_menu">
                    <a href="/">Go Home</a>
                </div>
                <div>
                    <Button variant="outlined" onClick={handleClick}>Back to viewing messages</Button>
                </div>
                <div className="flex justify-center text-2xl font-mono font-black absolute inset-x-0 bottom-0 h-3/5">
                    <div>
                        <div className="neumorph_stone">
                            <div className="">
                                <h1 className="text-3xl font-bold flex justify-center">Say something someone needs to hear</h1>
                                <form onSubmit={formik.handleSubmit} className="flex justify-center">
                                <TextField className="bg-white w-52"
                                    id="content"
                                    label="What's on your mind?"
                                    variant="filled"
                                    value={formik.values.content}
                                    onChange={formik.handleChange}
                                />
                                <Button variant="contained" type="submit">Submit</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        //message list
        return(
            <div>
                    <div className="nav_menu">
                        <a href="/">Go Home</a>
                    </div>
                <div className="h-screen overflow-auto bg-stone-300">
                    <div>
                        <Button variant="outlined" onClick={handleClick}>Add your own message</Button>
                        <div className="flex justify-center">
                            <h1 className="text-2xl font-mono font-bold">Take a look at these messages {userdata.username}</h1>
                        </div>
                        <div className="flex justify-center">
                            <h3>You can click a message to leave a response</h3>
                        </div>
                    </div>
                    <div class='flex justify-center'>
                        <div className="flex flex-col">
                            <div className="flex justify-center bg-white">
                                <h1 className="text-3xl font-mono font-bold">MessageList</h1>
                            </div>
                            <div className="box-content bg-green-200 h-3/4 w-80 p-4 border-4 relative overflow-auto">
                                <div>
                                    {render}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MessageList