import React from "react";
import { useEffect, useState } from "react";

const Main2 = ({ user, userId }) => {
  const [allData, setData] = useState([]);
  const [favOrgIds, setFavOrgIds] = useState();
  const [category, setCategory] = useState([]);
  let likeBtns = document.querySelectorAll(".likeBtn");

  useEffect(() => {
    let all = document.querySelectorAll('[data-category = All]');
    all[1].classList.add('btn-active')

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
          // get favorite organization ids
          setFavOrgIds(data.user.favOrg.map((org) => org.list_id));
        }
      });
  }, []);

  if (user) {
    likeBtns.forEach((data, index) => {
      likeBtns[index].firstChild.style.color = favOrgIds.includes(
        data.getAttribute("data-org-id")
      )
        ? "red"
        : "black";
    });
  }

  // show organizations based on the category that is clicked
  function onclickCategory(e) {
    let categoryList = document.querySelector(".category-ul").childNodes;
    for (let i = 0; i < categoryList.length; i++) {
      categoryList[i].dataset.category === e.target.dataset.category
        ? categoryList[i].classList.add("btn-active")
        : categoryList[i].classList.remove("btn-active");
    }
    if (e.target.dataset.category === "All") {
      setCategory(allData);
    } else {
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

    likeBtns.forEach((data, index) => {
      // if a user has liked the org, make the like btn in red otherwise, stay in black.
      if (favOrgIds.includes(data.getAttribute("data-org-id"))) {
        likeBtns[index].firstChild.style.color = "red";
      } else {
        likeBtns[index].firstChild.style.color = "black";
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
    console.log(json)
  }

  return (
    <>
    <div className="dropdown  ml-5 mt-3  sm:block md:hidden">
  <label tabIndex={0} className="btn btn-base m-1">Categories</label>
  <ul tabIndex={0} className=" dropdown-content  menu p-2 shadow bg-base-100 rounded-box w-52" onClick={onclickCategory}>
  <li className="btn btn-ghost" data-category="All">All</li>
    <li  className="btn btn-focus btn-ghost " data-category="Households">Household</li>
    <li className="btn btn-ghost " data-category="Groceries">Grocerries</li>
    <li className="btn btn-ghost " data-category="Restaurants">Restaurants</li>
    <li className="btn btn-ghost" data-category="Other">Other</li>
    <li className="btn btn-ghost" data-category="Resources">Resources</li>
  </ul>
</div>
      <div className="categoryContainer md:mt-7 md:mb-5 hidden sm:hidden md:block">
        <ul onClick={onclickCategory} className="category-ul ">
        <li key={'All'}  className="btn btn-ghost" data-category="All">
            All
          </li>
          <li key={'Households'} className="btn btn-focus btn-ghost " data-category="Households">
            Household
          </li>
          <li  key={'Groceries'} className="btn btn-ghost " data-category="Groceries">
            Grocerries
          </li>
          <li key={'Restaurants'} className="btn btn-ghost " data-category="Restaurants">
            Restaurants
          </li>
          <li key={'Other'} className="btn btn-ghost" data-category="Other">
            Other
          </li>
          <li key={'Resources'} className="btn btn-ghost" data-category="Resources">
            Resources
          </li>
         
        </ul>
      </div>
      
      <div className='orgList overflow-scroll text-sm max-w-[1200px] mx-auto  '>
      {category.map((item) => (
        <div className="item my-8 md:my-8" key={item._id}>
        <div className='mx-auto my-0 max-w-[450px] w-10/12 md:w-2/5 h-40vh'>
          <div className="w-full h-full ">
            <img className='object-contain rounded-md' alt={item.title} src={item.Image} />
          </div>
          </div>
          <div className="itemContent md:w-5/12 w-10/12 ">
           <div className='mt-3 md:mt-0 my-3 w-10/12'>
            <h1 className="itemTitle mb-2">{item.Title}</h1>
            <p className=''>{item.Summary}</p>
            </div>
            <div>
            <a
              href={item.WebsiteLink}
              rel="noreferrer"
              target="_blank"
              className="websiteLink hover:text-secondary font-bold"
            >
              Website
            </a>
            {user && <button
              className="likeBtn pl-2  "
              data-org-id={item._id}
              onClick={() => {
                isLike(item._id);
              }}
            >
              <i className="fa-regular fa-heart "></i>
            </button>}
            </div>
          </div>
        </div>
      ))}
      </div>
    </>
  );
};

export default Main2;
