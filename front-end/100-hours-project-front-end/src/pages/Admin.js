
import {useState} from 'react' 


// import { nanoid } from 'nanoid'


const Admin = () =>{
const [image, setImage] = useState(null);
const [title, setTitle] = useState();
const [category, setCategory] = useState();
const [briefSummary, setBriefSummary] = useState();
const [summary, setSummary] = useState();
// const[error, setError] = useState(null);


const handleSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append('image', image);
  formData.append('Title', title)
  formData.append('Category', category);
  formData.append('BriefSummary', briefSummary);
  formData.append('Summary', summary)

  try {
    const response = await fetch('http://localhost:2121/addList', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

// const handleSubmit = async(e)=>{
//     e.preventDefault();
//     const data = new FormData();
//     // data.append('data', formdata)
//     data.append('image', image)
//   // console.log('formdata after hitting the submit button')
//     const response = await fetch('http://localhost:2121/addList', {
//       method:'POST',
//       body:data,

//     })

//     const json = await response.json();

   
//     if (!response.ok) {
//       if (json && json.error) {
//         setError(json.error);
//         console.log('json error', error);
//       } else {
//         setError('An error occurred.');
//         console.log('didnt work');
//       }
//     }

//     if(response.ok){
//       setFormdata({ Title:'' ,Category:'', Image:'', BriefSummary:'',  Summary:''})
//       setError(null)
//       console.log('new list is added', json)
//     }
// }

function imageHundlechange(event){
  console.log('file info' , event.target.files[0])
  setImage(event.target.files[0])
}

// function handleChange(event) {
//   setTitle(event.target.value);
// }

// function hundleChange(event){
//     console.log(event.target.name)
    
//     setFormdata(prevForm =>{
//       if(prevForm)
//           return{
//             ...prevForm, 
//             [event.target.name] : event.target.value
//           } 
//     })

// }

console.log(title)

    return(
        // <form className='form' onSubmit={handleSubmit}>
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
            // onChange={hundleChange}
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
            // onChange={hundleChange}
            onChange={e => setBriefSummary(e.target.value)}
          />
        </div> 
         <div>
          <label className='block text-gray-700 font-medium mb-2 mt-2' htmlFor="summary">Summary:</label>
          <textarea
            id="summary"
            name='Summary'
            className='border border-gray-400 p-2 w-full'
            // onChange={hundleChange}
            onChange={e => setSummary(e.target.value)}
          />
        </div>
        
        <button className='h-10 px-6 font-semibold rounded-md bg-black text-white' type="submit">Submit</button>
      </form>
    );
  };

    

export default Admin 