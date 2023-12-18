
function FriendMessages({userData}){
    function handleClick(data){
        data.messages.map((data)=>console.log('hello'))
    }
    const friendList=userData.friends.map((data,index)=>(
        data.messages.map((data)=>(
        <div key={index}>
            <h3 onClick={()=>handleClick(data)}>{data.content}</h3>
        </div>
        ))
    ));
    const friendofList=userData.friend_of.map((data,index)=>(
        data.messages.map((data)=>(
        <div key={index}>
            <h3 onClick={()=>handleClick(data)}>{data.content}</h3>
        </div>
        ))
    ));
    return(
        <>
            {friendList}
            {friendofList}
        </>
    )
}
export default FriendMessages