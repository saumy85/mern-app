import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [category, setCategory] = useState();
    const [company, setCompany] = useState();
    const params = useParams();
     console.log("params",params);
    const navigate = useNavigate();
    let auth = localStorage.getItem('userdetails');
    if(auth){
    auth=JSON.parse(auth);
     auth=auth._id;}
    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        //console.warn("params",`${params.id}`);
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company)
    }

    const updateProduct = async (id) => {

        console.warn(`http://localhost:5000/prd/${id}`);

        let result = await fetch(`http://localhost:5000/prd/${id}`, {
            method: 'Put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': "application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        navigate('/');
        console.log(result);
    }

    return (
        <div className='addProduct'>
            <h1>Update product</h1>
            <input className='inputbox' type="text" placeholder='Enter product Name' onChange={(e) => setName(e.target.value)} value={name}></input>

            <input className='inputbox' type="text" placeholder='Enter product Price' onChange={(e) => setPrice(e.target.value)} value={price}></input>


            <input className='inputbox' type="text" placeholder='Enter product Category' onChange={(e) => setCategory(e.target.value)} value={category}></input>

            <input className='inputbox' type="text" placeholder='Enter product Company' onChange={(e) => setCompany(e.target.value)} value={company}></input>

            <button className='sign-log' type="submit" onClick={()=>updateProduct(params.id)}>Update Product</button>

        </div>
    )
}


export default UpdateProduct;