import React from "react";
import { useEffect, useState } from "react";

const Main2 = ({ user, userId }) => {
  const [allData, setData] = useState([]);
  const [favOrgIds, setFavOrgIds] = useState();
  const [category, setCategory] = useState([]);
  let likeBtns = document.querySelectorAll(".likeBtn");

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
  <ul tabIndex={0} className="dropdown-content  menu p-2 shadow bg-base-100 rounded-box w-52" onClick={onclickCategory}>
    <li  className="btn btn-focus btn-ghost " data-category="Households">Households</li>
    <li className="btn btn-ghost " data-category="Groceries">Grocerries</li>
    <li className="btn btn-ghost " data-category="Restaurants">Restaurants</li>
    <li className="btn btn-ghost" data-category="Other">Other</li>
    <li className="btn btn-ghost" data-category="Resources">Resources</li>
    <li className="btn btn-ghost" data-category="All">All</li>
  </ul>
</div>
      <div className="categoryContainer hidden sm:hidden md:block">
        <ul onClick={onclickCategory} className="category-ul">
          <li className="btn btn-focus btn-ghost " data-category="Households">
            Households
          </li>
          <li className="btn btn-ghost " data-category="Groceries">
            Grocerries
          </li>
          <li className="btn btn-ghost " data-category="Restaurants">
            Restaurants
          </li>
          <li className="btn btn-ghost" data-category="Other">
            Other
          </li>
          <li className="btn btn-ghost" data-category="Resources">
            Resources
          </li>
          <li className="btn btn-ghost" data-category="All">
            All
          </li>
        </ul>
      </div>
      
      <div className='orgList overflow-scroll text-sm  '>
      {category.map((item) => (
        <div className="item" key={item._id}>
          <div className="itemImage">
            <img alt="item" src={item.Image} />
          </div>
          <div className="itemContent">
            <h1 className="itemTitle sm:mt-2 md:mt-0">{item.Title}</h1>
            <p className='mt-2'>{item.Summary}</p>
            <a
              href={item.BriefSummary}
              rel="noreferrer"
              target="_blank"
              className="itemBriefSummary hover:text-secondary "
            >
              Website
            </a>
            <button
              className="likeBtn pl-2  "
              data-org-id={item._id}
              onClick={() => {
                isLike(item._id);
              }}
            >
              <i className="fa-regular fa-heart "></i>
            </button>
          </div>
        </div>
      ))}
      </div>
    </>
  );
};

export default Main2;
