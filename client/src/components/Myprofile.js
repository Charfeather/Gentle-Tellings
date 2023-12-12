import { Button } from "@mui/material"
import Navbar from "./Navbar"

function Myprofile(){
    function logOut(){
        fetch('/logout',{
          method:'DELETE'
        }).then((resp)=>{
          if (resp.ok){
            //handle logout on front end
            //setUser(null)
            //or navigate to another route
          }
        })
      }
    return(
        <div>
            <h1>My Profile</h1>
            <div>
                <Button variant="contained" onClick={logOut}>Log Out</Button>
                <Navbar/>
            </div>
        </div>
    )
}
export default Myprofile