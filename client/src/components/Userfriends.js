

import React from 'react';

function UserFriendlist({ userpage, userData, setFriend }) {
    if (userpage !== null && userpage !== undefined) {
      function checkFriend() {
        const isFriendOf = userpage.friend_of.some((friend) => friend.username === userData.username);
        const isFriend = userpage.friends.some((friend) => friend.username === userData.username);
        if (isFriendOf) {
          console.log('yes1');
          setFriend(true)
        }
        if (isFriend) {
          console.log('yes2');
          setFriend(true)
        }
        if (!isFriendOf && !isFriend) {
          console.log('no');
          setFriend(false)
        }
      }
      checkFriend();
  
      const friendUsernames = [
        ...userpage.friend_of.map((data) => data.username),
        ...userpage.friends.map((data) => data.username)
      ];
  
      const friendList = friendUsernames.map((username, index) => (
        <div key={index} className='flex justify-center font-mono'>
          <h3>{username}</h3>
        </div>
      ));
  
      console.log('Hello im not null');
      return (
        <>
          {friendList}
        </>
      );
    } else {
      return <h2>HI</h2>;
    }
  }
  
  export default UserFriendlist;