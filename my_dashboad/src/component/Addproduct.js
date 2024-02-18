import React from 'react';
import { useState } from 'react';

const Addproduct=()=>{
    let[name,setName]=useState();
    let[price,setPrice]=useState();
    let[category,setCategory]=useState();
    let[company,setCompany]=useState();
    const[error,setError]=useState(false);
    let auth = localStorage.getItem('userdetails');
    let userId;
    if(auth){
      auth=JSON.parse(auth);
      userId=auth._id;
    }

    const handleAddProduct=async()=>{
        console.warn(name,price,category,company);
        if(!name || !company || !category || !price){
            setError(true);
            return false;

        }

        // const userId=JSON.parse(localStorage.getItem("userdetails"))._id;
        // console.log("id",userId);
        let result=await fetch("http://localhost:5000/add-product",{
            method:'post',
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                "Content-Type":"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        }
        );
        result=await result.json();
       console.warn(result);
        setName("");
        setCategory("");
        setPrice("");
        setCompany("");
    }

    return(
        <div className='addProduct'>
            <h1>Add product</h1>
            <input className='inputbox' type="text" placeholder='Enter product Name'onChange={(e)=>setName(e.target.value)} value={name}></input>
            { error && !name &&  <span className='invalide-input'>Enter valide name</span>}

            <input className='inputbox' type="text" placeholder='Enter product Price' onChange={(e)=>setPrice(e.target.value)} value={price}></input>
            {error && !price && <span className='invalide-input'>Enter valide price</span>}
           
            <input className='inputbox' type="text" placeholder='Enter product Category' onChange={(e)=>setCategory(e.target.value)} value={category}></input>
            {error && !category &&  <span className='invalide-input'>Enter valide category</span>}

            <input className='inputbox' type="text" placeholder='Enter product Company' onChange={(e)=>setCompany(e.target.value)}value={company}></input>
            {error && !company && <span className='invalide-input1'>Enter valide company name</span>}

            <button className='sign-log' type="submit" onClick={handleAddProduct}>Add Product</button>
           
        </div>
    )
}


export default Addproduct;