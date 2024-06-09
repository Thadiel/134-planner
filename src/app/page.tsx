'use client'

import Image from 'next/image';
import { useState } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

import WeekView from './(calendars)/weekView';
import MonthView from './(calendars)/monthView';
import DayView from './(calendars)/dayView';
import Create from './create';
import TaskList from './taskList';

import logo from '../../public/Logo.svg';
import profile from '../../public/profile-icon.png'


export default function Home() {
  const [createVisible, setCreateVisible] = useState(false)
  const [selectedView, setSelectedView] = useState('week');
  const [taskListOpen, setTaskList] = useState(false)

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedView(event.target.value);
  };

  const createModal = () => setCreateVisible(!createVisible);

  const task_open = () => setTaskList(!taskListOpen);

  return (
      <div className="flex flex-row">
        <div className="w-full min-h-screen h-fit flex  flex-col bg-white" >
          <div className=" h-[20vh] max-w-[100vw]  flex flex-row items-center justify-items-center gap-4">
            <Image className=" h-28 w-28 m-8" src={logo} alt="Logo" />
            <button className='bg-white h-12 w-36 border-2 border-black rounded-xl ' onClick={createModal}>
              <span className='  text-black text-2xl'> +  Create</span>
            </button>
            <select defaultValue={"week"} name="view" id="view" onChange={handleSelectChange} className="border-black border-2 rounded-xl ml-auto mr-12  h-12 w-36 text-black text-2xl justify-self-end">
              <option value="day">Day</option>
              <option value="week" >Week</option>
              <option value="month">Month</option>
            </select>
            <Image className=" h-20 w-20 m-8 mr-12" src={profile} alt="Profile Icon" />
          </div>
          <main className="h-[80vh] w-auto bg-white px-4 flex">
            {selectedView === 'day' && <DayView />}
            {selectedView === 'week' && <WeekView />}
            {selectedView === 'month' && <MonthView />}
          </main>
          <button onClick={task_open} className={` flex justify-center items-center absolute top-[50vh] text-black ${taskListOpen ? ' right-[25vw]' : 'right-5'} h-20 w-20 rounded-full border-4 border-black bg-white `}>
            {taskListOpen ? (
              <IoChevronForwardOutline className=" h-16  w-16 " />
            ) : (
              <IoChevronBackOutline className=" h-16  w-16 " />
            )}
          </button>
          <Create isVisible={createVisible} onClose={createModal} />
        </div>
        {taskListOpen && (<TaskList />)}
      </div>
  );
}
