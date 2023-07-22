import ActivityContainer from "./timeline_components/ActivityContainer";
import { useRef, useEffect } from "react"

import {
  faCoffee,
  faShower,
  faBreadSlice,
  faBicycle,
} from "@fortawesome/free-solid-svg-icons";

    const timelineData = [
    {
        Morning: [
        {
            name: "Personal Care",
            icon: faShower,
            business: {
            name: "Business 1",
            logo: "https://tracksbistro.ca/images/logo.png",
            img: "https://media-cdn.tripadvisor.com/media/photo-s/09/8e/5d/f8/off-the-tracks-espresso.jpg",
            description:
                "Off the Tracks is situated on Granville Island, with a focus on providing high-quality and fresh products. They source only the best locally roasted beans and use organic and sustainable ingredients to create their dishes. Additionally, Off the Tracks has partnered with ShareWares, allowing customers to enjoy their coffee using a reusable cup.",
            },
        },
        {
            name: "Coffee",
            icon: faCoffee,
            business: {
            name: "Business 2",
            logo: "https://tracksbistro.ca/images/logo.png",
            img: "https://media-cdn.tripadvisor.com/media/photo-s/09/8e/5d/f8/off-the-tracks-espresso.jpg",
            description:
                "Off the Tracks is situated on Granville Island, with a focus on providing high-quality and fresh products. They source only the best locally roasted beans and use organic and sustainable ingredients to create their dishes. Additionally, Off the Tracks has partnered with ShareWares, allowing customers to enjoy their coffee using a reusable cup.",
            },
        },
        {
            name: "Breakfast",
            icon: faBreadSlice,
            business: {
            name: "Business 3",
            logo: "https://tracksbistro.ca/images/logo.png",
            img: "https://media-cdn.tripadvisor.com/media/photo-s/09/8e/5d/f8/off-the-tracks-espresso.jpg",
            description:
                "Off the Tracks is situated on Granville Island, with a focus on providing high-quality and fresh products. They source only the best locally roasted beans and use organic and sustainable ingredients to create their dishes. Additionally, Off the Tracks has partnered with ShareWares, allowing customers to enjoy their coffee using a reusable cup.",
            },
        },
        {
            name: "Commute",
            icon: faBicycle,
            business: {
            name: "Business 4",
            logo: "https://tracksbistro.ca/images/logo.png",
            img: "https://media-cdn.tripadvisor.com/media/photo-s/09/8e/5d/f8/off-the-tracks-espresso.jpg",
            description:
                "Off the Tracks is situated on Granville Island, with a focus on providing high-quality and fresh products. They source only the best locally roasted beans and use organic and sustainable ingredients to create their dishes. Additionally, Off the Tracks has partnered with ShareWares, allowing customers to enjoy their coffee using a reusable cup.",
            },
        },
        ],
        periodIconUrl: "https://static.vecteezy.com/system/resources/previews/009/304/897/original/sun-icon-set-clipart-design-illustration-free-png.png",
    },
    {
        Afternoon: [
            {
                name: "Lunch",
                icon: faShower,
                business: {
                name: "Afternoon Business 1",
                logo: "https://tracksbistro.ca/images/logo.png",
                img: "https://media-cdn.tripadvisor.com/media/photo-s/09/8e/5d/f8/off-the-tracks-espresso.jpg",
                description:
                    "Off the Tracks is situated on Granville Island, with a focus on providing high-quality and fresh products. They source only the best locally roasted beans and use organic and sustainable ingredients to create their dishes. Additionally, Off the Tracks has partnered with ShareWares, allowing customers to enjoy their coffee using a reusable cup.",
                },
            },
            {
                name: "Groceries",
                icon: faCoffee,
                business: {
                name: "Afternoon Business 2",
                logo: "https://tracksbistro.ca/images/logo.png",
                img: "https://media-cdn.tripadvisor.com/media/photo-s/09/8e/5d/f8/off-the-tracks-espresso.jpg",
                description:
                    "Off the Tracks is situated on Granville Island, with a focus on providing high-quality and fresh products. They source only the best locally roasted beans and use organic and sustainable ingredients to create their dishes. Additionally, Off the Tracks has partnered with ShareWares, allowing customers to enjoy their coffee using a reusable cup.",
                },
            },
            {
                name: "Cleaning",
                icon: faBreadSlice,
                business: {
                name: "Afternoon Business 3",
                logo: "https://tracksbistro.ca/images/logo.png",
                img: "https://media-cdn.tripadvisor.com/media/photo-s/09/8e/5d/f8/off-the-tracks-espresso.jpg",
                description:
                    "Off the Tracks is situated on Granville Island, with a focus on providing high-quality and fresh products. They source only the best locally roasted beans and use organic and sustainable ingredients to create their dishes. Additionally, Off the Tracks has partnered with ShareWares, allowing customers to enjoy their coffee using a reusable cup.",
                },
            },
            {
                name: "Shopping",
                icon: faBicycle,
                business: {
                name: "Business 1",
                logo: "https://tracksbistro.ca/images/logo.png",
                img: "https://media-cdn.tripadvisor.com/media/photo-s/09/8e/5d/f8/off-the-tracks-espresso.jpg",
                description:
                    "Off the Tracks is situated on Granville Island, with a focus on providing high-quality and fresh products. They source only the best locally roasted beans and use organic and sustainable ingredients to create their dishes. Additionally, Off the Tracks has partnered with ShareWares, allowing customers to enjoy their coffee using a reusable cup.",
                },
            },
            ],
            periodIconUrl: "https://static.vecteezy.com/system/resources/previews/009/304/897/original/sun-icon-set-clipart-design-illustration-free-png.png",
    },
    {
        Evening: [
            {
                name: "Delivery",
                icon: faShower,
                business: {
                name: "Evening Business 1",
                logo: "https://tracksbistro.ca/images/logo.png",
                img: "https://media-cdn.tripadvisor.com/media/photo-s/09/8e/5d/f8/off-the-tracks-espresso.jpg",
                description:
                    "Off the Tracks is situated on Granville Island, with a focus on providing high-quality and fresh products. They source only the best locally roasted beans and use organic and sustainable ingredients to create their dishes. Additionally, Off the Tracks has partnered with ShareWares, allowing customers to enjoy their coffee using a reusable cup.",
                },
            },
            {
                name: "Pick-up",
                icon: faCoffee,
                business: {
                name: "Evening Business 2   ",
                logo: "https://tracksbistro.ca/images/logo.png",
                img: "https://media-cdn.tripadvisor.com/media/photo-s/09/8e/5d/f8/off-the-tracks-espresso.jpg",
                description:
                    "Off the Tracks is situated on Granville Island, with a focus on providing high-quality and fresh products. They source only the best locally roasted beans and use organic and sustainable ingredients to create their dishes. Additionally, Off the Tracks has partnered with ShareWares, allowing customers to enjoy their coffee using a reusable cup.",
                },
            },
            {
                name: "Events",
                icon: faBreadSlice,
                business: {
                name: "Business 1",
                logo: "https://tracksbistro.ca/images/logo.png",
                img: "https://media-cdn.tripadvisor.com/media/photo-s/09/8e/5d/f8/off-the-tracks-espresso.jpg",
                description:
                    "Off the Tracks is situated on Granville Island, with a focus on providing high-quality and fresh products. They source only the best locally roasted beans and use organic and sustainable ingredients to create their dishes. Additionally, Off the Tracks has partnered with ShareWares, allowing customers to enjoy their coffee using a reusable cup.",
                },
            },
            {
                name: "Volunteer",
                icon: faBicycle,
                business: {
                name: "Business 1",
                logo: "https://tracksbistro.ca/images/logo.png",
                img: "https://media-cdn.tripadvisor.com/media/photo-s/09/8e/5d/f8/off-the-tracks-espresso.jpg",
                description:
                    "Off the Tracks is situated on Granville Island, with a focus on providing high-quality and fresh products. They source only the best locally roasted beans and use organic and sustainable ingredients to create their dishes. Additionally, Off the Tracks has partnered with ShareWares, allowing customers to enjoy their coffee using a reusable cup.",
                },
            },
            ],
            periodIconUrl: "https://static.vecteezy.com/system/resources/previews/009/304/897/original/sun-icon-set-clipart-design-illustration-free-png.png",

    },
    ];



const Timeline = () => {

  





  return (
    <>
      <section className="bg-gradient-to-r from-green-50 to-green-950 w-full p-5">
        <div>
          <h2 className="text-center p-4">A sustainable Day!</h2>
        </div>
        {timelineData.map((periodData, i) => {
        let adjustment = (i + 1) * 23;
        return   <ActivityContainer data={[periodData]} sunPos={adjustment}/>
        })}
      </section>
    </>
  );
};

export default Timeline;
