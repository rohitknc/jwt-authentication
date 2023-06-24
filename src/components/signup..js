import React from "react";
import './signup.css';
import axios from "axios";
import { useState } from "react";


 export default function Signin()
{
    let [data,setdata]=useState({email:" ",name:" ",pnum:" ",password:" "
}); 

 async function handleinput(e)
{ 
    e.preventDefault();
    try{
   let v=await axios.post("http://localhost:2001/pdata",data)
    .then((res)=>console.log(res))
    .then((err)=>console.log(err));  
    }
    catch(err)
    {
        console.log(err);
    }
}
    return (
        <>
        <div class="main1">
            <form onSubmit={(e)=>
            {
                handleinput(e);
            }}>
           <div class="login1">
            <h3>signup</h3>
            <div class="email1">
                 <label>email:</label>
                 <input type="text" name="email" placeholder="enter email" onChange={(e)=>
                {
                      setdata((prev)=>
                      {
                         return {...prev,email:e.target.value}
                      })
                }}/>
            </div>
            <div class="name">
                 <label>name:</label>
                 <input type="text" name="password" placeholder="enter name" onChange={(e)=>
                {
                      setdata((prev)=>
                      {
                         return {...prev,name:e.target.value}
                      })
                }}/>
            </div>
            <div class="pnum">
                 <label>phone:</label>
                 <input type="text" name="password" placeholder="enter phone numbber" onChange={(e)=>
                {
                      setdata((prev)=>
                      {
                         return {...prev,pnum:e.target.value}
                      })
                }}/>
            </div>
            <div class="password1">
                 <label>password:</label>
                 <input type="password" name="password" placeholder="enter password" onChange={(e)=>
                {
                      setdata((prev)=>
                      {
                         return {...prev,password:e.target.value}
                      })
                }}/>
            </div>
            <div class="sub">
                <button>submit</button>
            </div>
           </div>
           </form>
        </div>
        </>
    )
}