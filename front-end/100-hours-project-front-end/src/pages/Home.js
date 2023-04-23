import { Link } from "react-router-dom";
import logo from "../assets/person.png";

const Home = () => {
  return (
  
  
        <div className="home-container flex flex-col justify-start sm:justify-start items-center md:justify-start h-[65vh] ">
          <div className="home-text bg-zinc-50 p-[10%] rounded-tl-[30px] rounded-br-[30px] ">
           <h3 className="text-lg font-semibold pb-5" >Welcom to Sustainable Hub!</h3>
            <p className="pb-5 text-sm md:text-base">
              Sustainable Hub provides a list of eco-friendly local businesses in Vancouver and designed to help people live their lives in more sustainable way!
            </p>
           <p className="text-base">Let's see eco-friendly businesses located in Vancouver!</p>
            <button className="btn btn-secondary mt-7 " type="submit">
              
              <Link to="main2"> Discover </Link>
            </button>
          </div>
          <div className="home-image">
            <img src={logo} alt="hero" />
          </div>
        </div>


  );
};

export default Home;
