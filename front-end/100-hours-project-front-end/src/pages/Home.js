
// import {useEffect, useState} from 'react' 
import {Link} from 'react-router-dom'
import logo from '../assets/person.png'
// import { nanoid } from 'nanoid'


const Home = () =>{
    // const [workouts, setWorkouts] = useState(null)
    // const [feed, setFeeds ] = useState(null)

    // useEffect(()=>{
    //     const fetchWorkouts = async ()=>{
    //          const response = await fetch('/lists')
    //          const json = await response.json();
    //         console.log(json)

    //          if(response.ok){
    //                setWorkouts(json)
    //          }
    //     }

    //     fetchWorkouts()

    //     const fetchFeed = async()=>{
    //       const response = await fetch('/feed')
    //       const json = await response.json();
    //       console.log("feed json ", json );

    //       if(response.ok){
    //         setFeeds(json)
    //   }
    //     }

    //     fetchFeed()

    // }, [])

    // {workouts &&  workouts.map((workout) => (
    //   <p>{workout.color}</p>

    // ))}

    // {feed && feed.map((feed)=>(
    //      <p>{feed.name}</p>
    // ))}



    return(
        <div className="home">
            
            
         
            <div className = "heroImage-container">
            <div className="heroContent">
              <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

              <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit"><Link to ="main">  Categories </Link>
        
        </button>
            </div>
            <div className="heroImage">
            <img  src={logo} alt="hero"/> 
            </div>
           
     


        


              
               

            </div>
        </div>
    )
}

export default Home 