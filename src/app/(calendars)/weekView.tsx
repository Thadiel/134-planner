'use client'
import { useEffect } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";


export default function WeekView() {
  let date = new Date();//Current selected Day as date obj
  let currentYear = date.getFullYear(); //current year (2024)
  let currentMonth =date.getMonth(); //current month (0-11)
  let lastDayM =new Date(currentYear,currentMonth+1,0); //Last Day of the month as date obj
  let today = new Date();  //Today
  let Months =["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  let Weekdays=["SUN","MON","TUE","WED","THU","SAT","SUN"];
  const makeHeaders=()=>{
    //Clear All Headers Before you start
    for(let i =1;i<=7;i++){
      let day = document.getElementById(i.toString());
      while (day?.firstChild) {
        day.removeChild(day.firstChild);
      }
    }
    let  dayNum = date.getDate()-date.getDay(); // Day of the month for start of the week (sun)
    for(let i =1;i<=7;i++){
      let day = document.getElementById(i.toString());
      let month = document.createElement('span');
      if (dayNum < 1){
        month.appendChild(document.createTextNode(Months[date.getMonth()-1]))
      }
      else if((dayNum > lastDayM.getDate())){
        console.log("dayNum: "+ dayNum);
        console.log(lastDayM);
        console.log("lastDay: "+ lastDayM.getDate());
        month.appendChild(document.createTextNode(Months[date.getMonth()+1]))
      }
      else{
        month.appendChild(document.createTextNode(Months[date.getMonth()]))
      }
      month.style.color="black";
      day?.appendChild(month);

      let weekday = document.createElement('span');
      weekday.appendChild(document.createTextNode(Weekdays[i-1]))
      weekday.style.color="black";
      day?.appendChild(weekday);

      let dayDate = document.createElement('span');
      if(dayNum < 1){
        let PrevM =new Date(currentYear,currentMonth-1,0);

        dayDate.appendChild(document.createTextNode(dayNum.toString()));
      }
      else if(dayNum > lastDayM.getDate()){
        let NextM =new Date(currentYear,currentMonth+1,0);
        let newDay = dayNum-lastDayM.getDate()+1;
        dayDate.appendChild(document.createTextNode(dayNum.toString()));
      }
      else{
        dayDate.appendChild(document.createTextNode(dayNum.toString()));
      }
      dayDate.style.color="black";
      day?.appendChild(dayDate);

      dayNum+=1;
    }
  }


  //Makes the headers when page is loaded
  useEffect(()=>{
    makeHeaders();
  },[]);

  const forwardClick=()=>{
    console.log("forward");
    date.setDate(date.getDate()+7);
    currentYear = date.getFullYear();
    currentMonth =date.getMonth();
    lastDayM =new Date(currentYear,currentMonth+1,0);
    makeHeaders();
  }

  const backClick=()=>{
    console.log("back");
    date.setDate(date.getDate()-7);
    currentYear = date.getFullYear();
    currentMonth =date.getMonth();
    lastDayM =new Date(currentYear,currentMonth+1,0);
    makeHeaders();
  }
  
  return (
    <div className="grid grid-cols-9 gap-x-2 w-full pb-10">
      {/* Back Button */}
      <button className=" text-gray-300 text-8xl flex justify-center items-center" onClick={backClick}>
        <IoChevronBackOutline className="h-14 w-14 " />
      </button>
      {/* Container for headers */}
      <div id="1" className="bg-gray-200  px-4 py-2 flex flex-col text-center"></div>
      <div id="2" className="bg-gray-200 px-4 py-2 flex flex-col text-center"></div>
      <div id="3" className="bg-gray-200 px-4 py-2 flex flex-col text-center"></div>
      <div id="4" className="bg-gray-200 px-4 py-2 flex flex-col text-center"></div>
      <div id="5" className="bg-gray-200 px-4 py-2 flex flex-col text-center"></div>
      <div id="6" className="bg-gray-200 px-4 py-2 flex flex-col text-center"></div>
      <div id="7" className="bg-gray-200 px-4 py-2 flex flex-col text-center"></div>
      {/* Forward */}
      <button className=" text-gray-300 text-8xl " onClick={forwardClick}>
        <IoChevronForwardOutline className="h-14 w-14" />
      </button>
      {/* Hours */}
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
      {/* Divs for body of days */}
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