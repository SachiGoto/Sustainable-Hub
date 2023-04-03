import {Link} from 'react-router-dom'

const Navbar = (userName) =>{

  const localStorageUserName = localStorage.getItem("user");
  console.log(localStorageUserName)
  let user = userName.user; 
  let isUser = false;
  if(user !== null){
    isUser = true;
  }




    return (
        <header>

            <ul className="navbar">
                <li className="navItem"><Link to ="/"> Sustainable Hub </Link></li>
                <li className="navItem"><Link to ="/main"> </Link></li>
                <li className="navItem"><Link to ="/main2"> </Link></li>
                <div className="navItem navItem-login-signup">
                <li className="navItem">
                {localStorageUserName? 
                <Link to ="/profile"> {localStorageUserName}'s profile </Link>
                :<Link to ="/login"> Log In </Link>
               }
                </li>
               { !localStorageUserName &&<li className="navItem"><Link to ="/signup">  Sign Up </Link></li> }
                </div>
                
               
            </ul>
        </header>
    )
}

export default Navbar