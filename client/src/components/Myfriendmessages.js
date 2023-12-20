
function FriendMessages({userData}){
    function handleClick(data){
        data.messages.map((data)=>console.log('hello'))
    }
    const friendList=userData.friends.map((d,index)=>(
        d.messages.map((data)=>(
        <div key={index}>
            <h3>{data.content}</h3>
            <p>By {d.username}</p>
        </div>
        ))
    ));
    const friendofList=userData.friend_of.map((d,index)=>(
        d.messages.map((data)=>(
        <div key={index}>
            <h3>{data.content}</h3>
            <p>By {d.username}</p>
        </div>
        ))
    ));
    return(
        <div>
            {friendList}
            {friendofList}
        </div>
    )
}
export default FriendMessages