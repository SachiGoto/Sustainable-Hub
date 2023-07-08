import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const Profile = ({ user, userId }) => {
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [WebsiteLink, setWebsiteLink] = useState();
  const [summary, setSummary] = useState();
  const [allData, setAllData] = useState([]);
  const [favOrgIds, setFavOrgIds] = useState([]);
  const [myFavList, setMyFavList] = useState([]);
  const [error, setErrorMessage] = useState(false);
  const [formatError, setFormatError] = useState(false);
  const [empty, setEmpty] = useState({ allData: false, myFavList: false });
  const [showSpinner, setShowSpinner] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch("/list")
      .then((responseAllData) => responseAllData.json())
      .then((allData) => {
        setAllData(allData);
      });

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
    console.log("delete btn clicked");
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
    let extension = image.name.split(".").pop();
    let fileExtension = ["jpeg", "jpg", "png"];

    if (
      title === undefined ||
      WebsiteLink === undefined ||
      summary === undefined ||
      image === undefined
    ) {
      setErrorMessage(true);
    } else if (!fileExtension.includes(extension)) {
      setFormatError(true);
    } else {
      setShowSpinner(true);
      try {
        await fetch("/addFavorite", {
          method: "POST",
          body: formData,
        });

        const myFavOrg = await fetch("/getFavorite");
        const responseAllData = myFavOrg;
        const resJsonData = await responseAllData.json();
        document.querySelector(".modal").style.visibility = "hidden";
        setMyFavList(resJsonData);
        setErrorMessage(false);
        setFormatError(false);
        setShowSpinner(false);
        // setBtnShow(false);
        setEmpty((prev) => {
          return {
            ...prev,
            myFavList: false,
          };
        });
      } catch (error) {
        // setBtnShow(true);
        console.error("error ", error);
      }
    }
  }

  // function display() {
  //   setBtnShow((prev) => (prev = !prev));
  // }

  function imageHundlechange(event) {
    setImage(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function displayModal() {
    document.querySelector(".modal").style.visibility = "visible";
  }

  const handleCheckboxChange = (id) => {
    console.log("id is ", id);

    let ids = document.querySelectorAll("[data-id]");

    ids.forEach((item) => {
      if (item.dataset.id === id) {
      }
    });
    console.log("ids are ", ids);
    setIsChecked(!isChecked);
  };

  console.log("ischecked is ", isChecked);

  return (
    <>
      <div className="md:mt-8 ">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center w-4/5">
            {/* <div>
              <p className="my-3"> Hello, {user} ! </p>
            </div> */}
            <div>
              <div className="px-4 sm:px-0 flex flex-col items-center w-full text-center mx-auto ">
                <h3 className="my-3 text-[1.8rem] font-semibold text-gray-900 text-center">
                  Add your favorites!
                </h3>
                <div className="flex my-[5%] ">
                  <label
                    htmlFor="my-modal"
                    className="btn btn-primary w-[100px]  mx-5"
                    onClick={displayModal}
                  >
                    Add
                  </label>
                  <input
                    type="checkbox"
                    id="my-modal"
                    className="modal-toggle"
                  />
                  <div className="modal">
                    <div className="modal-box">
                      <div className="modal-action">
                        <label htmlFor="my-modal" className="">
                          <AiFillCloseCircle />
                        </label>
                      </div>

                      <form
                        className="form bg-white p-6 rounded-lg shadow-md relative "
                        onSubmit={handleSubmit}
                      >
                        {showSpinner && (
                          <div className="p-[20%] drop-shadow border-2 flex flex-col justify-center items-center bg-white  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div
                              className=" inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                              role="status"
                            ></div>
                            <span className="pt-[10%]">Adding</span>{" "}
                          </div>
                        )}

                        <div>
                          <label
                            className="text-left block text-gray-700 font-medium mb-2 font-semibold"
                            htmlFor="title"
                          >
                            Title *
                          </label>
                          <input
                            type="text"
                            id="title"
                            name="Title"
                            value={title}
                            className="border border-gray-400 p-2 w-full mt-2 mb-5"
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                        <div className=" mb-1">
                          <label
                            className="text-left block text-gray-700 font-medium mt-2 mb-2 font-semibold"
                            htmlFor="image"
                          >
                            Image *
                          </label>
                          <input
                            type="file"
                            id="image"
                            name="Image"
                            onChange={imageHundlechange}
                            className="w-full"
                          />
                        </div>
                        {selectedImage && (
                          <img src={selectedImage} alt="Selected" width="200" />
                        )}
                        <div className=" mt-2 mb-5 text-left">
                          <ul className="ml-[5%] list-disc">
                            <li className="text-xs text-gray-500 ">
                              Image should be jpg, jpeg or png
                            </li>
                            <li className="text-xs text-gray-500">
                              {" "}
                              Prefered image size is 1194px by 834px
                            </li>
                          </ul>
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="WebsiteLink"
                            className="text-left block text-gray-700 font-medium mb-2 font-semibold"
                          >
                            Website *
                          </label>
                          <input
                            type="text"
                            id="websiteLink"
                            name="WebsiteLink"
                            className="border border-gray-400 p-2 w-full font-semibold mb-5"
                            onChange={(e) => setWebsiteLink(e.target.value)}
                          />
                        </div>
                        <div>
                          <label
                            className="text-left block text-gray-700 font-medium mb-2 mt-2 font-semibold"
                            htmlFor="summary"
                          >
                            Summary *
                          </label>
                          <textarea
                            id="summary"
                            name="Summary"
                            className="border border-gray-400 p-2 w-full mb-7"
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
                            Fill out all the input fields
                          </div>
                        )}
                        {formatError && (
                          <div className="text-center mt-2 errorMessage text-red-500">
                            * Image has to be jpeg, jpg or png
                          </div>
                        )}
                      </form>
                    </div>
                  </div>

                  <Link to="/main2">
                    <button
                      className="font-semibold btn w-[100px] mx-5 btn-secondary"
                      type="submit"
                    >
                      Explore
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {(!empty.allData || !empty.myFavList) && (
            <div className="grid mt-[5%] mb-[20%] max-w-[1000px] justify-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {allData.map(
                (org) =>
                  favOrgIds.includes(org._id) && (
                    <div
                      key={org._id}
                      className="w-full h-full max-w-[900px] bg-white border-2 border-primary border-opacity-50 outline-none px-8 py-6 shadow transition-all duration-5 cursor-pointer rounded-5 border-3 border hover:shadow-lg hover:scale-108 active:shadow-md active:scale-95"
                    >
                      <label htmlFor={org._id} className="w-full">
                        <div className="cursor-pointer hover:opacity-70 h-[200px] md:h-[220px] lg:h-[180px]">
                          <img
                            className="rounded-md object-cover w-full h-full"
                            alt="fav-company"
                            src={org.Image}
                          />
                        </div>
                        <h2 className="mt-3 text-[1.5rem] font-bold">
                          {org.Title}
                        </h2>
                      </label>
                      <div
                        onClick={() => removeItem(org._id)}
                        className="trashIcon  relative ml-[90%] hover:text-blue-900 hover:text-lg"
                      >
                        <i className=" fa-solid fa-trash-can"></i>
                      </div>
                    </div>
                  )
              )}

              {myFavList.map((fav) => (
                <div
                  key={fav._id}
                  className="w-full h-full max-w-[900px]w-full h-full max-w-[900px] bg-white border-2 border-secondary border-opacity-50 outline-none px-8 py-6 shadow transition-all duration-5 cursor-pointer rounded-5 border-3 border hover:shadow-lg hover:scale-108 active:shadow-md active:scale-95"
                >
                  <label htmlFor={fav._id} className="w-fulll">
                    <div className="cursor-pointer hover:opacity-70 h-[200px] md:h-[220px] lg:h-[180px]">
                      <img
                        className="rounded-md object-cover w-full h-full"
                        alt="fav company"
                        src={fav.Image}
                      />
                    </div>
                    <h2 className="mt-3 text-[1.5rem] font-bold">
                      {fav.Title}
                    </h2>
                  </label>
                  <div
                    onClick={() => removeFavItem(fav._id)}
                    className="trashIcon relative ml-[90%]"
                  >
                    <i className=" hover:text-blue-900 hover:text-lg fa-solid fa-trash-can"></i>
                  </div>
                </div>
              ))}

              {allData.map(
                (org) =>
                  favOrgIds.includes(org._id) && (
                    <div key={org._id} data-id={org._id} className="">
                      <input
                        type="checkbox"
                        id={org._id}
                        className="modal-toggle"
                        onChange={() => handleCheckboxChange(org._id)}
                      />
                      <div className="modal ">
                        <div className="modal-box">
                          <div className="modal-action mt-0">
                            <label htmlFor={org._id}>
                              <AiFillCloseCircle className="text-[1.5rem]" />
                            </label>
                          </div>
                          <p className="py-4">{org.Summary}</p>
                          <p>
                            <a
                              className="py-4 font-semibold  underline hover:text-green-800"
                              href={org.WebsiteLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Website
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  )
              )}

              {myFavList.map((fav) => (
                <div key={fav._id}>
                  <input
                    type="checkbox"
                    id={fav._id}
                    className="modal-toggle "
                  />
                  <div className="modal">
                    <div className="modal-box">
                      <div className="modal-action mt-0">
                        <label htmlFor={fav._id}>
                          <AiFillCloseCircle className="text-[1.5rem]" />
                        </label>
                      </div>
                      <p className="py-4">{fav.Summary}</p>
                      <p className="py-4 font-semibold  underline hover:text-green-800">
                        <a href={fav.WebsiteLink}>Website</a>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {empty.allData && empty.myFavList && (
          <div className="bg-white rounded-md px-[7%] py-[10%] drop-shadow border-2 text-center w-[80%] mx-auto font-semibold text-[1rem] md:text-[1.2rem] max-w-[700px] mt-[20%] md:mt-[5%]">
            {" "}
            <p>
              Build your sustainable list by adding companies you discover on
              Sustainable Hub or other places of your choice. Simply click the
              'add' button to include them
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
