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
    <h3 className='font-bold text-natural w-full md:w-[70%] m-auto text-md md:text-lg text-center pt-[3%] my-[10%] sm:my-[2%]'>Here is a list of eco-friendly companies in Vancouver.<br/> You can add them in your favourite list! </h3>
    <div className="dropdown  ml-5 mt-[5%]  sm:block md:hidden">
  <label tabIndex={0} className="mb-[10%] sm:mb-[5%] btn hover:bg-transparent btn-primary">Categories</label>
  <ul tabIndex={0} className=" dropdown-content  mb-[3%] menu p-2 shadow bg-base-100 rounded-box w-52" onClick={onclickCategory}>
  <li className="btn border-0 bg-transparent text-black hover:underline hover:bg-transparent" data-category="All">All</li>
    <li  className="btn border-0 bg-transparent text-black hover:underline hover:bg-transparent " data-category="Households">Household</li>
    <li className="btn border-0 bg-transparent text-black hover:underline hover:bg-transparent" data-category="Groceries">Grocerries</li>
    <li className="btn border-0 bg-transparent text-black hover:underline hover:bg-transparent" data-category="Restaurants">Restaurants</li>
    <li className="btn border-0 bg-transparent text-black hover:underline hover:bg-transparent" data-category="Other">Other</li>
    <li className="btn border-0 bg-transparent text-black hover:underline hover:bg-transparent" data-category="Resources">Resources</li>
  </ul>
</div>
      <div className="categoryContainer md:mt-[4rem] lg:mt-[2rem] hidden md:block">
        <ul onClick={onclickCategory} className="category-ul mb-[3%] ">
        <li key={'All'}  className="btn text-black bg-transparent border-0 hover:underline hover:bg-transparent" data-category="All">
            All
          </li>
          <li key={'Households'} className="btn border-0 bg-transparent text-black hover:underline hover:bg-transparent" data-category="Households">
            Household
          </li>
          <li  key={'Groceries'} className="btn border-0 bg-transparent text-black hover:underline hover:bg-transparent" data-category="Groceries">
            Grocerries
          </li>
          <li key={'Restaurants'} className="btn border-0 bg-transparent text-black hover:underline hover:bg-transparent" data-category="Restaurants">
            Restaurants
          </li>
          <li key={'Other'} className="btn border-0 bg-transparent text-black hover:underline hover:bg-transparent" data-category="Other">
            Other
          </li>
          <li key={'Resources'} className="btn border-0 bg-transparent text-black hover:underline hover:bg-transparent" data-category="Resources">
            Resources
          </li>
         
        </ul>
      </div>
      
      <div className='orgList overflow-scroll text-sm max-w-[1200px] mx-auto  '>
      {category.map((item) => (
        <div className="dropShadow item my-8 md:my-8 md:mx-auto rounded-md md:w-[90%] py-[7%] md:py-[2%]  " key={item._id}>
        <div className='mx-auto my-0 max-w-[450px] w-10/12 md:w-2/5 h-40vh'>
          <div className="w-full h-full ">
            <img className='object-contain rounded-md' alt={item.title} src={item.Image} />
          </div>
          </div>
          <div className="itemContent md:w-[45%] w-10/12 ">
           <div className='mt-3 md:mt-0 my-3 w-10/12'>
            <h3 className="font-bold text-[2rem] my-[5%]">{item.Title}</h3>
            <p className=''>{item.Summary}</p>
            </div>
            <div>
            {/* <div className="badge badge-primary">primary</div> */}
            <a
              href={item.WebsiteLink}
              rel="noreferrer"
              target="_blank"
              className="websiteLink hover:underline font-bold text-base"
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
