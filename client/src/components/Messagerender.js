import { useState } from "react"
import { Button } from "@mui/material"
import { useFormik } from "formik"
import {TextField} from "@mui/material"

function Messagerender({message,userdata}){
    const [editmode,setEditMode]=useState(false)
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
                console.log(response)
                console.log(editmode)
                setEditMode(!editmode)
            }
        })
      }})
        function handleEdit(){
            setEditMode(!editmode)
            if(editmode===true){
                console.log(`${message.id}'s edit mode is on`)
            }
            else if(editmode===false){
                console.log(`${message.id}'s edit mode is off`)
            }
        }
        function handleDelete(){
            fetch(`/messages/${message.id}`,{
                method:'DELETE'
            })
        }
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
                    </form>
                )
            }
            return(
            <div>
                <h1 key={message.id}>{message.content}</h1>
                <p>made by you</p>
                <Button variant="outlined" onClick={handleEdit}>Edit me</Button>
                <Button variant="outlined" onClick={handleDelete}>Delete me</Button>
            </div>  
            )
        }
        return(
            <div>
                <h1 key={message.id}>{message.content}</h1>
                <p>made by {message.user.username}</p>
            </div>
        )
}
export default Messagerender