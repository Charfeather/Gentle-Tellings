import { Button } from "@mui/material"

function Userpage({user}){
    function handleClick(){
        console.log(`${user.username} was clicked`)
    }
    return(
        <div>
            <h1 onClick={handleClick}>{user.username}</h1>
            <Button variant="outlined">Add Friend</Button>
        </div>
    )
}
export default Userpage