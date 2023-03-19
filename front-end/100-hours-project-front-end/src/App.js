import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useEffect } from 'react';
import {useState} from 'react' 
// import {nanoid} from "nanoid"
import Home from './pages/Home'
import Main from './pages/Main'
import Navbar from './components/Navbar'
import Admin from './pages/Admin'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import Profile from './pages/Profile'


function App() {

  const [allData, setAllData] = useState(null);
  //const [categoryData, setCategoryData] = useState(null);


useEffect(()=>{

  const fetchAllData = async()=>{
    const response = await fetch('/list')
    const json = await response.json()

    if(response.ok){

      setAllData(json)

    }
  }
fetchAllData()
},[])
    
  
      // console.log('data is  ', allData)
     

      // useEffect(()=>{

      //   const fetchAllData = async()=>{
      //     const response = await fetch('/list')
      //     const json = await response.json()
      
      //     if(response.ok){
      
      //       setAllData(json)
      
      //     }
      //   }
      // fetchAllData()
      // },[categoryData])






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
                    element={<Main categoryData={allData}   />}
              />
                       <Route
                    path="admin"
                    element={<Admin />}
              />      
                 <Route
                    path="signup"
                    element={<SignUp />}
              />   
                <Route
                    path="login"
                    element={<LogIn />}
              />
                   <Route
                    path="profile"
                    element={<Profile />}
              />            
        </Routes>
       </div>
   
     </BrowserRouter>

     
    </div>
  );
}

export default App;
