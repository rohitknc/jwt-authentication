import { BrowserRouter as Router,Link,Route,Routes } from "react-router-dom";
import Login from "./login";
import Signin from "./signup.";
import Home from "./home";
import './header.css';
export default function Header()
{
    return (
        <>
        <Router>
           <div>
            <div class="uls">
            <ul>
              <li>
                <Link style={{textDecoration: 'none'}} to="/">Home</Link>
              </li>
              <li>
                <Link style={{textDecoration: 'none'}} to="/signup">SIGN UP</Link>
              </li>
              <li>
                <Link style={{textDecoration: 'none'}} to="/login">login</Link>
              </li>
            </ul>
            </div>
            <div class="load">
            <Routes>
                 <Route exact path='/' element={< Home/>}></Route>
                 <Route exact path='/login' element={<Login/>}></Route>
                 <Route exact path='/signup' element={<Signin/>}></Route>
          </Routes>
            </div>
            
            </div>
        </Router>
        </>
    )
}