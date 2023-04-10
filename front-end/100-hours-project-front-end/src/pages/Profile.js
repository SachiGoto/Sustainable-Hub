import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const Profile = ({ user, userId }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState();
  //const [category, setCategory] = useState();
  const [briefSummary, setBriefSummary] = useState();
  const [summary, setSummary] = useState();
  // const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const [favOrgIds, setFavOrgIds] = useState([]);
  const [myFavList, setMyFavList] = useState([]);

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
      // do something with the data
    } catch (error) {
      console.error("Error:", error);
    }
    async function getFavData() {
      const allData = await fetch("/getFavorite");
      const responseAllData = allData;
      const resJsonData = await responseAllData.json();
      setMyFavList(resJsonData);
      //setAllData(resJsonData)
    }
    getFavData();
  }
  

  async function  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("User", userId);
    formData.append("image", image);
    formData.append("Title", title);
    formData.append("BriefSummary", briefSummary);
    formData.append("Summary", summary);

    try {
      const addFav = await fetch("/addFavorite", {
        method: "POST",
        body: formData,
      });

     
        const myFavOrg = await fetch("/getFavorite");
        const responseAllData = myFavOrg;
        const resJsonData = await responseAllData.json();
        setMyFavList(resJsonData);
        //setAllData(resJsonData)
  


    } catch (error) {
      console.error(error);
    }

  

    
   

  }

  function imageHundlechange(event) {
    setImage(event.target.files[0]);
  }

  return (
    <>
      <div className="mt-4 md:mt-8">
        <div className="flex flex-col md:flex-row">
          <div className="prose basis-1/2 flex flex-col items-center">
            <div>
              <p className="my-3"> Hello, {user} ! </p>
            </div>
            <div>
              <div className="px-4 sm:px-0">
                <h3 className="my-3 text-base font-semibold leading-6 text-gray-900 text-center">
                  Add your favorite sustainable place
                </h3>
              </div>

              <form
                className="form bg-white p-6 rounded-lg shadow-md w-5/6"
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
              </form>
            </div>

            <Link to="/main2">
              <button
                className="my-2 h-10 px-6 font-semibold rounded-md btn-secondary"
                type="submit"
              >
                Categories
              </button>
            </Link>
          </div>
          <div className="prose basis-1/2 flex flex-col">
            {allData.map(
              (org) =>
                favOrgIds.includes(org._id) && (
                  <div className="bg-white p-3 m-3 rounded hover:bg-wheat">
                    <label htmlFor={org._id} className="">
                      {" "}
                      <div className="flex flex-col">
                        <img
                          className="border"
                          alt="fav company"
                          src={org.Image}
                        />
                      </div>
                      <h2 className="mt-3">{org.Title}</h2>
                    </label>
                    <div onClick={() => removeItem(org._id)} class="trashIcon">
                      <i className="fa-solid fa-trash-can"></i>
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

            {myFavList.map(
              (fav) =>
              (
                  <div className="bg-white p-3 m-3 rounded hover:bg-wheat">
                    <label htmlFor={fav._id} className="">
                      {" "}
                      <div className="flex flex-col">
                        <img
                          className="border"
                          alt="fav company"
                          src={fav.Image}
                        />
                      </div>
                      <h2 className="mt-3">{fav.Title}</h2>
                    </label>
                    <div onClick={() => removeFavItem(fav._id)} class="trashIcon">
                      <i className="fa-solid fa-trash-can"></i>
                    </div>

                    {/* Put this part before </body> tag */}
                    <input
                      type="checkbox"
                      id={fav._id}
                      className="modal-toggle"
                    />
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
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
