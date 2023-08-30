import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faBreadSlice } from "@fortawesome/free-solid-svg-icons"; // Import the necessary icons
import { useState, useRef, useEffect } from "react";
const SubTimeline = ({ subtimeline, animateElement }) => {
  const ref = useRef();
  const [iconImage, setIconImage] = useState(subtimeline[1].business.img);

  useEffect(() => {
    animateElement(ref, {});
  }, [animateElement]);

  function changeImage(newIconImage) {
    console.log("clicked", newIconImage);
    setIconImage(newIconImage);
  }
  const eachSubTimeLine = subtimeline.map((eachSubTimeline, i) => {
    return (
      i !== 0 && (
        <div key={i}>
          <p
            className="px-3 z-100 text-sm md:text-base"
            onClick={() => changeImage(eachSubTimeline.business.img)}
          >
            {eachSubTimeline.name}
          </p>
          {/* <FontAwesomeIcon
            icon={eachSubTimeline.icon}
            className="h-[30px] w-[30px]"
          /> */}
        </div>
      )
    );
  });

  return (

      <div className="my-5 flex flex-col " ref={ref}>
        <div className="flex">{eachSubTimeLine}</div>

        <img src={iconImage} alt="Icon" className="w-[60%]" />
      </div>

  );
};

export default SubTimeline;
