import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Profile = ({ user, userId }) => {
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [WebsiteLink, setWebsiteLink] = useState();
  const [summary, setSummary] = useState();
  const [allData, setAllData] = useState([]);
  const [favOrgIds, setFavOrgIds] = useState([]);
  const [myFavList, setMyFavList] = useState([]);
  const [btnShow, setBtnShow] = useState(false);
  const [error, setErrorMessage] = useState(false);
  const [formatError, setFormatError] = useState(false);
  const [empty, setEmpty] = useState({ allData: false, myFavList: false });

  useEffect(() => {
    fetch("/list")
      .then((responseAllData) => responseAllData.json())
      .then((allData) => {setAllData(allData);});

    fetch("/getFavorite")
      .then((allData) => allData.json())
      .then((resJsonData) => {
        setMyFavList(resJsonData);
        setEmpty((prev) => {
          return {
            ...prev,
            myFavList: resJsonData.length === 0 ? true : false,
          };
        });
      });

      fetch("/login")
      .then((response) => response.json())
      .then((resJson) => {
        setFavOrgIds(resJson.user.favOrg.map((org) => org.list_id));
        const allOrgIds = [];
        for (const data in resJson) {
          allOrgIds.push(data._id);
        }

        setEmpty((prev) => {
          return {
            ...prev,
            allData: resJson.user.favOrg.length === 0 ? true : false,
          };
        });
      });
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

      await res.json();

    } catch (error) {
      console.error("Error:", error);
    }

    fetch("/login")
      .then((response) => response.json())
      .then((resJson) => {
        setFavOrgIds(resJson.user.favOrg.map((org) => org.list_id));
        const allOrgIds = [];
        for (const data in resJson) {
          allOrgIds.push(data._id);
        }

        setEmpty((prev) => {
          return {
            ...prev,
            allData: resJson.user.favOrg.length === 0 ? true : false,
          };
        });
      });
  }

  async function removeFavItem(favId) {
    const res = await fetch("/deleteMyFavOrg/" + favId, {
      method: "DELETE",
    });

    await res.json();

    fetch("/getFavorite")
      .then((allData) => allData.json())
      .then((resJsonData) => {
        setMyFavList(resJsonData);
        setEmpty((prev) => {
          return {
            ...prev,
            myFavList: resJsonData.length === 0 ? true : false,
          };
        });
      });
  }

 

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("User", userId);
    formData.append("image", image);
    formData.append("Title", title);
    formData.append("WebsiteLink", WebsiteLink);
    formData.append("Summary", summary);
    let extension = image.name.split(".")[1]
    let fileExtension = ['jpeg','jpg', 'png']

    if (
      title === undefined ||
      WebsiteLink === undefined ||
      summary === undefined ||
      image === undefined
    ) {
      setErrorMessage(true);
      
    }else if(!fileExtension.includes(extension)){
      setFormatError(true)
    } else {
      try {
       await fetch("/addFavorite", {
          method: "POST",
          body: formData,
        });

        const myFavOrg = await fetch("/getFavorite");
        const responseAllData = myFavOrg;
        const resJsonData = await responseAllData.json();
        setMyFavList(resJsonData);
        setErrorMessage(false);
        setFormatError(false)
        setBtnShow(false);
        setEmpty((prev) => {
          return {
            ...prev,
            myFavList: false,
          };
        });
      } catch (error) {
        setBtnShow(true);
        console.error("error ", error);
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

  function modalToggle(id){
     document.querySelectorAll(".modalContainer").forEach(modal=>{
          modal.dataset.id === id?modal.style.display = "block":modal.style.display = "none"
     })

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
                  Add your favorite sustainable place!
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
                      className="block text-gray-700 font-medium mb-2 font-semibold"
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
                  <div  className=" mb-1">
                    <label
                      className="block text-gray-700 font-medium mt-2 mb-2 font-semibold"
                      htmlFor="image"
                    >
                      Image:
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="Image"
                      onChange={imageHundlechange}
                 

                    />
                  </div>
                  <div  className=" mb-5">
                     <p className='text-xs text-gray-500'>* Image should be jpg, jpeg or png</p>
                     <p className='text-xs text-gray-500'>* Prefered image size is 1194px by 834px</p>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="WebsiteLink"
                      className="block text-gray-700 font-medium mb-2 font-semibold"
                    >
                       WebsiteLink:
                    </label>
                    <input
                      type="text"
                      id="websiteLink"
                      name="WebsiteLink"
                      className="border border-gray-400 p-2 w-full font-semibold"
                      onChange={(e) => setWebsiteLink(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 font-medium mb-2 mt-2 font-semibold"
                      htmlFor="summary"
                    >
                      Summary:
                    </label>
                    <textarea
                      id="summary"
                      name="Summary"
                      className="border border-gray-400 p-2 w-full"
                      onChange={(e) => setSummary(e.target.value)}
                    />
                  </div>

                  <button
                    className="h-10 px-6 font-semibold rounded-md btn btn-primary"
                    type="submit"
                  >
                    Submit
                  </button>
                  {error && (
                    <div className="text-center mt-2 errorMessage text-red-500">
                      * Fill out all the input fields
                    </div>
                  )}
                  {formatError && (
                    <div className="text-center mt-2 errorMessage text-red-500">
                      * Image has to be jpeg, jpg or png
                    </div>
                  ) }
                </form>
              )}
            </div>
          </div>
          <div className="grid max-w-[1000px] justify-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-[20%]">
            {allData.map(
              (org) =>
                favOrgIds.includes(org._id) && (
                  <div
                    key={org._id}
                    className="w-full h-full max-w-[900px] bg-white p-3 m-3 border-2 border-green-200 border-4 hover:drop-shadow-xl"
                  >
                    <label htmlFor={org._id} className="w-full">

                      <div className="h-[320px] md:h-[220px] lg:h-[180px]">
                        <img
                          className="rounded-md object-cover w-full h-full"
                          alt="fav-company"
                          src={org.Image}
                        />
                      </div>
                      <h2 className="mt-3 text-lg">{org.Title}</h2>
                    </label>
                    <div
                      onClick={() => removeItem(org._id)}
                      className="trashIcon"
                    >
                      <i className="hover:text-blue-900 hover:text-lg fa-solid fa-trash-can"></i>
                    </div>
                  </div>
                )
            )}

            {allData.map((org) => (
              <div key={org._id} data-id={org._id} className='modalContainer hidden'>
                <input type="checkbox" id={org._id} className="modal-toggle" onClick={()=>modalToggle(org._id)}/>
                <div className="modal ">
                  <div className="modal-box">
                    <p className="py-4">{org.Summary}</p>
                    <a
                      className="py-4 font-semibold  underline hover:text-green-800"
                      href={org.WebsiteLink}
                    >
                      Website
                    </a>
                    <div className="modal-action">
                      <label htmlFor={org._id} className="btn">
                        close!
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {myFavList.map((fav) => (
              <div
                key={fav._id}
                className="w-full h-full max-w-[900px] bg-white p-3 m-3 rounded-lg border-2 border-blue-200 border-4 hover:drop-shadow-xl"
              >
                <label htmlFor={fav._id} className="w-fulll">
                  <div className="h-[320px] md:h-[220px] lg:h-[180px]">
                    <img className="rounded-md object-cover w-full h-full" alt="fav company" src={fav.Image} />
                  </div>
                  <h2 className="mt-3 text-lg">{fav.Title}</h2>
                </label>
                <div
                  onClick={() => removeFavItem(fav._id)}
                  className="trashIcon"
                >
                  <i className="hover:text-blue-900 hover:text-lg fa-solid fa-trash-can"></i>
                </div>
              </div>
            ))}

            {myFavList.map((fav) => (
              <div key={fav._id}>
                <input type="checkbox" id={fav._id} className="modal-toggle" />
                <div className="modal">
                  <div className="modal-box">
                    <p className="py-4">{fav.Summary}</p>
                    <p className="py-4 font-semibold  underline hover:text-green-800"><a href={fav.WebsiteLink}>Website</a></p>
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

        {empty.allData && empty.myFavList && (
          <div className="text-center mt-10">Your list is empty</div>
        )}
      </div>
    </>
  );
};

export default Profile;
