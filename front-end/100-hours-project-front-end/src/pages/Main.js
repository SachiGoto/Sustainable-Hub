import React from 'react'

//  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

 import { useState } from 'react'






const Main = (props)=>{

  const [category, setCategory] = useState(props.categoryData)

   const allData = category.map((item)=>{
      return(
         <div className="item"  key={item._id}>
               <div className="itemImage">
                <img src={item.Image} />
                </div>
               <div className="itemContent">
               <h1 className="itemTitle">{item.Title}</h1>
               <p>{item.Summary}</p>
               <a href={item.BriefSummary} className="itemBriefSummary">Website</a>
               {/* <FontAwesomeIcon icon="fa-regular fa-heart" /> */}
               <i className="fa-regular fa-heart"></i>
                </div>
              
                </div>
        )

   })


   function onclickCategory(e){
  let categoryData = props.categoryData.filter(item=> item.Category === e.target.dataset.category)
  setCategory(categoryData)  
   }


    return (
    <>
    <div className='categoryContainer'>


    {/* <ul  onClick={props.clickHandler}  className="category-ul"> */}
    <ul  onClick={onclickCategory}  className="category-ul">

    <li data-category="Households">Households</li>
    <li data-category="Groceries">Grocerries</li>
    <li data-category="Restaurants">Restaurants</li>
    <li data-category="Other">Other</li>
    <li data-category="Resources">Resources</li>

    </ul>
    </div>

    <div className = "itemsList">

{allData}

   

    </div>

    
    
      
    
    
    
    
    
    

    </>
    )

}

export default Main 