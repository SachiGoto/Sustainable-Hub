import { Link } from "react-router-dom";
import logo from "../assets/person.png";



const Home = () => {

 
 
  return (
    <>


    <div className="home">
      <div className="heroImage-container">
        <div className="heroContent">
          <p className="text-base">
          Sustainable Hub is designed to help people live a more sustainable lifestyle by providing practical suggestions for sustainable activities in their day-to-day. Providing tips on sustainable living accessible to everyone. Click the category button to see a list of local companies in Vanocuver,Canada that offer sustainable products and services! 
          
          </p>

          <button
            className="btn "
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
