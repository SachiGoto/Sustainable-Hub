
const ActivityDetails = ({details}) => {
  
  


  
  return (
    <>
      <div className="flex w-[300px] md:w-[500px] h-[400px] flex-col md:flex-row justify-center items-center">
        <p className="w-[100%] md:w-[50%]">{details?.description}</p>
        <div className="w-[100%] md:w-[50%] flex md:h-[100%]">
          <img src={details?.img} className="w-full h-full object-cover" />
        </div>
      </div>
    </>
  );
  };
  
  export default ActivityDetails;
  


  // <div className="bg-[url('https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg')]">
  // <div className={`"${details?.img}"`}>
  // ` + imgUrl + `