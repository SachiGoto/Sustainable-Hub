import { useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

const Admin = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [websiteLink, setWebsiteLink] = useState();
  const [summary, setSummary] = useState();
  const [showSpinner, setShowSpinner] = useState(false);
  const [tags, setTags] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("Title", title);
    formData.append("Category", category);
    formData.append("WebsiteLink", websiteLink);
    formData.append("Summary", summary);
    formData.append("Tags", tags)

    try {
      setShowSpinner(true)
      await fetch("/addList", {
        method: "POST",
        body: formData,
      });
      setShowSpinner(false)
      console.log(showSpinner)
      console.log('formData ' , formData)
      setTitle("");
      setCategory("");
      setWebsiteLink("");
      setSummary("");
      setImage(null);
      setTags([])
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

  function handleInputChange(e){
    setSummary(e.target.value)
    const element = e.target;
  element.style.height = "auto";
  element.style.height = element.scrollHeight + "px";

  }
 

    const handleChange = (tags) => {
      setTags(tags);

      console.log(tags)
    };


  return (
    <>
                 {showSpinner && <div className='p-[20%] drop-shadow border-2 flex flex-col justify-center items-center bg-white  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                      <div className=" inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
</div>
<span className='pt-[10%]'>Adding</span> </div>}
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
            onChange={(e) => handleInputChange(e) }
          />
        </div>
        <div className='mt-5 mb-5'>
       <label className="">Tags</label>
      <TagsInput id='tags' className="mt-2 border border-gray-400 p-2 w-full" value={tags} onChange={handleChange} />
    </div>
        <button
          className="h-10 px-6 font-semibold rounded-md bg-black text-white"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Admin;
