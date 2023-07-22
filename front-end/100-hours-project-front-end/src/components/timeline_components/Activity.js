import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Activity = ({activityData, handleActivityChange, idNum}) => {
    return (
      <>
            <div onClick={() => handleActivityChange(idNum)}>
              <label for="myButton" className="flex flex-col bg-[#90fcbb] p-3 clickable-area" >
                <span class="sr-only">Clickable Area</span>
                <FontAwesomeIcon icon={activityData.icon} className='h-[30px]' />
                <button id="myButton" class="my-button">
                  {activityData.name}
                </button>
              </label>
            </div>
      </>
    );
  };
  
  export default Activity;
  