import React from "react";
import { useEffect, useState } from "react";

const Main2 = ({ user }) => {
  const [allData, setData] = useState([]);
  const [favOrgIds, setFavOrgIds] = useState();
  const [category, setCategory] = useState([]);
  let userId = null;

  useEffect(() => {
    fetch("/list")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setCategory(data);
      })

      .catch((error) => console.error(error));

    fetch("/login")
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          userId = data.user._id;
          setFavOrgIds(data.user.favOrg.map((org) => org.list_id));
          // get all organization ids from data
          const allOrgIds = [];
          for (const data in allData) {
            allOrgIds.push(data._id);
          }
        }
      });
  }, []);

  let orgs = document.querySelectorAll(".likeBtn");

  if (user) {
    orgs.forEach((data, index) => {
      if (favOrgIds.includes(data.getAttribute("data-org-id"))) {
        orgs[index].firstChild.style.color = "red";
      } else {
        orgs[index].firstChild.style.color = "black";
      }
    });
  }

  function onclickCategory(e) {

      console.log(e.target)

      // console.log(document.querySelector(".category-ul").childNodes)
      let categoryList = document.querySelector(".category-ul").childNodes;
     for(let i=0; i<categoryList.length; i++){
            console.log(categoryList[i].dataset.category)
            if(categoryList[i].dataset.category === e.target.dataset.category){
                categoryList[i].classList.add('btn-active')
            }else{
              categoryList[i].classList.remove('btn-active')
            }
     }
      if(e.target.dataset.category === 'All'){
        let categoryData
        setCategory(categoryData);
      }else{
        let categoryData = allData.filter(
          (item) => item.Category === e.target.dataset.category
         
          );
          setCategory(categoryData);
      }
     
      
 

   
  }

  async function isLike(favOrg) {
    if (favOrgIds.includes(favOrg)) {
      setFavOrgIds((prev) => prev.filter((org) => org !== favOrg));
    } else {
      setFavOrgIds((prev) => [...prev, favOrg]);
    }

    let orgs = document.querySelectorAll(".likeBtn");

    orgs.forEach((data, index) => {
      if (favOrgIds.includes(data.getAttribute("data-org-id"))) {
        orgs[index].firstChild.style.color = "red";
      } else {
        orgs[index].firstChild.style.color = "black";
      }
    });

    let updateFavOrg = { userId, favOrg };

    const res = await fetch("/favoriteOrg", {
      method: "PUT",
      body: JSON.stringify({ updateFavOrg }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
  }

  return (
    <>
      <div className="categoryContainer">
        <ul onClick={onclickCategory} className="category-ul">
          <li className="btn btn-focus btn-ghost " data-category="Households">Households</li>
          <li className="btn btn-ghost " data-category="Groceries">Grocerries</li>
          <li className="btn btn-ghost " data-category="Restaurants">Restaurants</li>
          <li className="btn btn-ghost" data-category="Other">Other</li>
          <li className="btn btn-ghost"  data-category="Resources">Resources</li>
          <li className="btn btn-ghost"  data-category="All">All</li>
        </ul>
      </div>

      {category.map((item) => (
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
              className="likeBtn pl-2 "
              data-org-id={item._id}
              onClick={() => {
                isLike(item._id);
              }}
            >
              <i className="fa-regular fa-heart"></i>
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Main2;
