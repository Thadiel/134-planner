'use client'
import { useState,useEffect,useRef } from "react";
import {getEvents,Event} from '../localStorage'
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";


export default function WeekView() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const storedEvents = getEvents();
    setEvents(storedEvents);
  }, []);



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

  const calculateEventStyle = (event: Event) => {
    const startHour = event.startTime.period === 'PM' && event.startTime.hour !== 12 ? event.startTime.hour + 12 : event.startTime.hour;
    const startMinutes = startHour * 60 + event.startTime.minute;
    const endHour = event.endTime.period === 'PM' && event.endTime.hour !== 12 ? event.endTime.hour + 12 : event.endTime.hour;
    const endMinutes = endHour * 60 + event.endTime.minute;
    const top = (startMinutes / 60) * 56-56; // assuming 60px per hour
    const height = ((endMinutes - startMinutes) / 60) * 60;

    return {
      top: `${top}px`,
      height: `${height}px`,
    };
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set the initial scroll position
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 350; // Change this value to the desired scroll position
    }
  }, []);
  
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
        <IoChevronForwardOutline className="h-14 w-14 " />
      </button>
      {/* Hours */}
      <div ref={scrollRef} className="grid grid-cols-8 gap-x-2 w-full h-[60vh] overflow-y-scroll col-span-8 scrollbar-none">
      <ul className=" text-gray-300 flex flex-col justify-center items-center">
        {['1 AM','2 AM','3 AM','4 AM', '5 AM','6 AM','7 AM','8 AM','9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM', '5 PM','6 PM','7 PM','8 PM','9 PM','10 PM','11 PM','12 AM'].map(time => (
          <li key={time} className="text-sm h-14">
            {time}
          </li>
        ))}
      </ul>
      {/* Divs for body of days */}
      <div className="bg-gray-200">
            {events
              .filter(event => event.selectedDays.includes('Sun'))
              .map((event, index) => (
                <div key={index} className="event relative bg-red-200" style={calculateEventStyle(event)}>
                  <h4>{event.eventName}</h4>
                  <p className=" text-xs">{`${event.startTime.hour}:${String(event.startTime.minute).padStart(2, '0')} ${event.startTime.period} - ${event.endTime.hour}:${String(event.endTime.minute).padStart(2, '0')} ${event.endTime.period}`}</p>
                </div>
              ))}
      </div>
        
      <div className="bg-gray-200">
          {events
              .filter(event => event.selectedDays.includes('Mon'))
              .map((event, index) => (
                <div key={index} className="event relative bg-red-200" style={calculateEventStyle(event)}>
                  <h4>{event.eventName}</h4>
                  <p className=" text-xs">{`${event.startTime.hour}:${String(event.startTime.minute).padStart(2, '0')} ${event.startTime.period} - ${event.endTime.hour}:${String(event.endTime.minute).padStart(2, '0')} ${event.endTime.period}`}</p>
                </div>
              ))}
      </div>
      <div className="bg-gray-200">
      {events
              .filter(event => event.selectedDays.includes('Tue'))
              .map((event, index) => (
                <div key={index} className="event relative bg-red-200" style={calculateEventStyle(event)}>
                  <h4>{event.eventName}</h4>
                  <p className=" text-xs">{`${event.startTime.hour}:${String(event.startTime.minute).padStart(2, '0')} ${event.startTime.period} - ${event.endTime.hour}:${String(event.endTime.minute).padStart(2, '0')} ${event.endTime.period}`}</p>
                </div>
              ))}
      </div>
      <div className="bg-gray-200">
      {events
              .filter(event => event.selectedDays.includes('Wed'))
              .map((event, index) => (
                <div key={index} className="event relative bg-red-200" style={calculateEventStyle(event)}>
                  <h4>{event.eventName}</h4>
                  <p className=" text-xs">{`${event.startTime.hour}:${String(event.startTime.minute).padStart(2, '0')} ${event.startTime.period} - ${event.endTime.hour}:${String(event.endTime.minute).padStart(2, '0')} ${event.endTime.period}`}</p>
                </div>
              ))}
      </div>
      <div className="bg-gray-200">
      {events
              .filter(event => event.selectedDays.includes('Thu'))
              .map((event, index) => (
                <div key={index} className="event relative bg-red-200" style={calculateEventStyle(event)}>
                  <h4>{event.eventName}</h4>
                  <p className=" text-xs">{`${event.startTime.hour}:${String(event.startTime.minute).padStart(2, '0')} ${event.startTime.period} - ${event.endTime.hour}:${String(event.endTime.minute).padStart(2, '0')} ${event.endTime.period}`}</p>
                </div>
              ))}
      </div>
      <div className="bg-gray-200">
      {events
              .filter(event => event.selectedDays.includes('Fri'))
              .map((event, index) => (
                <div key={index} className="event relative bg-red-200" style={calculateEventStyle(event)}>
                  <h4 className=" text-base">{event.eventName}</h4>
                  <p  className=" text-xs">{`${event.startTime.hour}:${String(event.startTime.minute).padStart(2, '0')} ${event.startTime.period} - ${event.endTime.hour}:${String(event.endTime.minute).padStart(2, '0')} ${event.endTime.period}`}</p>
                </div>
              ))}
      </div>
      <div className="bg-gray-200">
      {events
              .filter(event => event.selectedDays.includes('Sat'))
              .map((event, index) => (
                <div key={index} className="event relative bg-red-200" style={calculateEventStyle(event)}>
                  <h4>{event.eventName}</h4>
                  <p className=" text-xs">{`${event.startTime.hour}:${String(event.startTime.minute).padStart(2, '0')} ${event.startTime.period} - ${event.endTime.hour}:${String(event.endTime.minute).padStart(2, '0')} ${event.endTime.period}`}</p>
                </div>
              ))}
      </div>
      </div>
    </div>
  )
}