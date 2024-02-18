import React from 'react';
let auth=localStorage.getItem('userdetails');
let userName;
if(auth){
  auth=JSON.parse(auth);
  console.warn(auth);
  userName=auth.name;
}

const Profile=()=>{
    return(
        <h1>Hello,Mr.{userName}</h1>
    )
}

export default Profile;