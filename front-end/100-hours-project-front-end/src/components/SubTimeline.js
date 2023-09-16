import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faBreadSlice } from "@fortawesome/free-solid-svg-icons"; // Import the necessary icons
import { useState, useRef, useEffect } from "react";
const SubTimeline = ({ subtimeline, animateElement }) => {
  const ref = useRef();
  const [iconImage, setIconImage] = useState(subtimeline[1].business.img);
  const [description, setDescription] = useState(subtimeline[1].business.description);

  useEffect(() => {
    animateElement(ref, {});
  }, [animateElement]);

  function update(newIconImage, newDescription) {
    console.log("clicked", newIconImage);
    setIconImage(newIconImage);
    setDescription(newDescription);
  }
  const eachSubTimeLine = subtimeline.map((eachSubTimeline, i) => {
    return (
      i !== 0 && (
        <div key={i}>
          <p
            className="px-3 z-100 text-sm md:text-base"
            onClick={() => update(eachSubTimeline.business.img, eachSubTimeline.business.description)}
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
      <div className="flex mt-5">{eachSubTimeLine}</div>
      <div className="flex w-[80%] max-w-[600px] mt-5 justify-center items-center h-[300px;] ">
        <div className="w-[50%]">
          <p class="text-xs">{description}</p>
        </div>
        <div className="w-[50%] h-[200px] ml-5 ">
          <img src={iconImage} alt="Icon" className="object-cover w-[100%] h-[100%]" />
        </div>
      </div>
    </div>
  );
};

export default SubTimeline;
