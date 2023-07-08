import React from "react";
import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const Main2 = ({ user, userId }) => {
  const [allData, setData] = useState([]);
  const [favOrgIds, setFavOrgIds] = useState([]);
  const [category, setCategory] = useState([]);
  const [display, setDisplay] = useState(true);
  let likeBtns = document.querySelectorAll(".likeBtn");

  useEffect(() => {
    let all = document.querySelectorAll("[data-category = All]");
    all[1].classList.add("btn-active");

    fetch("/list")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setCategory(data);
      })

      .catch((error) => console.error(error));

    fetch(process.env.REACT_APP_API_URL + "/login")
      .then((response) => response.json())
      .then((data) => {
        console.log("checking if you are longed in ", data);
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
    console.log(json);
  }
  function showMessage() {
    setDisplay(false);
  }

  return (
    <>
      <div className="h-[85vh] w-[80%] md:w-[100%]   md:-w-full  mx-auto overflow-hidden">
        {display && (
          <div className="w-[70%] max-w-[500px;] md:w-[90%] px-[2%] indicator mt-[5%]  mx-auto block ">
            <span className="indicator-item ">
              <AiFillCloseCircle onClick={showMessage} />
            </span>
            <div className="font-semibold text-[1rem] md:text-[1.1rem]  w-full bg-white rounded-md  place-items-center drop-shadow px-[8%] md:px-[10%] py-[5%]">
              <p>
                Here is a list of eco-friendly companies in Vancouver.
                <br /> You can add them to your favorite list!
              </p>
            </div>
          </div>
        )}
        {/* <h3 className='font-bold text-natural w-full md:w-[70%] m-auto text-md md:text-lg text-center pt-[3%] my-[10%] sm:my-[2%]'>Here is a list of eco-friendly companies in Vancouver.<br/>  You can add them to your favorite list!</h3> */}
        <div className="dropdown  ml-5 mt-[5%]  sm:block md:hidden">
          <label
            tabIndex={0}
            className="mb-[10%] sm:mb-[5%] btn hover:bg-transparent btn-primary"
          >
            Categories
          </label>
          <ul
            tabIndex={0}
            className=" dropdown-content  mb-[3%] menu p-2 shadow bg-base-100 rounded-box w-52"
            onClick={onclickCategory}
          >
            <li
              className="btn border-0 bg-transparent text-black hover:underline hover:bg-transparent"
              data-category="All"
            >
              All
            </li>
            <li
              className="btn border-0 bg-transparent text-black hover:underline hover:bg-transparent "
              data-category="Households"
            >
              Household
            </li>
            <li
              className="btn border-0 bg-transparent text-black hover:underline hover:bg-transparent"
              data-category="Groceries"
            >
              Grocerries
            </li>
            <li
              className="btn border-0 bg-transparent text-black hover:underline hover:bg-transparent"
              data-category="Restaurants"
            >
              Restaurants
            </li>
            <li
              className="btn border-0 bg-transparent text-black hover:underline hover:bg-transparent"
              data-category="Other"
            >
              Other
            </li>
            <li
              className="btn border-0 bg-transparent text-black hover:underline hover:bg-transparent"
              data-category="Resources"
            >
              Resources
            </li>
          </ul>
        </div>
        <div className="categoryContainer md:mt-[4rem] lg:mt-[2rem] hidden md:block">
          <ul onClick={onclickCategory} className="category-ul mb-[3%] ">
            <li
              key={"All"}
              className="btn text-black bg-transparent border-0 hover:underline hover:bg-transparent"
              data-category="All"
            >
              All
            </li>
            <li
              key={"Households"}
              className="btn border-0 bg-transparent text-black hover:underline hover:bg-transparent"
              data-category="Households"
            >
              Household
            </li>
            <li
              key={"Groceries"}
              className="btn border-0 bg-transparent text-black hover:underline hover:bg-transparent"
              data-category="Groceries"
            >
              Grocerries
            </li>
            <li
              key={"Restaurants"}
              className="btn border-0 bg-transparent text-black hover:underline hover:bg-transparent"
              data-category="Restaurants"
            >
              Restaurants
            </li>
            <li
              key={"Other"}
              className="btn border-0 bg-transparent text-black hover:underline hover:bg-transparent"
              data-category="Other"
            >
              Other
            </li>
            <li
              key={"Resources"}
              className="btn border-0 bg-transparent text-black hover:underline hover:bg-transparent"
              data-category="Resources"
            >
              Resources
            </li>
          </ul>
        </div>

        <div className="pb-[50%] md:pb-[30%] h-[80vh] overflow-scroll max-w-[1200px] mx-auto md:grid md:grid-cols-2 ">
          {category.map((item) => (
            <div
              className="dropShadow flex flex-col justify-center items-center my-8  md:mx-auto rounded-md md:w-[80%] md:justify-between py-[5%]"
              key={item._id}
            >
              <div className="flex flex-col justify-center items-center w-[95%] h-40vh">
                <h3 className="font-bold w-[80%] text-[2rem] mb-[2%] mx-auto text-center">
                  {item.Title}
                </h3>
                <div className="w-full h-full md:w-[80%] mx-auto  ">
                  <img
                    className="object-contain rounded-md mx-auto  max-w-[450px] w-full"
                    alt={item.title}
                    src={item.Image}
                  />
                </div>

                <div className="w-[90%]  md:w-[80%] ">
                  <div className="mt-3 md:max-w-[450px]  md:mt-3 my-3 px-3%">
                    <p className="">{item.Summary}</p>
                  </div>
                  <div className="mb-3">
                    {/* <div className="badge badge-primary">primary</div> */}
                    <a
                      href={item.WebsiteLink}
                      rel="noreferrer"
                      target="_blank"
                      className="websiteLink hover:underline font-bold text-base"
                    >
                      Website
                    </a>
                    {user && (
                      <button
                        className="likeBtn pl-2  "
                        data-org-id={item._id}
                        onClick={() => {
                          isLike(item._id);
                        }}
                      >
                        <i className="fa-regular fa-heart "></i>
                      </button>
                    )}
                  </div>
                  <div>
                    {item.Tags &&
                      item.Tags[0].includes(",") &&
                      item.Tags[0]
                        .split(",")
                        .map((tag) => (
                          <div className="badge badge-outline mr-2">{tag}</div>
                        ))}
                    {item.Tags && !item.Tags[0].includes(",") && (
                      <div className="badge badge-outline mr-2">
                        {item.Tags}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Main2;
