'use client'

import Image from 'next/image';
import logo from '../../public/Logo.svg';
import profile from '../../public/profile-icon.png'
import WeekView from './(calendars)/weekView';
import MonthView from './(calendars)/monthView';
import DayView from './(calendars)/dayView';
import { useState } from 'react';

export default function Home() {
  const [selectedView, setSelectedView] = useState('week');
  
  function handleClick() {
    console.log('Create button')
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedView(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="min-w-screen min-h-screen h-fit flex  flex-col bg-white" >
        <div className=" h-fit w-full flex flex-row items-center justify-items-center gap-4">
          <Image className=" h-28 w-28 m-8" src={logo} alt="Logo" />
          <button className='bg-white h-12 w-36 border-2 border-black rounded-xl ' onClick={handleClick}>
            <span className='  text-black text-2xl'> +  Create</span>
          </button>
          <select defaultValue={"week"} name="view" id="view" onChange={handleSelectChange}  className="border-black border-2 rounded-xl ml-auto mr-12  h-12 w-36 text-black text-2xl justify-self-end">
            <option value="day">Day</option>
            <option value="week" >Week</option>
            <option value="month">Month</option>
          </select>
          <Image className=" h-20 w-20 m-8 mr-12" src={profile} alt="Profile Icon" />
        </div>
        <main className="h-auto w-auto bg-white px-4 flex">
          {selectedView === 'day' && <DayView />}
          {selectedView === 'week' && <WeekView />}
          {selectedView === 'month' && <MonthView />}
        </main>
    </div>
  );
}
