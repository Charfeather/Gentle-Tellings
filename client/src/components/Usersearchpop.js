function Userpage({user, setPage}){
    function handleClick(){
        setPage(user)
    }
    return(
        <div>
            <h1 onClick={handleClick}>{user.username}</h1>
        </div>
    )
}
export default Userpage