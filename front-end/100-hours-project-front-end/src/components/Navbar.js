import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Navbar = ({user, setUser}) =>{
    const navigate = useNavigate();
    async function logOut() {
    
        await fetch("/logout");
        await setUser(null);
         navigate("/");
     }

    return (
       
       
        <header>
            <ul className="navbar">
                <li className="navItem"><Link to ="/"> Sustainable Hub </Link></li>
                <li className="navItem"><Link to ="/main"> </Link></li>
                <li className="navItem"><Link to ="/main2"> </Link></li>
                <div className="navItem navItem-login-signup">
                <li className="navItem">
                {user? 
                <Link to ="/profile"> {user}'s profile </Link>
                :<Link to ="/login"> Log In </Link>}
                </li>
                </div>
                {user && <li className="my-2 h-10 px-6 font-semibold rounded-md" onClick={logOut}>
                Log Out </li>}

               { !user && <li className="navItem"><Link to ="/signup">  Sign Up </Link></li> }
                
            </ul>
        </header>
    )
}

export default Navbar