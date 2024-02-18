import {React,useState,useEffect} from 'react'
import { useNavigate} from 'react-router-dom';

const SignUp=()=>{
    const [name,setName]=useState("");
    const [password,setPasswod]=useState("");
    const [email,setEmail]=useState("");
    const nevigate=useNavigate();
    
    useEffect(()=>{
      const auth=localStorage.getItem('userdetails');
      if(auth){
        nevigate('/')
      }
    },[])

    const collectData=async()=>{
     // console.warn(name,email,password);
      let result = await fetch('http://localhost:5000/signup',
      {
        method:'post',
        body:JSON.stringify({name,email,password}),
        headers:{
            'Content-Type':'application/json'
        },
      });

      result = await result.json();
      console.warn(result);
      if(result){
        nevigate('/')
      }
      localStorage.setItem("userdetails",JSON.stringify(result.result));
      localStorage.setItem("token",JSON.stringify(result.auth));
      
    }
    return(
        <div className='signup'>
            <h1>Register</h1>
            <input className='inputbox' type='text' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}></input>
            <input className='inputbox' type='text' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <input className='inputbox' type='password' placeholder='Enter Password'  value={password} onChange={(e)=>setPasswod(e.target.value)}></input>
            <button className='sign-log' type='button' onClick={collectData}>SignUp</button>
        </div>
    )
}

export default SignUp;