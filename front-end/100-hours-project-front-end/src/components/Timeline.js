import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SubTimeline from "./SubTimeline";
import data from "../assets/data.json";

gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
  const AnimateElement0 = (ref, options) => {
  
      const el = ref.current;
      gsap.fromTo(
        el,
        { opacity: 0, translateX: options.initialTranslateX || "-50%" },
        {
          opacity: 1,
          translateX: "0%",
          duration: 2,
          delay: options.delay || 0,
          scrollTrigger: { trigger: el },
        }
      );
  };
    const AnimateElement1 = (ref, options) => {
      const el = ref.current;
      gsap.fromTo(
        el,
        { opacity: 0, translateX: options.initialTranslateX || "-50%" },
        {
          opacity: 1,
          translateX: "20%",
          duration: 2.5,
          delay: options.delay || 0,
          scrollTrigger: { trigger: el },
        }
      );
    };

       const AnimateElement2 = (ref, options) => {
         const el = ref.current;
         gsap.fromTo(
           el,
           { opacity: 0, translateX: options.initialTranslateX || "-50%" },
           {
             opacity: 1,
             translateX: "30%",
             duration: 3,
             delay: options.delay || 0,
             scrollTrigger: { trigger: el },
           }
         );
       };

  return (
    <section className="mt-[30%]">
      <div>
        <h2 className="text-center"> Sustainable Lifestyle Timeline! </h2>
      </div>
      <div className="text-3xl font-extrabold mb-[3%] ">
        {data.map((eachTimeline, index) => (
          <SubTimeline
            key={index}
            subtimeline={eachTimeline}
            animateElement= {
                index===0
                   ? AnimateElement0 
                   :index === 1
                   ? AnimateElement1
                   :AnimateElement2
                }
          />
        ))}
      </div>
    </section>
  );
};

export default Timeline;
