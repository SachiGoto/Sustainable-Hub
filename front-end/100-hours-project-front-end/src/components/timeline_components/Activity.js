import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Activity = ({activityData, handleActivityChange, idNum}) => {
    return (
      <>
        <div
          className="mb-5"
          onClick={() => handleActivityChange(idNum)}
        >
          <label
            for="myButton"
            className="min-w-[90px] flex flex-col mx-1 my-3 clickable-area"
          >
            <span class="sr-only">Clickable Area</span>
            <FontAwesomeIcon
              icon={activityData.icon}
              className="h-[15px] md:h-[30px]"
            />
            <button
              id="myButton"
              class="min-w-[90px] my-button text-[12px] md:text-[16px]"
            >
              {activityData.name}
            </button>
          </label>
        </div>
      </>
    );
  };
  
  export default Activity;
  