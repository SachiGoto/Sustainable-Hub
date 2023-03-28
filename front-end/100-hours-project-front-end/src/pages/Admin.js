
import {useState} from 'react' 

const Admin = () =>{
const [image, setImage] = useState(null);
const [title, setTitle] = useState();
const [category, setCategory] = useState();
const [briefSummary, setBriefSummary] = useState();
const [summary, setSummary] = useState();

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData();
  formData.append('image', image);
  formData.append('Title', title)
  formData.append('Category', category);
  formData.append('BriefSummary', briefSummary);
  formData.append('Summary', summary)

  try {
    fetch('/addList', {
      method: 'POST',
      body: formData,
    });
    
  } catch (error) {
    console.error(error);
  }
};

function imageHundlechange(event){
  setImage(event.target.files[0])
}

    return(
        
  <>
  {/* The button to open modal */}
<label htmlFor="my-modal" className="btn">open modal</label>

{/* Put this part before </body> tag */}
<input type="checkbox" id="my-modal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
    <div className="modal-action">
      <label htmlFor="my-modal" className="btn">Yay!</label>
    </div>
  </div>
</div>
        <form className='form bg-white p-6 rounded-lg shadow-md w-5/6' onSubmit={handleSubmit}>
        <div>
          <label className='block text-gray-700 font-medium mb-2' htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name='Title'
            value={title}
            className='border border-gray-400 p-2 w-full mt-2'
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        
        <div>
          <label className='block text-gray-700 font-medium mb-2 mt-2' htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name='Category'
            className='border border-gray-400 p-2 w-full'
            onChange={e => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label className='block text-gray-700 font-medium mt-2 mb-2' htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name='Image'
            onChange={imageHundlechange}
            className=' mb-5'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="briefSummary" className='block text-gray-700 font-medium mb-2'>Brief Summary:</label>
          <input
            type="text"
            id="briefSummary"
            name='BriefSummary'
            className='border border-gray-400 p-2 w-full'
            onChange={e => setBriefSummary(e.target.value)}
          />
        </div> 
         <div>
          <label className='block text-gray-700 font-medium mb-2 mt-2' htmlFor="summary">Summary:</label>
          <textarea
            id="summary"
            name='Summary'
            className='border border-gray-400 p-2 w-full'
            onChange={e => setSummary(e.target.value)}
          />
        </div>
        
        <button className='h-10 px-6 font-semibold rounded-md bg-black text-white' type="submit">Submit</button>
      </form>

      </>
    
    );


  };

    

export default Admin 