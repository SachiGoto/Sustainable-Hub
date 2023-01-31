import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useState} from 'react' 
// import {useEffect} from 'react' 
import Home from './pages/Home'
import Main from './pages/Main'
import Navbar from './components/Navbar'

function App() {

  const [categoryData, setCategoryData] = useState([]);

  //  const [data, setData ] = useState(null)

    // useEffect(()=>{
        // const fetchData = async ()=>{
        //      const response = await fetch('/list')
        //      const json = await response.json();
        //     console.log(json)

        //      if(response.ok){
        //       setData(json)
        //      }
        // }

        // fetchData()

      //   const fetchFeed = async()=>{
      //     const response = await fetch('/feed')
      //     const json = await response.json();
      //     console.log("feed json ", json );

      //     if(response.ok){
      //       setFeeds(json)
      // }
      //   }

        // fetchFeed()

    // }, [category])

  function category(e){

     const fetchData = async ()=>{
    const response = await fetch('/list')
    const json = await response.json();
   console.log(json)
   
  

    if(response.ok){
      // console.log("json is " , json[0].Category)
      // setCategoryData(json[0].Category)

      // let categoryArray = [];

      //   json.map(item =>{
      //   console.log(item.Category)
      //   console.log(e.target.dataset.category)
       
      //     return item.Category === e.target.dataset.categoryreturn? 
      //     {
      //       setCategoryData(prevData => [ item, ...prevData])
      //     }

      // })
      // setCategoryData(categoryArray)
      // console.log(categoryArray)
     
    
    }
  }

  fetchData()

  // setCategoryData(e.target.dataset.category)

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
        </Routes>
       </div>
   
     </BrowserRouter>
    </div>
  );
}

export default App;
