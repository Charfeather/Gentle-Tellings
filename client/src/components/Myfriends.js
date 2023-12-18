

function MyFriendlist({userData}){
    function handleClick(data){
        data.messages.map((data)=>console.log('hello'))
    }
    const friendList=userData.friends.map((data,index)=>(
        <div key={index}>
            <h3 onClick={()=>handleClick(data)}>{data.username}</h3>
        </div>
    ));
    const friendofList=userData.friend_of.map((data,index)=>(
        <div key={index}>
            <h3 onClick={()=>handleClick(data)}>{data.username}</h3>
        </div>
    ));
    return(
        <>
            {friendList}
            {friendofList}
        </>
    )
}

export default MyFriendlist