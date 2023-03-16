import React from "react";
import { useEffect, useState } from "react";

const Main = (props) => {
  const [category, setCategory] = useState(props.categoryData);
  const [favOrgIds, setFavOrgIds] = useState();

  useEffect(() => {
    async function getData() {
      const getData = await fetch("/login");
      const response =  getData;
      const resJson = await response.json();

      // get a list of favorite organizations from user's account
       setFavOrgIds(resJson.user.favOrg.map((org) => org.list_id));

      // get all organization ids from data
      const allOrgIds = [];

      for (const data in props.categoryData) {
        allOrgIds.push(props.categoryData[data]._id);
      }

    
    }

    getData();
  }, [props.categoryData]);

  let userId = null;
  // let user = null;

  if (props.userId) {
    userId = props.userId;
    // user = props.user;
  }

  let orgs = document.querySelectorAll(".likeBtn");
  console.log(' org is ', orgs )

  orgs.forEach((data, index)=>{
    if( favOrgIds.includes(data.getAttribute('data-org-id'))){

      console.log(orgs[index].firstChild)
      orgs[index].firstChild.style.color = 'red';
    }else{
      console.log(orgs[index])
      orgs[index].firstChild.style.color = 'black';
    }

  })






  


  const allData = category.map((item) => {
    return (
      <div className="item" key={item._id}>
        <div className="itemImage">
          <img alt="item" src={item.Image} />
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
          <button
            className="likeBtn"
            data-org-id={item._id}
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

  console.log('fav org id list ' , favOrgIds)

  async function isLike(favOrg) {

  


    console.log('fav org id list ' , favOrgIds)
    if (favOrgIds.includes(favOrg)) {
      setFavOrgIds((prev) => prev.filter((org) => org !== favOrg));
      console.log('there is a match ', favOrg)
      console.log("favOrg id is removed", favOrgIds);
    } else {
      setFavOrgIds((prev) => [...prev, favOrg]);
      console.log("not a match");
      console.log("favOrg id is added", favOrgIds);
    }

    let orgs = document.querySelectorAll(".likeBtn");
    console.log(' org is ', orgs )

    orgs.forEach((data, index)=>{
      if( favOrgIds.includes(data.getAttribute('data-org-id'))){

        console.log(orgs[index].firstChild)
        orgs[index].firstChild.style.color = 'red';
      }else{
        console.log(orgs[index])
        orgs[index].firstChild.style.color = 'black';
      }
  
    })

    let updateFavOrg = { userId, favOrg };
    // console.log("favorg formdata ", updateFavOrg);

    const res = await fetch("/favoriteOrg", {
      method: "PUT",
      body: JSON.stringify({ updateFavOrg }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    console.log("response from favoriteorg api", json);

   
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
