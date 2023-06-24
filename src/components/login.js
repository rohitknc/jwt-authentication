import React from "react";
import './login.css';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 export default function Login()
{
    let [d,sd]=useState({email:"",password:""});
    let navigate=useNavigate();
    axios.defaults.withCredentials=true;
   async function handleinput(e)
    {
        e.preventDefault();
        console.log(d);
        try{
            let v=  await axios.post("http://localhost:2001/login",d)
            .then((res)=>
            {
                console.log(res);
                if(res.data.submit=='success')
                {
                        navigate('/');
                }
                else
                {
                    alert(res.data.Error);
                }
            }).then((err)=>console.log(err));
        }
        catch(err)
        {
            console.log(err);
        }
    }
    return (
        <>
        <div class="main">
            <form onSubmit={(e)=>
            {
                handleinput(e);
            }}>
           <div class="login">
            <h3>login</h3>
            <div class="email">
                 <label>email:</label>
                 <input type="text" name="email" placeholder="enter email" onChange={(e)=>
                {
                      sd((prev)=>
                      {
                         return {...prev,email:e.target.value}
                      })
                }}/>
            </div>
            <div class="password">
                 <label>password:</label>
                 <input type="password" name="password" placeholder="enter password" onChange={(e)=>
                {
                      sd((prev)=>
                      {
                         return {...prev,password:e.target.value}
                      })
                }}/>
            </div>
            <div>
                <button>login here</button>
            </div>
           </div>
           </form>
        </div>
        </>
    )
}