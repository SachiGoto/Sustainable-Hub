import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useEffect } from 'react';
import {useState} from 'react' 
// import {nanoid} from "nanoid"
import Home from './pages/Home'
import Main from './pages/Main'
import Navbar from './components/Navbar'
import Admin from './pages/Admin'

function App() {

  const [categoryData, setCategoryData] = useState(null);


useEffect(()=>{

  const fetchAllData = async()=>{
    const response = await fetch('/list')
    const json = await response.json()

    if(response.ok){

      setCategoryData(json)

    }
  }
fetchAllData()
},[])
    
  
      console.log('data is  ', categoryData)
     

    






  // function category(e){

  //    const fetchData = async ()=>{
  //   const response = await fetch('/list')
  //   const json = await response.json();

  //   if(response.ok){
      

     
  //     setCategoryData(
  //       json.filter( (item) =>  item.Category === e.target.dataset.category)
  //       )
       
  //       }

    
  //   }
   
  //   fetchData()
  // }



  return (
    <div className="App">
     <BrowserRouter>
     <Navbar />
       <div className="pages">
        <Routes>
              <Route
                    path="/"
                    element={<Home />}
              />  
                 <Route
                    path="main"
                    element={<Main categoryData={categoryData}  />}
              />
                       <Route
                    path="admin"
                    element={<Admin />}
              />      
        </Routes>
       </div>
   
     </BrowserRouter>
    </div>
  );
}

export default App;
