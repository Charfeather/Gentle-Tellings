import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { useFormik } from "formik";

function HourlyMessage({message,user}){
    const [change,setchange]=useState(false)
    const formik=useFormik({
        initialValues:{
            content:'',
            made_by_user_id:user.id
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
            //navigate("/message-list")
        }
    })
    const respForm=useFormik({
        initialValues:{
            content:'',
            user_id:`${user.id}`,
            message_id:`${message.id}`
        },
        onSubmit:(values)=>{
            const endpoint='/response'
            console.log(message.id)
            console.log(values)
            fetch(endpoint,{
                method:'POST',
                headers:{
                    "Content-Type":'application/json'
                },
                body:JSON.stringify(values)
            })
        }
    })
    function handleClick(){
        setchange(!change)
        console.log(change)
    }
    if(change==false){
        //adding response
        return(
            <div>
                <h1>Welcome to Gentle words, here is a random message!</h1>
                <div>
                    <h1>{message.content}</h1>
                </div>
                <div>
                    <form onSubmit={respForm.handleSubmit}>
                        <TextField
                            id='content'
                            label='Leave a response'
                            variant="filled"
                            value={respForm.values.content}
                            onChange={respForm.handleChange}
                            />
                        <Button variant="contained" type="submit">Send your Response</Button>
                    </form>
                </div>
                <div>
                    <Button variant='outlined' onClick={handleClick}>add a message instead</Button>
                </div>
            </div>
        )
    }else{
        //adding message
        return(
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        id='content'
                        label='whats on your mind'
                        variant="filled"
                        value={formik.values.content}
                        onChange={formik.handleChange}
                        />
                    <Button variant="contained" type="submit">Share your thoughts</Button>
                </form>
                <div>
                    <Button variant='outlined' onClick={handleClick}>Hourly Messsage</Button>
                </div>
            </div>
        )
    }
}
export default HourlyMessage