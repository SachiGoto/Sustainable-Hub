import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

// import { useNavigate } from "react-router-dom";

const Profile = ({ user, userId }) => {
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  //const [category, setCategory] = useState();
  const [briefSummary, setBriefSummary] = useState();
  const [summary, setSummary] = useState();
  // const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const [favOrgIds, setFavOrgIds] = useState([]);
  const [myFavList, setMyFavList] = useState([]);
  const [btnShow, setBtnShow] = useState(false);
  const [error, setErrorMessage] = useState(false);
  const [empty, setEmpty] = useState({allData:false, myFavList:false});


  useEffect(() => {
    async function getData() {
      const allData = await fetch("/list");
      const responseAllData = allData;
      const resJsonData = await responseAllData.json();
      setAllData(resJsonData);
    }
    getData();

    async function getFavData() {
      const allData = await fetch("/getFavorite");
      const responseAllData = allData;
      const resJsonData = await responseAllData.json();

      setMyFavList(resJsonData);

      console.log('getFaveData ' , resJsonData.length)

      setEmpty((prev) => {
            
        return resJsonData.length === 0?{
          ...prev,
          myFavList: true
        }: {
          ...prev,
          myFavList:false

        }
     

  })
      
      //setAllData(resJsonData)
    }
    getFavData();
  }, []);

  useEffect(() => {
    async function getFavData() {
      const getFavOrg = await fetch("/login");
      const response = getFavOrg;
      const resJson = await response.json();

      // get a list of favorite organizations from user's account
      setFavOrgIds(resJson.user.favOrg.map((org) => org.list_id));

      //  // get all organization ids from data
      const allOrgIds = [];
      for (const data in resJson) {
        allOrgIds.push(data._id);
      }

  console.log('favOrg ', resJson.user.favOrg.length)
      setEmpty((prev) => {
            
        return resJson.user.favOrg.length === 0?{
          ...prev,
          allData: true
        }: {
          ...prev,
          allData:false

        }
       
      })

      
    }

    getFavData();
  }, []);

  async function removeItem(orgId) {
    let newFavOrgIds = [...favOrgIds];
    newFavOrgIds.splice(favOrgIds.indexOf(orgId), 1);
    setFavOrgIds(newFavOrgIds);
    let updateFavOrg = { userId, orgId };
    try {
     
      const res = await fetch("/deleteFavoriteOrg", {
        method: "PUT",
        body: JSON.stringify({ updateFavOrg }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await res.json();

      console.log('data is ', data)
      
        setEmpty((prev) => {
            
              return data.length === 0?{
                ...prev,
                allData: true
              }: {
                ...prev,
                allData:false
      
              }
           

        })
      
      console.log("data returned is ", data);
     
      // do something with the data
    } catch (error) {
      console.error("Error:", error);
    }
  }
  


  async function removeFavItem(favId) {
    // let newFavOrgIds = [...favOrgIds];
    // newFavOrgIds.splice(favOrgIds.indexOf(favId), 1);
    // setFavOrgIds(newFavOrgIds);
    // let updateFavOrg = { favId };

    try {
      const res = await fetch("/deleteMyFavOrg/" + favId, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log("data returned is ", data);

      setEmpty((prev) => {
            
        return data.length === 0?{
          ...prev,
          myFavList: true
        }:{
          ...prev,
          myFavList:false
        }
    

  })
  console.log(empty.allData , empty.myFavList)
      // do something with the data
    } catch (error) {
      console.error("Error:", error);
    }

    async function getFavData() {
      const allData = await fetch("/getFavorite");
      const responseAllData = allData;
      const resJsonData = await responseAllData.json();
      setMyFavList(resJsonData);

      setEmpty((prev) => {
            
        return resJsonData.length === 0?{
          ...prev,
          myFavList: true
        }:{
          ...prev,
          myFavList:false
        }
    

  })

  console.log(empty.allData , empty.myFavList)
      //setAllData(resJsonData)
    }
    getFavData();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("User", userId);
    formData.append("image", image);
    formData.append("Title", title);
    formData.append("BriefSummary", briefSummary);
    formData.append("Summary", summary);

    console.log('form data title ' , summary === undefined)

  if(title  === undefined || briefSummary=== undefined || summary === undefined|| image === undefined ){
    setErrorMessage(true)
    console.log('please fill out all the fields')
  }else{
    try {
      const addFav = await fetch("/addFavorite", {
        method: "POST",
        body: formData,
      });

      const myFavOrg = await fetch("/getFavorite");
      const responseAllData = myFavOrg;
      const resJsonData = await responseAllData.json();
      setMyFavList(resJsonData);
      setErrorMessage(false)

      setBtnShow(false)
      
      //setAllData(resJsonData)
    } catch (error) {
      setBtnShow(true)
      console.error('error ' , error);
    
    }


  }
   
   

   
  }

  function display() {
    setBtnShow((prev) => (prev = !prev));
    console.log(btnShow);
  }

  function imageHundlechange(event) {
    setImage(event.target.files[0]);
  }

 

  return (
    <>
      <div className="mt-4 md:mt-8 ">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center w-4/5">
            <div>
              <p className="my-3"> Hello, {user} ! </p>
            </div>
            <div>
              <div className="px-4 sm:px-0 flex flex-col items-center ">
                <h3 className="my-3 text-base font-semibold leading-6 text-gray-900 text-center">
                  Add your favorite sustainable place
                </h3>
                <div className="flex ">
                  <button
                    className="my-2 h-10 px-6 mx-2 font-semibold rounded-md btn-accent"
                    onClick={display}
                  >
                    Add
                  </button>

                  <Link to="/main2">
                    <button
                      className=" mx-2 my-2 h-10 px-6 font-semibold rounded-md btn-secondary"
                      type="submit"
                    >
                      Categories
                    </button>
                  </Link>
                </div>
              </div>
              {btnShow && (
                <form
                  className="form bg-white p-6 rounded-lg shadow-md"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="title"
                    >
                      Title:
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="Title"
                      value={title}
                      className="border border-gray-400 p-2 w-full mt-2"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 font-medium mt-2 mb-2"
                      htmlFor="image"
                    >
                      Image:
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="Image"
                      onChange={imageHundlechange}
                      className=" mb-5"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="briefSummary"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Brief Summary:
                    </label>
                    <input
                      type="text"
                      id="briefSummary"
                      name="BriefSummary"
                      className="border border-gray-400 p-2 w-full"
                      // onChange={hundleChange}
                      onChange={(e) => setBriefSummary(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 font-medium mb-2 mt-2"
                      htmlFor="summary"
                    >
                      Summary:
                    </label>
                    <textarea
                      id="summary"
                      name="Summary"
                      className="border border-gray-400 p-2 w-full"
                      // onChange={hundleChange}
                      onChange={(e) => setSummary(e.target.value)}
                    />
                  </div>

                  <button
                    className="h-10 px-6 font-semibold rounded-md btn btn-primary"
                    type="submit"
                  >
                    Submit
                  </button>
                  {error && <div className='text-center mt-2 errorMessage text-red-500'> * Fill out all the input fields</div>}
                </form>

               
              )}
           
            </div>
          </div>
          <div className="flex flex-col">
            {allData.map(
              (org) =>
                favOrgIds.includes(org._id) && (
                  <div className="bg-white p-3 m-3 rounded-lg border-2 border-black-100 border-4 p-4 hover:drop-shadow-xl">
                    <label htmlFor={org._id} className="">
                      {" "}
                      <div className="imageContainer">
                        <img
                          className="border"
                          alt="fav company"
                          src={org.Image}
                        />
                      </div>
                      <h2 className="mt-3">{org.Title}</h2>
                    </label>
                    <div onClick={() => removeItem(org._id)} class="trashIcon">
                      <i className="hover:text-blue-900 hover:text-lg fa-solid fa-trash-can"></i>

                    </div>

                    {/* Put this part before </body> tag */}
                    <input
                      type="checkbox"
                      id={org._id}
                      className="modal-toggle"
                    />
                    <div className="modal">
                      <div className="modal-box">
                        <p className="py-4">{org.Summary}</p>
                        <div className="modal-action">
                          <label htmlFor={org._id} className="btn">
                            close!
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}

            {myFavList.map((fav) => (
              <div className="bg-white p-3 m-3 rounded-lg border-2 border-black-100 border-4 p-4 hover:drop-shadow-xl">
                <label htmlFor={fav._id} className="flex flex-col">
                  {" "}
                  <div className="imageContainer max-h-700px h-400px">
                    <img className="border h-full object-cover w-full mt-0 mb-0" alt="fav company" src={fav.Image} />
                  </div>
                  <h2 className="mt-3">{fav.Title}</h2>
                </label>
                <div onClick={() => removeFavItem(fav._id)} class="trashIcon">
                  <i className="hover:text-blue-900 hover:text-lg fa-solid fa-trash-can"></i>
                </div>

                {/* Put this part before </body> tag */}
                <input type="checkbox" id={fav._id} className="modal-toggle" />
                <div className="modal">
                  <div className="modal-box">
                    <p className="py-4">{fav.Summary}</p>
                    <div className="modal-action">
                      <label htmlFor={fav._id} className="btn">
                        close!
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {empty.allData && empty.myFavList && <div className="text-center mt-10">Your list is empty</div>}
      </div>
    </>
  );
};

export default Profile;
