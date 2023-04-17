import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
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
          <button className="btn btn-ghost normal-case text-lg">
            <Link to="/"> Sustainable Hub </Link>
          </button>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              {user ? (
                <Link
                  className="navBtn btn  btn-outline btn-ghost mx-2"
                  to="/profile"
                >
                  {user}
                </Link>
              ) : (
                <Link
                  className="navBtn btn  btn-outline btn-ghost mx-2"
                  to="/login"
                >
                  Log In
                </Link>
              )}
            </li>
            {user && (
              <li className="items-center" onClick={logOut}>
                <button className="navBtn btn btn-outline btn-ghost mx-2">
                  Log Out
                </button>
              </li>
            )}
            {!user && (
              <li>
                <Link
                  className="navBtn btn  btn-outline btn-ghost mx-2 "
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
