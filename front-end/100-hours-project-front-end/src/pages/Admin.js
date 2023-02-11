
import {useState} from 'react' 

// import { nanoid } from 'nanoid'


const Admin = () =>{

const [formdata, setFormdata] = useState({BriefSummary:'',Category:'', Image:'', Summary:'', Title:'' });

// const handleSubmit = async(e)=>{
//     e.preventDefault();
//     const formData = {formdata}

//     const response = await('')
// }

function hundleChange(event){
    console.log(event.target.name)
    setFormdata(prevForm =>{
          return{
            ...prevForm, 
            [event.target.name] : event.target.value
          } 
    })

}

console.log(formdata)

    return(
        // <form className='form' onSubmit={handleSubmit}>
        <form className='form bg-white p-6 rounded-lg shadow-md w-5/6'>
        <div>
          <label className='block text-gray-700 font-medium mb-2' htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name='Title'
            className='border border-gray-400 p-2 w-full mt-2'
            onChange={hundleChange}
          />
        </div>
        
        <div>
          <label className='block text-gray-700 font-medium mb-2 mt-2' htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name='Category'
            className='border border-gray-400 p-2 w-full'
            onChange={hundleChange}
          />
        </div>
        <div>
          <label className='block text-gray-700 font-medium mt-2 mb-2' htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name='Image'
            onChange={hundleChange}
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
            onChange={hundleChange}
          />
        </div>
        <div>
          <label className='block text-gray-700 font-medium mb-2 mt-2' htmlFor="summary">Summary:</label>
          <textarea
            id="summary"
            name='Summary'
            className='border border-gray-400 p-2 w-full'
            onChange={hundleChange}
          />
        </div>
        
        <button className='h-10 px-6 font-semibold rounded-md bg-black text-white' type="submit">Submit</button>
      </form>
    );
  };

    

export default Admin 