import { Link } from "react-router-dom";
import Timeline from "../components/Timeline";
import logo from "../assets/person.png";

const Home = () => {
  return (
    <>    <div className="mt-[10%] md:mt-0 home-container mx-auto flex flex-col justify-start sm:justify-start items-center md:justify-center h-[75vh] ">
      <h1 className="home-title text-center font-bold text-[#3b4b3b] text-[1.3rem] sm:text-[1.8rem] md:text-[2.2rem] lg:text-[2.5rem] pb-[2%]">
        Small changes, big impact <br /> Go green in your daily routine
      </h1>
      <div className="home-text bg-zinc-50 px-[10%] py-[5%] rounded-tl-[30px] rounded-br-[30px] ">
        <p className="text-lg font-semibold pb-5">
          Welcom to Sustainable Hub!
        </p>
        <p className="pb-5 text-sm md:text-base ">
          Sustainable Hub provides a list of eco-friendly local businesses in
          Vancouver and designed to help people live their lives in more
          sustainable way!
        </p>
        <p className="text-base ">
          Let's see eco-friendly businesses located in Vancouver!
        </p>
        <button className="btn btn-secondary mt-7 " type="submit">
          <Link to="main"> Discover </Link>
        </button>
      </div>
      <div className="home-image w-[60%] md:w-[50%] z-30">
        <img src={logo} alt="hero" />
      </div>


    </div>
    <Timeline />
    </>

  );
};

export default Home;
