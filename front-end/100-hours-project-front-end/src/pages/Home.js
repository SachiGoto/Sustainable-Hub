import { Link } from "react-router-dom";
import logo from "../assets/person.png";



const Home = () => {

 
 
  return (
    < >


    <div>
      <div className="flex flex-col items-center justify-center mt-20 ">
      <div className="sm:w-80 sm:relative md:absolute md:top-1/2 md:left-1/4 md:-translate-x-2/4 md:-translate-y-1/2 md:w-90 lg:translate-x-1/4 lg:left-1/4 lg:w-90 z-1">
          <h3 className="text-base text-l">
          Sustainable Hub is designed to help people live a more sustainable lifestyle by providing practical suggestions for sustainable activities in their day-to-day. Providing tips on sustainable living accessible to everyone. Click the category button to see a list of local companies in Vanocuver,Canada that offer sustainable products and services! 
          
          </h3>

          <button
            className="btn "
            type="submit"
          >
            <Link to="main2"> Categories </Link>
          </button>
        </div>
      <div className="sm:relative sm:w-full md:absolute md:w-80% md:top-1/2 md:right-0 md:-translate-y-2/4 lg:-translate-x-1/4 lg:right1/4 lg:w-3/4 max-w-screen-md -z-1">
          <img src={logo} alt="hero" />
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
