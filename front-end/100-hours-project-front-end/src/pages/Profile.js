import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Profile = ({ userInfo, setUser, setUserId }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [briefSummary, setBriefSummary] = useState();
  const [summary, setSummary] = useState();
  const navigate = useNavigate();
  // const [favList, setFavList] = useState();
  const [allData, setAllData]=useState([]);
  const [favOrgIds, setFavOrgIds] = useState([]);

  useEffect(() => {
if(!localStorage.user){
  navigate("/");
}
    

    async function getData() {
      const allData = await fetch("/list")
      const responseAllData = allData;
      const resJsonData = await responseAllData.json();
      setAllData(resJsonData)
    }

    getData();

 

  }, []);


  useEffect(()=>{
    async function getFavData(){
      const getFavOrg = await fetch("/login");
      const response =  getFavOrg;
      const resJson =  await response.json();
      console.log('resJson is ' , resJson)
   // get a list of favorite organizations from user's account
   setFavOrgIds(resJson.user.favOrg.map((org) => org.list_id));
   console.log("favOrgIds is ", favOrgIds)
  //  // get all organization ids from data
  //  const allOrgIds = [];
  //  for (const data in resJson) {
  //    allOrgIds.push(data._id);
  //  }

  //  console.log('favorg ', allOrgIds)
    }
    

    getFavData()


  },[])


  

  async function deleteItem(orgId){

    console.log('delete clicked', orgId)
    
   const newFavOrgIds = [...favOrgIds]
   newFavOrgIds.splice(favOrgIds.indexOf(orgId),1)
   setFavOrgIds(newFavOrgIds)

   try {
    const res = await fetch("/favoriteOrg", {
      method: "PUT",
      body: JSON.stringify({newFavOrgIds }),
      headers: { 
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    // do something with the data
  } catch (error) {
    console.error("Error:", error);
  }

 


  }


  console.log('new fav org ids ', favOrgIds)

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
    
    if (response.ok) {
      localStorage.removeItem("user")
      localStorage.removeItem("userId")
      // setUser({ userName: null });
      window.location.reload()
      navigate("/");
    } 
  }

  console.log('all data is ', allData)
  // window.location.reload()
  return (
    <>
     <Navbar />
      <div className="mt-10 sm:mt-0">
        <div className="flex">
          <div className=" basis-1/2 flex flex-col items-center">
            <div>
              <p className='my-3'> Hello, {localStorage.getItem('user')} ! </p>

              <button
                className="className='my-2' h-10 px-6 font-semibold rounded-md bg-black text-white"
                onClick={logOut}
              >
                Log Out
              </button>
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
                  className="h-10 px-6 font-semibold rounded-md bg-black text-white"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
            <button
        className="my-3 mt-2 h-10 px-6 font-semibold rounded-md bg-black text-white"
        type="submit"
      >
        <Link to="/main2"> Categories </Link>
      </button>
          </div>
<div className=" basis-1/2 flex flex-col" >
          {allData.map((org)=>(
      favOrgIds.includes(org._id)&&<div>
            {/* <div className="item"  key={item._id}> */}
            <div className="flex flex-col">
              <div className="">
                <img
                  alt="fav company"
                  src={org.Image}
                />
              </div>
              <div className="itemContent">
                <h1 className="itemTitle">{org.Title}</h1>
                <p>{org.Summary}</p>
                <div onClick={()=>deleteItem(org._id)}>
                <i className="fa-solid fa-trash"></i>
                </div>
              </div>
            </div>
          </div>
        
    ))}
    </div>  
        </div>
      </div>

   

     
    </>
  );
};

export default Profile;
