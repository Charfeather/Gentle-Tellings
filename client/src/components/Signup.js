import { useState } from "react";
import {FormControl, TextField, Button,InputLabel} from '@mui/material'
import {useFormik} from 'formik'
import * as yup from 'yup'

function Signup({setUser}){

    const signupSchema= yup.object().shape({
        username:yup.string().min(5, 'Too short').max(25, 'Too long').required('Required') ,
        password:yup.string().min(5,'Too Short').required('Required')
    })

    const [signup,setSignup]=useState(true)

    const formik=useFormik({
        initialValues:{
            username:'',
            password:''
        },
        validationSchema:signupSchema,
        onSubmit: (values)=>{
            const endpoint = signup ? '/users' : '/login'
            console.log(values)
            fetch(endpoint,{
                method:'POST',
                headers:{
                    "Content-Type":'application/json'
                },
                body: JSON.stringify(values)
            }).then((resp)=>{
                if (resp.ok){
                    resp.json().then(({user})=>{
                    setUser(user)
                    console.log(user.username)
                    //navigate into site
                })
                }else{
                    console.log('errors? handle them')
                }
            })
        }
    });
    //formik errors can be seen with formik.errors

    function togglesignup(){
        setSignup((currentSignup)=>!currentSignup)
    }

    return(
        <div>
            <Button onClick={togglesignup}>{signup ? 'Login' : 'Register'}</Button>
            <form onSubmit={formik.handleSubmit}>
                <TextField 
                    id="username" 
                    label="Username" 
                    variant="filled"
                    required
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    />
                <TextField 
                    id="password" 
                    label="Password"
                    variant="filled"
                    type="password"
                    required
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    />
                {signup && <TextField 
                    id="password-confirm" 
                    type="password"
                    label="Confirm Password"
                    variant="filled"
                    required
                    //doesnt need handle change or value because it just confirms
                    />}
                
                <Button variant="contained" type="submit">submit</Button>
            </form>
        </div>
    )
}
export default Signup