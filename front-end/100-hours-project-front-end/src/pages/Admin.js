import { useState, useEffect } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

const Admin = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState();
  const [updateTitle, setUpdateTitle] = useState();
  const [category, setCategory] = useState();
  const [websiteLink, setWebsiteLink] = useState();
  const [summary, setSummary] = useState();
  const [showSpinner, setShowSpinner] = useState(false);
  const [tags, setTags] = useState([]);
  const [display, setDisplay] = useState(false);

  const [allData, setAllData] = useState([]);

  useEffect(() => {
    try {
      fetch("/list")
        .then((responseAllData) => responseAllData.json())
        .then((responseAllData) => {
          setAllData(responseAllData);
          console.log("response ", responseAllData);
        });
    } catch (error) {
      console.log(error);
    }

    let summary = document.querySelectorAll(".summary");
    summary.forEach((item) => {
      item.style.height = "auto";
      item.style.height = item.scrollHeight + "px";
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("Title", title);
    formData.append("Category", category);
    formData.append("WebsiteLink", websiteLink);
    formData.append("Summary", summary);
    formData.append("Tags", tags);

    try {
      setShowSpinner(true);
      await fetch("/addList", {
        method: "POST",
        body: formData,
      });
      setShowSpinner(false);
      console.log(showSpinner);
      console.log("formData ", formData);
      setTitle("");
      setCategory("");
      setWebsiteLink("");
      setSummary("");
      setImage(null);
      setTags([]);
      document.getElementById("title").value = "";
      document.getElementById("category").value = "";
      document.getElementById("websiteLink").value = "";
      document.getElementById("summary").value = "";
      document.getElementById("image").value = "";
      document.getElementById("tags").value = "";
    } catch (error) {
      console.error(error);
    }
  };

  function imageHundlechange(event) {
    setImage(event.target.files[0]);
  }

  function handleInputChange(e) {
    setSummary(e.target.value);
    const element = e.target;
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  }

  const handleChange = (tags) => {
    setTags(tags);

    console.log(tags);
  };

  function displayForm() {
    setDisplay((prev) => (prev = !prev));
  }

  function updateTags(e, id) {
    console.log(e, id);
    setAllData((prev) =>
      prev.map((item) => {
        if (item._id === id) {
          return { ...item, Tags: e };
        }
        return item;
      })
    );
  }

  function onChangeUpdate(e) {
    console.log(e.target.name, e.target.parentElement.parentElement.id);
    setAllData((prev) =>
      prev.map((item) => {
        if (item._id === e.target.parentElement.parentElement.id) {
          return { ...item, [e.target.name]: e.target.value };
        }
        return item;
      })
    );
  }

  console.log("updated all data is ", allData);

  return (
    <>
      {showSpinner && (
        <div className="p-[20%] drop-shadow border-2 flex flex-col justify-center items-center bg-white  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className=" inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
          <span className="pt-[10%]">Adding</span>{" "}
        </div>
      )}
      <button className="btn btn-primary addingTest" onClick={displayForm}>
        Add New
      </button>
      {display && (
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
              className="block text-gray-700 font-medium mb-2 mt-2"
              htmlFor="category"
            >
              Category:
            </label>
            <input
              type="text"
              id="category"
              name="Category"
              className="border border-gray-400 p-2 w-full"
              onChange={(e) => setCategory(e.target.value)}
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
              htmlFor="websiteLink"
              className="block text-gray-700 font-medium mb-2"
            >
              Website Link:
            </label>
            <input
              type="text"
              id="websiteLink"
              name="websiteLink"
              className="border border-gray-400 p-2 w-full"
              onChange={(e) => setWebsiteLink(e.target.value)}
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
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="mt-5 mb-5">
            <label className="">Tags</label>
            <TagsInput
              id="tags"
              className="mt-2 border border-gray-400 p-2 w-full"
              value={tags}
              onChange={handleChange}
            />
          </div>
          <button
            className="h-10 px-6 font-semibold rounded-md bg-black text-white"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}

      {allData.map((data) => (
        <form
          className=" px-[5%] py-[7%] border-[1px] border-black my-[5%] "
          onSubmit={handleSubmit}
        >
          <tr className="grid grid-cols-3 gap-4" id={data._id}>
            <td className="col-span-3 md:col-span-1">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="Title"
                value={data.Title}
                className="border border-gray-400 p-2 w-full"
                onChange={(e) => onChangeUpdate(e)}
              />
            </td>

            <td className="col-span-3 md:col-span-1">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="Category"
                value={data.Category}
                className="border border-gray-400 p-2 w-full"
                onChange={(e) => onChangeUpdate(e)}
              />
            </td>
            <td className="col-span-3 lg:col-span-1">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="websiteLink"
              >
                Website
              </label>
              <input
                type="text"
                id="websiteLink"
                name="WebsiteLink"
                className="border border-gray-400 p-2 w-full"
                value={data.WebsiteLink}
                onChange={(e) => onChangeUpdate(e)}
              />
            </td>
            <td className="col-span-3 md:col-span-2">
              <img src={data.Image} alt={data.title} className="" />
              {/* <input
            type="file"
            id="image"
            name="Image"
            onChange={imageHundlechange}
            className=" my-5"
          /> */}
            </td>
            <td className="col-span-3">
              <TagsInput
                className="mt-2 border border-gray-400 p-2 w-full"
                value={data.Tags[0].split(",")}
                onChange={(e) => updateTags(e, data._id)}
              />
            </td>
            <button
              className="h-10 px-6 font-semibold rounded-md bg-black text-white min-w-100"
              type="submit"
            >
              Update
            </button>
            <td className="col-span-3 ">
              <textarea
                id="summary"
                name="Summary"
                className="summary border border-gray-400 p-2 w-full"
                value={data.Summary}
                onChange={(e) => onChangeUpdate(e)}
              />
            </td>
          </tr>
        </form>
      ))}
    </>
  );
};

export default Admin;
