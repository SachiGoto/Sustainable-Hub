import Activity from "./Activity";
import ActivityDetails from "./ActivityDetails";
import { useState, useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";



const ActivityContainer = ({ data, businessData, sunPos, timeline }) => {
// i.e. morning, afternoon, evening
  const period = Object.keys(data[0])[0]

  const circleRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);


   
gsap.fromTo(
  "#Morning", // Target element ID or selector
  { x: 0, opacity: 0 }, // Initial properties
  {
    // duration: 3, // Animation duration
    x: 50, // Final x position
    opacity: 1, // Final opacity
    scrollTrigger: {
      // ScrollTrigger configuration
      trigger: "#Morning", // Trigger element ID or selector
      start: "bottom bottom", // Start animation when the top of the trigger element reaches the center of the viewport
      end: "center center", // End animation when the bottom of the trigger element reaches the center of the viewport
      scrub: true, // Enable scrubbing effect
      once: true,
    },
  }
);

   
gsap.fromTo(
  "#Afternoon", // Target element ID or selector
  { x: 0, opacity: 0 }, // Initial properties
  {
    duration: 3, // Animation duration
    x: 150, // Final x position
    opacity: 1, // Final opacity
    scrollTrigger: {
      // ScrollTrigger configuration
      trigger: "#Afternoon", // Trigger element ID or selector
      start: "bottom bottom", // Start animation when the top of the trigger element reaches the center of the viewport
      end: "center center", // End animation when the bottom of the trigger element reaches the center of the viewport
      markers: true,
      scrub: true, // Enable scrubbing effect
      once: true,
    },
  }
);

// gsap.to(
//   "#Evening", // Target element ID or selector
//   {
//     keyframes: [
//       { x: 0, opacity: 0 }, // Keyframe 1: Initial properties
//       { x: 200, opacity: 1 }, // Keyframe 2: Final properties
//     ],
//     duration: 2, // Animation duration
//     scrollTrigger: {
//       trigger: "#Evening", // Trigger element ID or selector
//       start: "bottom bottom", // Start animation when the top of the trigger element reaches the center of the viewport
//       end: "center center", // End animation when the bottom of the trigger element reaches the center of the viewport
//       // scrub: true, // Enable scrubbing effect
//       markers: true,
//     },
//   }
// );

gsap.fromTo(
  "#Evening", // Target element ID or selector
  { x: 0, opacity: 0 }, // Initial properties
  {
    // duration: 5, // Animation duration
    x: 200, // Final x position
    opacity: 1, // Final opacity
    scrollTrigger: {
      // ScrollTrigger configuration
      trigger: "#Evening", // Trigger element ID or selector
      start: "bottom bottom", // Start animation when the top of the trigger element reaches the center of the viewport
      end: "center center", // End animation when the bottom of the trigger element reaches the center of the viewport
      scrub: true, // Enable scrubbing effect
      once:true
    },
  }
);

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
      {data.map((activityInfo, index) => {



        let activityContent = activityInfo[period].map(
          (activity, i) => {
            return (
              <>
                <Activity
                  activityData={activity}
                  handleActivityChange={handleActivityChange}
                  idNum={i}
                />
              </>
            );
          }
        );

        return (
          <div
            className="mt-[5em] mb-[5em] w-[50%]"
            id={period}
            ref={circleRef}
          >
            <h3>{period}</h3>

            <div className="relative z-[10]">
              <div className="flex justify-between">
                {activityContent}
              </div>
            </div>

            <ActivityDetails details={currentActivity} />
          </div>
        );
      })}
    </>
  );


};

export default ActivityContainer;
