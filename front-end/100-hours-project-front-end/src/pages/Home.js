import { Link } from "react-router-dom";
import logo from "../assets/person.png";



const Home = () => {

 
 
  return (
    <>


    <div className="home">
      <div className="heroImage-container">
        <div className="heroContent">
          <p className="text-base">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.
          </p>

          <button
            className="text-base h-10 px-6 font-semibold rounded-md bg-black text-white"
            type="submit"
          >
            <Link to="main2"> Categories </Link>
          </button>
        </div>
        <div className="heroImage">
          <img src={logo} alt="hero" />
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
