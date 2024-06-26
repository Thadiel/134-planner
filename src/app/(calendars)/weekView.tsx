'use client'
import { useState,useEffect,useRef } from "react";
import {getEvents,Event,generateTimeSlots} from '../localStorage'
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";


export default function WeekView() {
  const [events, setEvents] = useState<Event[]>([]);
  const [showTimeDropdown, setShowTimeDropdown] = useState<{ [key: number]: boolean }>({});
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  let date = new Date();//Current selected Day as date obj
  let currentYear = date.getFullYear(); //current year (2024)
  let currentMonth =date.getMonth(); //current month (0-11)
  let lastDayM =new Date(currentYear,currentMonth+1,0); //Last Day of the month as date obj
  let today = new Date();  //Today
  let Months =["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  let Weekdays=["SUN","MON","TUE","WED","THU","FRI","SAT"];
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
    const storedEvents = getEvents();
    setEvents(storedEvents);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = (56*today.getHours()-56); 
    }
    makeHeaders();
  },[]);

  const forwardClick=()=>{
    date.setDate(date.getDate()+7);
    currentYear = date.getFullYear();
    currentMonth =date.getMonth();
    lastDayM =new Date(currentYear,currentMonth+1,0);
    makeHeaders();
  }

  const backClick=()=>{
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

  const toggleTimeDropdown = (eventIndex: number) => {
    setShowTimeDropdown((prevShowTimeDropdown) => ({
      ...prevShowTimeDropdown,
      [eventIndex]: !prevShowTimeDropdown[eventIndex],
    }));
    setSelectedEventIndex(eventIndex);
  };

  const handleTimeSelect = (eventIndex: number, startTime: string, endTime: string) => {
    const [startHour, startMinute, startPeriod] = (startTime.match(/(\d+):(\d+) (\w+)/)?.slice(1) ?? []) ;
    const [endHour, endMinute, endPeriod] = (endTime.match(/(\d+):(\d+) (\w+)/)?.slice(1)?? []);

    const updatedEvents = [...events];
    updatedEvents[eventIndex].startTime = {
      hour: parseInt(startHour),
      minute: parseInt(startMinute),
      period: startPeriod as 'AM' | 'PM',
    };
    updatedEvents[eventIndex].endTime = {
      hour: parseInt(endHour),
      minute: parseInt(endMinute),
      period: endPeriod as 'AM' | 'PM',
    };

    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));

    setShowTimeDropdown((prevShowTimeDropdown) => ({
      ...prevShowTimeDropdown,
      [eventIndex]: false,
    }));
  };

  const timeSlots = generateTimeSlots();

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
      {events.map((event, index) => {
              if (!event.selectedDays.includes("Sun")) {
                return null;
              }
              return (
                
                <div key={index} className="event relative bg-red-200 mr-6 p-2 rounded-r-xl" style={calculateEventStyle(event)}>
                  <h4 className="text-[.65rem]">{event.eventName}</h4>
                  <p className=" text-[.5rem]" onClick={() => toggleTimeDropdown(index)}>{`${event.startTime.hour}:${String(event.startTime.minute).padStart(2, '0')} ${event.startTime.period} - ${event.endTime.hour}:${String(event.endTime.minute).padStart(2, '0')} ${event.endTime.period}`}</p>
                  {showTimeDropdown[index] && (
                    <div className="time-dropdown h-40 overflow-y-auto scrollbar-none">
                      {timeSlots.map((startTime, Timeindex) => {
                        const endTime = timeSlots[(Timeindex + 1) % timeSlots.length];
                        return (
                          <div
                            key={Timeindex}
                            className="time-slot bg-slate-500 text-[.5em] w-full p-2"
                            onClick={() => handleTimeSelect(index, startTime, endTime)}
                          >
                            {startTime} - {endTime}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                
                )}
              )}
      </div>
      <div className="bg-gray-200">
          {events.map((event, index) => {
              if (!event.selectedDays.includes("Mon")) {
                return null;
              }
              return (
                <div key={index} className="event relative bg-red-200 mr-6 p-2 rounded-r-xl" style={calculateEventStyle(event)}>
                  <h4 className="text-[.65rem]">{event.eventName}</h4>
                  <p className=" text-[.5rem]" onClick={() => toggleTimeDropdown(index)}>{`${event.startTime.hour}:${String(event.startTime.minute).padStart(2, '0')} ${event.startTime.period} - ${event.endTime.hour}:${String(event.endTime.minute).padStart(2, '0')} ${event.endTime.period}`}</p>
                  {showTimeDropdown[index] && (
                    <div className="time-dropdown h-40 overflow-y-auto scrollbar-none">
                      {timeSlots.map((startTime, Timeindex) => {
                        const endTime = timeSlots[(Timeindex + 1) % timeSlots.length];
                        return (
                          <div
                            key={Timeindex}
                            className="time-slot bg-slate-500 text-[.5em] w-full p-2"
                            onClick={() => handleTimeSelect(index, startTime, endTime)}
                          >
                            {startTime} - {endTime}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                )}
              )}
      </div>
      <div className="bg-gray-200">
      {events.map((event, index) => {
              if (!event.selectedDays.includes("Tue")) {
                return null;
              }
              return (
                <div key={index} className="event relative bg-red-200 mr-6 p-2 rounded-r-xl" style={calculateEventStyle(event)}>
                  <h4 className="text-[.65rem]">{event.eventName}</h4>
                  <p className=" text-[.5rem]" onClick={() => toggleTimeDropdown(index)}>{`${event.startTime.hour}:${String(event.startTime.minute).padStart(2, '0')} ${event.startTime.period} - ${event.endTime.hour}:${String(event.endTime.minute).padStart(2, '0')} ${event.endTime.period}`}</p>
                  {showTimeDropdown[index] && (
                    <div className="time-dropdown h-40 overflow-y-auto scrollbar-none">
                      {timeSlots.map((startTime, Timeindex) => {
                        const endTime = timeSlots[(Timeindex + 1) % timeSlots.length];
                        return (
                          <div
                            key={Timeindex}
                            className="time-slot bg-slate-500 text-[.5em] w-full p-2"
                            onClick={() => handleTimeSelect(index, startTime, endTime)}
                          >
                            {startTime} - {endTime}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                )}
              )}
      </div>
      <div className="bg-gray-200">
      {events.map((event, index) => {
              if (!event.selectedDays.includes("Wed")) {
                return null;
              }
              return (
                <div key={index} className="event relative bg-red-200 mr-6 p-2 rounded-r-xl" style={calculateEventStyle(event)}>
                  <h4 className="text-[.65rem]">{event.eventName}</h4>
                  <p className=" text-[.5rem]" onClick={() => toggleTimeDropdown(index)}>{`${event.startTime.hour}:${String(event.startTime.minute).padStart(2, '0')} ${event.startTime.period} - ${event.endTime.hour}:${String(event.endTime.minute).padStart(2, '0')} ${event.endTime.period}`}</p>
                  {showTimeDropdown[index] && (
                    <div className="time-dropdown h-40 overflow-y-auto scrollbar-none">
                      {timeSlots.map((startTime, Timeindex) => {
                        const endTime = timeSlots[(Timeindex + 1) % timeSlots.length];
                        return (
                          <div
                            key={Timeindex}
                            className="time-slot bg-slate-500 text-[.5em] w-full p-2"
                            onClick={() => handleTimeSelect(index, startTime, endTime)}
                          >
                            {startTime} - {endTime}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                )}
              )}
      </div>
      <div className="bg-gray-200">
      {events.map((event, index) => {
              if (!event.selectedDays.includes("Thu")) {
                return null;
              }
              return (
                <div key={index} className="event relative bg-red-200 mr-6 p-2 rounded-r-xl" style={calculateEventStyle(event)}>
                  <h4 className="text-[.65rem]">{event.eventName}</h4>
                  <p className=" text-[.5rem]" onClick={() => toggleTimeDropdown(index)}>{`${event.startTime.hour}:${String(event.startTime.minute).padStart(2, '0')} ${event.startTime.period} - ${event.endTime.hour}:${String(event.endTime.minute).padStart(2, '0')} ${event.endTime.period}`}</p>
                  {showTimeDropdown[index] && (
                    <div className="time-dropdown h-40 overflow-y-auto scrollbar-none">
                      {timeSlots.map((startTime, Timeindex) => {
                        const endTime = timeSlots[(Timeindex + 1) % timeSlots.length];
                        return (
                          <div
                            key={Timeindex}
                            className="time-slot bg-slate-500 text-[.5em] w-full p-2"
                            onClick={() => handleTimeSelect(index, startTime, endTime)}
                          >
                            {startTime} - {endTime}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                )}
              )}
      </div>
      <div className="bg-gray-200">
      {events.map((event, index) => {
              if (!event.selectedDays.includes("Fri")) {
                return null;
              }
              return (
                <div key={index} className="event relative bg-red-200 mr-6 p-2 rounded-r-xl" style={calculateEventStyle(event)}>
                  <h4 className="text-[.65rem]">{event.eventName}</h4>
                  <p className=" text-[.5rem]" onClick={() => toggleTimeDropdown(index)}>{`${event.startTime.hour}:${String(event.startTime.minute).padStart(2, '0')} ${event.startTime.period} - ${event.endTime.hour}:${String(event.endTime.minute).padStart(2, '0')} ${event.endTime.period}`}</p>
                  {showTimeDropdown[index] && (
                    <div className="time-dropdown h-40 overflow-y-auto scrollbar-none">
                      {timeSlots.map((startTime, Timeindex) => {
                        const endTime = timeSlots[(Timeindex + 1) % timeSlots.length];
                        return (
                          <div
                            key={Timeindex}
                            className="time-slot bg-slate-500 text-[.5em] w-full p-2"
                            onClick={() => handleTimeSelect(index, startTime, endTime)}
                          >
                            {startTime} - {endTime}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                )}
              )}
      </div>
      <div className="bg-gray-200">
      {events.map((event, index) => {
              if (!event.selectedDays.includes("Sat")) {
                return null;
              }
              return (
                <div key={index} className="event relative bg-red-200 mr-6 p-2 rounded-r-xl" style={calculateEventStyle(event)}>
                  <h4 className="text-[.65rem]">{event.eventName}</h4>
                  <p className=" text-[.5rem]" onClick={() => toggleTimeDropdown(index)}>{`${event.startTime.hour}:${String(event.startTime.minute).padStart(2, '0')} ${event.startTime.period} - ${event.endTime.hour}:${String(event.endTime.minute).padStart(2, '0')} ${event.endTime.period}`}</p>
                  {showTimeDropdown[index] && (
                    <div className="time-dropdown h-40 overflow-y-auto scrollbar-none">
                      {timeSlots.map((startTime, Timeindex) => {
                        const endTime = timeSlots[(Timeindex + 1) % timeSlots.length];
                        return (
                          <div
                            key={Timeindex}
                            className="time-slot bg-slate-500 text-[.5em] w-full p-2"
                            onClick={() => handleTimeSelect(index, startTime, endTime)}
                          >
                            {startTime} - {endTime}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                )}
              )}
      </div>
    </div>
    </div>
  )
}