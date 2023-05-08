import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import canadianFlag from '../assets/canadianFlag.png';
import bcFlag from '../assets/bcFlag.png';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  async function logOut() {
    
    await fetch("/logout");
    await setUser(null);
    navigate("/");
  }
  
  return (
    <header>
      <div className=" flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="">
         <div className=" normal-case my-[5%] sm:my-[10%] md:my-0">
         <div>
         <button className='flex flex-col font-bold md:text-lg lg:text-xl' >
     <Link className='hover:underline ' to="/"> Sustainable Hub </Link>
     </button>
     <p className='flex justify-start md:w-[100%] sm:w-[70%] md:w-[100%] text-xs sm:text-sm md:text-base font-normal'><span className=''>Eco-friendly Products & Services in Vancouver<img className='w-5 p-[1%] md:w-7 inline' src={bcFlag} alt='Canadian flag icon'/> </span></p>
         </div>
        
         </div>
        
         
        </div>
        <div className="">
          <ul className="menu menu-horizontal px-1">
            <li>
              {user ? (
                <Link
                  className="navBtn border-[1px] btn-outline hover:text-white-800 mx-2"
                  to="/profile"
                >
                  {user}
                </Link>
              ) : (
                <Link
                  className="navBtn border-[1px] btn-outline mx-2"
                  to="/login"
                >
                  Log In
                </Link>
              )}
            </li>
            {user && (
              <li className="items-center" onClick={logOut}>
                <button className="navBtn border-[1px] btn-outline mx-2">
                  Log Out
                </button>
              </li>
            )}
            {!user && (
              <li>
                <Link
                  className="navBtn border-[1px] btn-outline mx-2 "
                  to="/signup"
                >
                  Sign Up
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
