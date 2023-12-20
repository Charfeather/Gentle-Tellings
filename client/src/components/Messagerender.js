import { useEffect, useState } from "react"
import { Button } from "@mui/material"
import { useFormik } from "formik"
import {TextField} from "@mui/material"

function Messagerender({message,userdata,reRender,setReRender,posted,setPosted}){
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
                setReRender(!reRender)
                setPosted(!posted)
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
                    setResponses(false)
                    setPosted(!posted)
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
            }).then(()=>{
                setPosted(!posted)
            })
        }
        function handleClick(){
            setResponses(!showResponses)
        }
        const responses=message.responses.map((data)=>{
            return <h3 key={data.id} className="flex justify-center">{data.content}</h3>
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
                        <h1 key={message.id} onClick={handleClick} className="flex justify-center font-mono font-bold text-lg">{message.content}</h1>
                        <p className="flex justify-center">You made this one</p>
                        <div>
                            <h2 className="flex justify-center font-semibold underline">Responses</h2>
                            {responses}
                            <div className="flex justify-center">
                                <form onSubmit={responsemaker.handleSubmit} className="flex justify-center bg-white w-60">
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
                    </div>
                )
            }
            return(
                <div>
                    <h1 key={message.id} onClick={handleClick} className="flex justify-center text-lg font-mono font-bold">{message.content}</h1>
                    <p className="flex justify-center">You made this one</p>
                    <div className="flex justify-center">  
                        <Button variant="outlined" size="small" onClick={handleEdit}>Edit me</Button>
                        <Button variant="outlined" size="small" onClick={handleDelete}>Delete me</Button>
                    </div>
                </div>  
            )
        }
        if(showResponses==true){
            return(
                <div>
                    <h1 key={message.id} onClick={handleClick} className="flex justify-center font-mono font-bold text-lg">{message.content}</h1>
                    <p className="flex justify-center">Made by {message.user.username}</p>
                    <div>
                        <h2 className="flex justify-center font-semibold underline">Responses</h2>
                        {responses}
                        <div className="flex justify-center">
                            <form onSubmit={responsemaker.handleSubmit} className="flex justify-center bg-white w-60">
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
                </div>  
            )
        }
        return(
            <div>
                <h1 key={message.id} onClick={handleClick} className="flex justify-center font-mono font-bold text-lg">{message.content}</h1>
                <p className="flex justify-center">Made by {message.user.username}</p>
            </div>
        )
}
export default Messagerender