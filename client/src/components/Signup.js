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
        <div className="bg-stone-300 h-screen">
            <Button onClick={togglesignup}>{signup ? 'Login' : 'Register'}</Button>
            <h1 className="flex justify-center font-bold font-mono text-2xl">{signup ? 'Welcome' : 'Welcome back'} to gentle tellings, please {signup ? 'make an account' : 'Sign in'}</h1>
            <div className="flex justify-center">
                <div className="neumorph_stone w-2/4">
                    <div className="flex justify-center">
                        <form onSubmit={formik.handleSubmit}>
                            <div>  
                                <TextField 
                                    id="username" 
                                    label="Username" 
                                    variant="filled"
                                    required
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div>
                                <TextField 
                                    id="password" 
                                    label="Password"
                                    variant="filled"
                                    type="password"
                                    required
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div>
                                {signup && <TextField 
                                    id="password-confirm" 
                                    type="password"
                                    label="Confirm Password"
                                    variant="filled"
                                    required
                                    //doesnt need handle change or value because it just confirms
                                />}
                            </div>
                            <div>
                                <Button variant="contained" type="submit">submit</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
                <div className="flex flex-col justify-center">
                    <div className="flex justify-center">
                        <h1 className="font-mono font-bold text-lg">What is Gentle Words and why do I need an account?</h1>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex justify-center w-3/5">
                            <h1 className="font-mono text-center">Many individuals struggle to open up and share their thoughts with others, often due to concerns about revealing vulnerabilities or being perceived as unconventional. Gentle Words is a website designed to provide a platform for users to express thoughts they may find challenging to share with those in their immediate surroundings. Beyond being a space to disclose fears and insecurities, Gentle Words also serves as a platform to share triumphs and inspire others to persevere. By creating an account, you become an integral part of this supportive community, and we are delighted to welcome you aboard.</h1>
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default Signup