import { useState } from "react"
import { Button } from "@mui/material"
import { useFormik } from "formik"
import {TextField} from "@mui/material"

function Messagerender({message,userdata}){
    const [editmode,setEditMode]=useState(false)
    const [showResponses,setResponses]=useState(false)
    const formik=useFormik({
        initialValues:{
            content:'',
            made_by_user_id:userdata.id
        },
      onSubmit:(values)=>{
        const endpoint=`/messages/${message.id}`
        console.log(values)
        fetch(endpoint,{
          method:'PATCH',
          headers:{
            "Content-Type":'application/json'
          },
          body:JSON.stringify(values)
        }).then((response)=>{
            if(response.ok){
                //console.log(response)
                //console.log(editmode)
                setEditMode(!editmode)
            }
        })
      }})
    const responsemaker=useFormik({
        initialValues:{
            content:'',
            message_id:`${message.id}`,
            user_id:`${userdata.id}`
        },
        onSubmit:(values)=>{
            const endpoint='/responses'
            console.log(values)
            fetch(endpoint,{
                method:'POST',
                headers:{
                    "Content-Type":'application/json'
                },
                body:JSON.stringify(values)
            }).then((response)=>{
                if(response.ok){
                    console.log('worked')
                }
            })
        }
    })
        function handleEdit(){
            setEditMode(!editmode)
            //if(editmode===true){
           //     console.log(`${message.id}'s edit mode is on`)
           // }
           // else if(editmode===false){
            //    console.log(`${message.id}'s edit mode is off`)
            //}
        }
        function handleDelete(){
            fetch(`/messages/${message.id}`,{
                method:'DELETE'
            })
        }
        function handleClick(){
            setResponses(!showResponses)
        }
        const responses=message.responses.map((data)=>{
            return <h3 key={data.id}>{data.content}</h3>
        })
        if(message.user.id==userdata.id){
            if(editmode===true){
                return(
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            id="content"
                            label="Write whats on your mind"
                            variant="filled"
                            value={formik.values.content}
                            onChange={formik.handleChange}
                        />
                        <Button variant="contained" type="submit">Submit</Button>
                        <Button variant="contained" onClick={handleEdit}>Cancel</Button>
                    </form>
                )
            }
            if(showResponses==true){
                return(
                    <div>
                        <h1 key={message.id} onClick={handleClick}>{message.content}</h1>
                        <p>You made this one</p>
                        <div>
                            <h2>Responses</h2>
                            {responses}
                            <form onSubmit={responsemaker.handleSubmit}>
                                <TextField
                                id='content'
                                label='add a response'
                                value={responsemaker.values.content}
                                onChange={responsemaker.handleChange}
                                />
                                <Button variant="contained" type="submit">Submit</Button>
                            </form>
                        </div>
                    </div>
                )
            }
            return(
                <div>
                    <h1 key={message.id} onClick={handleClick}>{message.content}</h1>
                    <p>You made this one</p>
                    <Button variant="outlined" onClick={handleEdit}>Edit me</Button>
                    <Button variant="outlined" onClick={handleDelete}>Delete me</Button>
                </div>  
            )
        }
        if(showResponses==true){
            return(
                <div>
                    <h1 key={message.id} onClick={handleClick}>{message.content}</h1>
                    <p>Made by {message.user.username}</p>
                    <div>
                        <h2>Responses</h2>
                        {responses}
                        <form onSubmit={responsemaker.handleSubmit}>
                            <TextField
                            id='content'
                            label='add a response'
                            value={responsemaker.values.content}
                            onChange={responsemaker.handleChange}
                            />
                            <Button variant="contained" type="submit">Submit</Button>
                        </form>
                    </div>
                </div>  
            )
        }
        return(
            <div>
                <h1 key={message.id} onClick={handleClick}>{message.content}</h1>
                <p>Made by {message.user.username}</p>
            </div>
        )
}
export default Messagerender