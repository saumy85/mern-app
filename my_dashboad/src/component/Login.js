import react from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nevigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("userdetails");
    if (auth) {
      nevigate("/");
    }
  },[]);

  const handleLogin = async () => {
    console.warn(email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.warn("login",result);
     if(result.auth){
      localStorage.setItem("userdetails",JSON.stringify(result.user));
      localStorage.setItem("token",JSON.stringify(result.auth));
        nevigate("/");
    }else{
        alert("please enter valide details");
    }
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <input
        className="inputbox"
        type="text"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      ></input>
      <input
        className="inputbox"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      ></input>
      <button className="sign-log" type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
