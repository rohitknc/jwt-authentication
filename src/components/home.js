import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
 export default function Home()
{
    let [auth,setauth]=useState(false);
    let [name,setname]=useState("");
    let [m,sm]=useState("");
    let navigate=useNavigate();
    useEffect(()=>
    {
       try{
               axios.get('http://localhost:2001')
               .then((res)=>
               {
                console.log(res);
                if(res.data.status=="succeess")
                {
                   setauth(true);
                   setname(res.data.name);
                }
                else
                {
                    setauth(false);
                    sm(res.data.err);
                }
               })
       }
       catch(err)
       {

       }
    },[])
function deletecookie()
{
    try{
           axios.get("http://localhost:2001/logout").then((res)=>console.log(res));
           navigate("/login");
    }
    catch(err)
    {

    }
}
    return (
        <>
       {
        auth?
        <div>
              <p> you are autherized person---- {name}</p>
              <button onClick={()=>
            {
                
                deletecookie();
            }}>logout now</button>


        </div>
        :
        <div>
            <p>{m}</p>
            <p>you are not authrized 
            </p>
            <Link to="/login">login now</Link>
        </div>
       }
        </>
    )
}