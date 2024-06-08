import React, { useContext, useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios"

const Login = ({ setShowLogin }) => {
const {url,setToken}=useContext(StoreContext)

  const [currentState, setCurrentState] = useState("sign Up");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  
  const onLogin=async (e)=>{
    e.preventDefault()
   
    let newUrl=url;
    if(currentState==="Login"){
        newUrl+="/api/user/login"
    }
     else{
        newUrl+="/api/user/register"
     }

       const response=await axios.post(newUrl,data);

       if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token)

        setShowLogin(false)
        
       }else{
        alert(response.data.message)
       }
  }
 
  return (
    <div className="login-popup">
      <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-input">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
            />
          )}

          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currentState === "sign Up" ? "create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Praesentium, ratione.
          </p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account!{" "}
            <span onClick={() => setCurrentState("sign up")}>click here</span>
          </p>
        ) : (
          <p>
            Already have an account{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
