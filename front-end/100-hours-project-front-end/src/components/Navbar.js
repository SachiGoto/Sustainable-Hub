import {Link} from 'react-router-dom'
// import { useEffect } from "react";
const Navbar = () =>{
  // let localStorageUserName = localStorage.getItem("user")


// console.log('nav bar triggered')
// console.log('props.user is ',localStorage.getItem('user'))


    return (
        <header>

            <ul className="navbar">
                <li className="navItem"><Link to ="/"> Sustainable Hub </Link></li>
                <li className="navItem"><Link to ="/main"> </Link></li>
                <li className="navItem"><Link to ="/main2"> </Link></li>
                <div className="navItem navItem-login-signup">
                <li className="navItem">
                {localStorage.getItem('user')? 
                <Link to ="/profile"> {localStorage.getItem('user')}'s profile </Link>
                :<Link to ="/login"> Log In </Link>
               }
                </li>
               { !localStorage.getItem('user') &&<li className="navItem"><Link to ="/signup">  Sign Up </Link></li> }
                </div>
                
               
            </ul>
        </header>
    )
}

export default Navbar