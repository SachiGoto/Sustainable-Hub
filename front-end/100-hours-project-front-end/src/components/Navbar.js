import {Link} from 'react-router-dom'

const Navbar = () =>{
    return (
        <header>

            <ul className="navbar">
                <li className="navItem"><Link to ="/"> Sustainable Hub </Link></li>
                <div className="navItem navItem-login-signup">
                    <li className="navItem"><Link to ="login"> Log In </Link></li>
                    <li className="navItem"><Link to ="signup">  Sign Up </Link></li>
                </div>
                
               
            </ul>
        </header>
    )
}

export default Navbar