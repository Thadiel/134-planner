'use client'
import { useEffect } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";


export default function WeekView() {
  let date = new Date();
  let currentYear = date.getFullYear();
  let currentMonth =date.getMonth();
  let lastDayM =new Date(currentYear,currentMonth,0);
  let today = date;
  console.log(currentYear, currentMonth, today);
  let Months =["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  let Weekdays=["SUN","MON","TUE","WED","THU","SAT","SUN"];

  useEffect(()=>{
    const makeHeaders=()=>{
      for(let i =1;i<=7;i++){
        let day = document.getElementById(i.toString());
        while (day?.firstChild) {
          day.removeChild(day.firstChild);
        }
      }
      let  dayNum = date.getDate()-date.getDay();
      for(let i =1;i<=7;i++){
        let day = document.getElementById(i.toString());
        let month = document.createElement('span');
        month.appendChild(document.createTextNode(Months[date.getMonth()]))
        month.style.color="black";
        day?.appendChild(month);
        let weekday = document.createElement('span');
        weekday.appendChild(document.createTextNode(Weekdays[i-1]))
        weekday.style.color="black";
        day?.appendChild(weekday);
        let dayDate = document.createElement('span');
        dayDate.appendChild(document.createTextNode(dayNum.toString()));
        dayDate.style.color="black";
        day?.appendChild(dayDate);
        dayNum+=1;
      }
    console.log(lastDayM);
    }
    makeHeaders();
  },[]);

  const forwardClick=()=>{
    console.log("forward");
  }

  const backClick=()=>{
    console.log("back");
    let sunday =document.getElementById("1");
  }
  
  return (
    <div className="grid grid-cols-9 gap-x-2 w-full pb-10">
      <button className=" text-gray-300 text-8xl flex justify-center items-center" onClick={backClick}>
        <IoChevronBackOutline className="h-14 w-14 " />
      </button>
      <div id="1" className="bg-gray-200  px-4 py-2 flex flex-col text-center"></div>
      <div id="2" className="bg-gray-200 px-4 py-2 flex flex-col text-center"></div>
      <div id="3" className="bg-gray-200 px-4 py-2 flex flex-col text-center"></div>
      <div id="4" className="bg-gray-200 px-4 py-2 flex flex-col text-center"></div>
      <div id="5" className="bg-gray-200 px-4 py-2 flex flex-col text-center"></div>
      <div id="6" className="bg-gray-200 px-4 py-2 flex flex-col text-center"></div>
      <div id="7" className="bg-gray-200 px-4 py-2 flex flex-col text-center"></div>
      <button className=" text-gray-300 text-8xl " onClick={forwardClick}>
        <IoChevronForwardOutline className="h-14 w-14" />
      </button>
      <ul className="mt-4 text-gray-300 flex flex-col justify-center items-center">
        <li className=" text-sm mt-6">8 AM</li>
        <li className=" text-sm mt-6">9 AM</li>
        <li className=" text-sm mt-6">10 AM</li>
        <li className=" text-sm mt-6">11 AM</li>
        <li className=" text-sm mt-6">12 AM</li>
        <li className=" text-sm mt-6">1 PM</li>
        <li className=" text-sm mt-6">2 PM</li>
        <li className=" text-sm mt-6">3 PM</li>
        <li className=" text-sm mt-6">4 PM</li>
        <li className=" text-sm mt-6">5 PM</li>
        <li className=" text-sm mt-6">6 PM</li>
        <li className=" text-sm mt-6">7 PM</li>
        <li className=" text-sm mt-6">8 PM</li>
      </ul>
      <div className="bg-gray-200"></div>
      <div className="bg-gray-200"></div>
      <div className="bg-gray-200"></div>
      <div className="bg-gray-200"></div>
      <div className="bg-gray-200"></div>
      <div className="bg-gray-200"></div>
      <div className="bg-gray-200"></div>

    </div>
  )
}