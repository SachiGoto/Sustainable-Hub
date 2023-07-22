import {useState, useEffect} from "react"

const ActivityDetails = ({details}) => {
  
  


  
  return (
      <>
       <div className={"relative"}>
             <span className="text-white text-xl"><a href="#">{details?.name}</a></span>
             <p className="text-white relative z-10">{details?.description}</p>   
             <img src={details?.img} className="w-[100%] h-[100%] absolute z-0 top-0"/>
        </div>
      </>
    );
  };
  
  export default ActivityDetails;
  


  // <div className="bg-[url('https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg')]">
  // <div className={`"${details?.img}"`}>
  // ` + imgUrl + `