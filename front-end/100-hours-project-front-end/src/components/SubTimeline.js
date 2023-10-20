import { useState, useRef, useEffect } from "react";
import daySun from "../assets/daySun.svg";
import morningSun from "../assets/morningSun.png";
import eveningSun from "../assets/eveningSun.png";
const SubTimeline = ({ subtimeline, animateElement }) => {
  const ref = useRef();
  const [iconImage, setIconImage] = useState(subtimeline[1].business.img);
  const [description, setDescription] = useState(subtimeline[1].business.description);
  const [activity, setActivity] = useState(subtimeline[1].business.activity);
  const [businessNames, setBusinessNames] = useState(
    subtimeline[1].business.businessName.map((item) => (
       { name: item.name, url: item.url }
    )),
  );

  const [selectedActivity, setSelectedActivity] = useState(1);

 
  useEffect(() => {
    animateElement(ref, {});
  }, [animateElement]);

  function update(newIconImage, newDescription, newActivity, businessName, index) {
    setSelectedActivity(index);
    console.log("new business names", businessName);
    setIconImage(newIconImage);
    setDescription(newDescription);
    setActivity(newActivity);
    setBusinessNames(businessName);

  }


  const eachSubTimeLine = subtimeline.map((eachSubTimeline, i) => {
    return (
      i !== 0 && (
        <div key={i}>
          <p
            className={`px-3 z-100 text-sm md:text-base cursor-pointer hover:text-[#F59E0B] ${
              i === selectedActivity ? "text-[#F59E0B]" : "text-black"
            }`}
            onClick={() =>
              update(
                eachSubTimeline.business.img,
                eachSubTimeline.business.description,
                eachSubTimeline.business.activity,
                eachSubTimeline.business.businessName,
                i
              )
            }
          >
            {eachSubTimeline.name}
          </p>
        </div>
      )
    );
  });


  return (
    <div className="my-5 flex flex-col " ref={ref}>
      <div className="flex items-center">
        <h3 className="mx-4">{subtimeline[0].period}</h3>
        {subtimeline[0].period === "Morning" ? (
          <img src={morningSun} className="w-[100px]" />
        ) : subtimeline[0].period === "Afternoon" ? (
          <img src={daySun} className="w-[100px]" />
        ) : (
          <img src={eveningSun} className="w-[100px]" />
        )}
      </div>

      <div className="flex mt-0 mb-[3.25rem] md:mt-5 md:mb-0">{eachSubTimeLine}</div>
      <div className="flex flex-col md:flex-row w-[80%] md:max-w-[600px] mt-5 justify-center items-center md:h-[300px;] ">
        <div className="w-[90%] md:w-[50%]">
          <h3 className="pb-5">{activity}</h3>
          <p class="text-sm">{description}</p>
        </div>
        <div className="my-[4.25rem] md:my-5 md:my-0 w-[90%] md:w-[50%] h-[200px] md:ml-5 ">
          <img
            src={iconImage}
            alt="Icon"
            className="object-cover w-full md:w-[120%] h-[120%]"
          />
        </div>
      </div>
      <div className="w-full mx-auto flex">
        {businessNames.map((business, i) => (
          <div key={i}>
            <a
              href={business.url}
              className="no-underline text-black bg-primary hover:bg-green-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none font-medium"
            >
              {business.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubTimeline;
