import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useState} from 'react' 
import {nanoid} from "nanoid"
// import {useEffect} from 'react' 
import Home from './pages/Home'
import Main from './pages/Main'
import Navbar from './components/Navbar'
import Admin from './pages/Admin'

function App() {

  const [categoryData, setCategoryData] = useState([]);


  function category(e){

     const fetchData = async ()=>{
    const response = await fetch('/list')
    const json = await response.json();

    if(response.ok){
     
      setCategoryData(
        json.filter( (item) =>  item.Category === e.target.dataset.category, {id:nanoid()})
        )
       
        }

    
    }
   
    fetchData()
  }



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
                    element={<Main clickHandler = {category} categoryData={categoryData} />}
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
