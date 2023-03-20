import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({userInfo, setUser, setUserId}) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [briefSummary, setBriefSummary] = useState();
  const [summary, setSummary] = useState();
 
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const getData = await fetch("/login");
      const response = await getData;
      const resJson = await response.json();

     
      if (!resJson.login) navigate("/");
      setUser({userName : resJson.user.userName})
      setUserId({userId: resJson.user._id})
      // console.log('resJson is ', resJson.user._id)
    }

    getData();
  }, [setUser, setUserId, setCategory]);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("Title", title);
    formData.append("Category", category);
    formData.append("BriefSummary", briefSummary);
    formData.append("Summary", summary);
  }

  function imageHundlechange(event) {
    setImage(event.target.files[0]);
  }

  async function logOut() {
    const response = await fetch("/logout");
    console.log("logout response ", response);
   
    if (response.ok) {
      setUser({ userName: null });
      navigate("/");
    } else {
      console.log("failed to log out");
    }
  }


  return (
    <>
      <div className="mt-10 sm:mt-0">
        <div className="flex">
          <div className=" basis-1/2">
            <div>
              <p> Hello {userInfo.userName} </p>

              <button
                className="h-10 px-6 font-semibold rounded-md bg-black text-white"
                onClick={logOut}
              >
                Log Out
              </button>
            </div>
            <div>
              <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-6 text-gray-900 text-center">
                  Add A List
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
                  className="h-10 px-6 font-semibold rounded-md bg-black text-white"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className=" basis-1/2">
            {/* <div className="item"  key={item._id}> */}
            <div className="">
              <div className="w-2/3">
                <p>Image</p>
                {/* <img src={item.Image} /> */}
                <img alt="fav company" src="https://res.cloudinary.com/vanarts-webdev/image/upload/v1677619034/qlkecwkpkywumdcgqktq.png"/>
              </div>
              <div className="itemContent">
                {/* <h1 className="itemTitle">{item.Title}</h1> */}
                <h1 className="itemTitle">Title</h1>
                {/* <p>{item.Summary}</p> */}
                <p>summary</p>
                {/* <a href={item.BriefSummary} rel='noreferrer' target="_blank" className="itemBriefSummary">Website</a> */}
                {/* <FontAwesomeIcon icon="fa-regular fa-heart" /> */}
                <i className="fa-solid fa-trash"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        className="h-10 px-6 font-semibold rounded-md bg-black text-white"
        type="submit"
      >
        <Link to="/main"> Categories </Link>
      </button>
    </>
  );
};

export default Profile;
