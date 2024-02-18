import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
let auth

const ProductList = () => {
    const [products, setProducts] = useState
    ([]);
    const[key,setKey]=useState();
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
        auth = localStorage.getItem('userdetails');
        if(auth){
        auth=JSON.parse(auth);
         auth=auth._id;
        setKey(auth);
    }
    },[])

    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/product",{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deletProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product-delet/${id}`, {
            method: "Delete",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            getProducts();
            //  alert("record deleted")
        }
    };

    const editProduct = (id) => {
        navigate(`./update/${id}`);
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`,{ headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }});

            result = await result.json();
            if (result) {
                setProducts(result);
            }
        }
        else{
            getProducts();
        }

    }
    console.log("products", products);
    
    return (
        <div className='product-list'>
            <h3>Product List</h3>
            <input className='search' type='search' placeholder='Search Product' onChange={searchHandle}></input>
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
               products.length? products.map((item, index) =>
               (key===item.userId) &&<ul>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>${item.price}</li>
                        <li>{item.category}</li>
                        <li><button className='delet-edit' onClick={() => deletProduct(item._id)}>Delet</button>
                            <button className='delet-edit' onClick={() => editProduct(item._id)}>Edit</button></li>
                    </ul>
                    
                )
           :<h1>No result found</h1> }
        </div>
    )
}

export default ProductList;