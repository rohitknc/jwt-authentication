import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
const app=express();
app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST"],
    credentials:true
}
));
app.use(cookieParser());
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"Knc@9177",
    database:"auth"
});
let salt=10;
db.connect(function(err){
if(err){
    console.log("not connected");
}
else{
 console.log("connected successfully......");
}
});
app.listen(2001,()=>
{
    console.log("server is listening at 2076");
})
app.get("/logout",(req,res)=>
{
    res.clearCookie('token');
    return res.json({status:"succeed"});

})
const vuser=(req,res,next)=>
{
const token=req.cookies.token;
if(!token)
{
    return res.json({Error:"token is not ok"}); 
}
else{
    jwt.verify(token,'knc kanjarla',(err,dc)=>
    {
        if(err)
        {
            return res.json({Error:"token is not ok"}); 
        }
        else{
            req.name=dc.name;
            next();
        } 
    })
}
}

app.get("/",vuser,(req,res)=>
{
     return res.json({status:"succeess",name:req.name});
}
)
app.post('/pdata',(req,res)=>
{
   let data=req.body;
    bcrypt.hash(req.body.password.toString(),salt,(err,hash)=>
    {
        if (err)
        return err;
        db.query('insert into signup values(?,?,?,?)',[data.email,data.name,data.pnum,hash],(err,result)=>
        {

            if(err) return res.json({Error:"insertion doesnt completed"});
            return res.json({status:"submitted"});
        })
    })
});
app.post('/login',(req,res)=>
{
    console.log("hi hello");
    let sql="select * from signup where email=?";
    db.query(sql,[req.body.email],(err,result)=>
    {
        if (err)
        {
         return  res.json({Error:"error raised "});
        }
        console.log(result.length);
        if(result.length>0)
        {
            bcrypt.compare(req.body.password.toString(),result[0].pass,(err,resp)=>{
            if (err)
            {
                console.log(err);
             return res.json({Error:"incorrect password  "});
            }
            if(resp)
            {
                const name=result[0].name;
                const tkn=jwt.sign({name},'knc kanjarla',{expiresIn:'1d'});
                console.log(tkn);
                res.cookie("token",tkn);
                return res.json({submit:"success"});
            }
            else
            {
                return res.json({Error:"incorrect password  "});
            }
        }
            )
        }
        else{
            return res.json({Error:"password does not match"});
        }
    })
})