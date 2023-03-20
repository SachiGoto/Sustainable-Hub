import React from "react";
import { useEffect } from "react";
//  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useState } from "react";

const Main = (props) => {
  const [category, setCategory] = useState(props.categoryData);
  
  let listIds;
  const [likes, setLikes] = useState()

  useEffect(()=>{


    async function getData() {

      const getData = await fetch("/login");
      const response = await getData;
      const resJson = await response.json();
    
      let favOrgArray = await resJson.user.favOrg ;
      listIds = favOrgArray.map(data => data.list_id )
    
      console.log('listIds ', listIds)
      //setTest(listIds)
      const allOrgId = [];
  
     
  
      for (const data in props.categoryData) {
      
        allOrgId.push(props.categoryData[data]._id)
    
       
      }
  
     console.log('likesArray is ' ,  allOrgId)
     
     let likesData = []; 
  
     allOrgId.forEach((org, index)=>{
      allOrgId.includes(listIds[index]) ?  likesData.push({'id': allOrgId[index] , 'isLiked' : true }): likesData.push({'id': allOrgId[index] , 'isLiked' : false })
     })
  
    //  console.log('liksData is ' , likesData)
  
     setLikes(likesData)
     console.log('likes is ' , likesData)
  
  
      }


      getData()


  },[])
  

 console.log('likes is ' , likes)

  let userId = null;
  let user = null;

  if (props.userId) {
    userId = props.userId;
    user = props.user;
  }

  const allData = category.map((item) => {


    return (
      <div className="item" key={item._id}>
        <div className="itemImage">
          <img src={item.Image} />
        </div>
        <div className="itemContent">
          <h1 className="itemTitle">{item.Title}</h1>
          <p>{item.Summary}</p>
          <a
            href={item.BriefSummary}
            rel="noreferrer"
            target="_blank"
            className="itemBriefSummary"
          >
            Website
          </a>
          {/* <FontAwesomeIcon icon="fa-regular fa-heart" /> */}
          <button 
            onClick={() => {
              isLike(item._id);

            }}
          >
            <i className="fa-regular fa-heart"></i>
          </button>
        </div>
      </div>
    );
  });
  

  function onclickCategory(e) {
    let categoryData = props.categoryData.filter(
      (item) => item.Category === e.target.dataset.category
    );
    setCategory(categoryData);
  }



 async function isLike(favOrg) {
  
    
    setLikes((prevLikes)=>{ 
        return prevLikes.map((like) => {
          return like.id === favOrg
          ?{
            ...like,
            isLiked  : !like.isLiked,
         }: like


        })
        
       
    
    })

    console.log('likes array ', likes)
    let updateFavOrg = {userId, favOrg}
    console.log('favorg formdata ', updateFavOrg)

    const res = await fetch("/favoriteOrg", {
      method: "PUT",
      body: JSON.stringify({ updateFavOrg }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    console.log('json ', json)



   
  }

  

  return (
    <>
      <div className="categoryContainer">
        {/* <ul  onClick={props.clickHandler}  className="category-ul"> */}
        <ul onClick={onclickCategory} className="category-ul">
          <li data-category="Households">Households</li>
          <li data-category="Groceries">Grocerries</li>
          <li data-category="Restaurants">Restaurants</li>
          <li data-category="Other">Other</li>
          <li data-category="Resources">Resources</li>
        </ul>
      </div>

      <div className="itemsList">{allData}</div>
    </>
  );
};



export default Main;
