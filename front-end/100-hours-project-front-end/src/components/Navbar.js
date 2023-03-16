import {Link} from 'react-router-dom'

const Navbar = (userName) =>{

  
  let user = userName.user; 
  let isUser = false;
  if(user !== null){
    isUser = true;
  }


    return (
        <header>

            <ul className="navbar">
                <li className="navItem"><Link to ="/"> Sustainable Hub </Link></li>
                
                <div className="navItem navItem-login-signup">
                <li className="navItem">
                {isUser? 
                <Link to ="profile"> {user}'s profile </Link>
                :<Link to ="login"> Log In </Link>
               }
                </li>
               { !isUser &&<li className="navItem"><Link to ="signup">  Sign Up </Link></li> }
                </div>
                
               
            </ul>
        </header>
    )
}

export default Navbar