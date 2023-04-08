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
         <div className="navbar">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl"><Link to ="/"> Sustainable Hub </Link></a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
    <li>
                {user? 
                <Link className='btn  btn-outline btn-ghost mx-2' to ="/profile"> {user} </Link>
                :<Link className='btn  btn-outline btn-ghost mx-2' to ="/login"> Log In </Link>}
                </li>

                {user && <li className="items-center" onClick={logOut}>
                <button className='btn btn-outline btn-ghost mx-2'>Log Out</button> </li>}

               { !user && <li><Link className='btn  btn-outline btn-ghost mx-2 ' to ="/signup">  Sign Up </Link></li> }
    </ul>
  </div>
</div>
            {/* <ul className="navbar prose">
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
                
            </ul> */}
        </header>
    )
}

export default Navbar