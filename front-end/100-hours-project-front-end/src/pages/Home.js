import { Link } from "react-router-dom";
import logo from "../assets/person.png";



const Home = () => {


 
 
  return (
    < >


    <div>
      <div className="home-container ">
      <div className="home-text">
          <h3 className="text-base text-l">
          Sustainable Hub is designed to help people live a more sustainable lifestyle by providing practical suggestions for sustainable activities in their day-to-day. Providing tips on sustainable living accessible to everyone. Click the category button to see a list of local companies in Vanocuver,Canada that offer sustainable products and services! 
          
          </h3>

          <button
            className="btn my-7 "
            type="submit"
          >
            <Link to="main2"> Categories </Link>
          </button>
        </div>
      <div className="home-image">
          <img src={logo} alt="hero" />
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
