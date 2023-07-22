import Activity from "./Activity";
import ActivityDetails from "./ActivityDetails";
import { useState, useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";



const ActivityContainer = ({ data, businessData, sunPos }) => {
// i.e. morning, afternoon, evening
  const period = Object.keys(data[0])[0]

  const circleRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);


    useEffect(() => {
        gsap.to("#thirdCircle", {
          x: 100,
          duration: 5,
          scrollTrigger: {
            trigger: "#thirdCircle",
            markers: true,
            start: "top center",
            end: "bottom 80px",
            scrub: true
          }
        });
      }, []);



  const [currentActivity, setCurrentActivity] = useState(null);

  const handleActivityChange = (id) =>{

    setCurrentActivity(data[0][period].map(activity => activity.business)[id])    // setCurrentActivity(businessData[id])
    }



    useEffect(() => {
      // Code to run when the component is mounted
     businessData = data[0][period].map(activity => activity.business)
     setCurrentActivity(businessData[0])
    }, []);


  return (
    <>
                <img style={{left: sunPos + '%'}} src={data[0].periodIconUrl} className="absolute h-[20vw] w-[20vw] z-[0]" />
      {data.map((activityInfo) => {



        let activityContent = activityInfo[period].map(
          (activity, i) => {
            return (
              <>
                <Activity activityData={activity} handleActivityChange={handleActivityChange} idNum={i}/>
              </>
            );
          }
        );

        return (
          <div className="mt-[5em] mb-[5em] w-[50%]" ref={circleRef} id="thirdCircle">
            <h3>{period}</h3>

            <div className="relative z-[10]">
              <div className="flex">{activityContent}</div>
            </div>

            <ActivityDetails details={currentActivity} />
          </div>
        );
      })}
    </>
  );


};

export default ActivityContainer;
