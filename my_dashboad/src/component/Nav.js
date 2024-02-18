import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  let auth = localStorage.getItem('userdetails');
  let name;
  let id;
  if(auth){
    console.warn("here  ",auth);
    auth=JSON.parse(auth);
     name=auth.name;
     id=auth._id;

  }
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/signup')
  }
  return (
    <div>
      <img className="logo" alt="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeDa2A9cIAfMAl_uCn61M2ar59YlRfogg-9AEf4CNqV0kW2ENTlRDy2IXWAr5NrX0lIvs"></img>
    { 
       auth?  <ul className="nav-ul">
        <li>
          <Link to="/"> Products </Link>
        </li>
        <li>
          <Link to="/add"> Add Products </Link>
        </li>
        {/* <li>
          <Link to="/update/:id"> Update Product </Link>
        </li> */}
        <li>
          <Link to="/profile"> Profile</Link>
        </li>
        
        <li><Link onClick={logout} to="/signup"> Logout ({name})</Link></li> 
        </ul>
         :<ul className=" nav-right nav-ul ">
            <><li><Link to="/signup"> SignUp</Link></li><li><Link to="/login"> Login</Link></li></>
          </ul>
      }
    </div>
  );
};

export default Nav;
