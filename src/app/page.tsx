'use client'

import Image from 'next/image';
import logo from '../../public/Logo.svg';
import profile from '../../public/profile-icon.png'
import WeekView from './(calendars)/weekView';
import MonthView from './(calendars)/monthView';
import DayView from './(calendars)/dayView';
import Create from './create';
import { useState } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";


export default function Home() {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [createVisible, setCreateVisible] = useState(false)
  const [selectedView, setSelectedView] = useState('week');
  const [taskListOpen, setTaskList] =useState(false)
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState({ hour: 3, minute: 0, period: 'PM' });
  const [endTime, setEndTime] = useState({ hour: 4, minute: 0, period: 'PM' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(e.target.value);
  };

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    type: 'start' | 'end'
  ) => {
    const { name, value } = e.target;
    const timeState = type === 'start' ? startTime : endTime;
    const setTimeState = type === 'start' ? setStartTime : setEndTime;

    setTimeState({
      ...timeState,
      [name]: name === 'hour' || name === 'minute' ? parseInt(value) : value,
    });
  };

  const handleDayToggle = (day: string) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({ eventName, selectedDays,startTime, endTime });
    createModal();
  };

  const createModal = () => setCreateVisible(!createVisible);

  function task_open(){
    setTaskList(!taskListOpen)
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedView(event.target.value);
    console.log(event.target.value);
  };

  const TimePicker = ({
    label,
    time,
    handleTimeChange,
  }: {
    label: string;
    time: { hour: number; minute: number; period: string };
    handleTimeChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  }) => (
    <div className="flex items-center">
      <select
        name="hour"
        value={time.hour}
        onChange={handleTimeChange}
        className="p-2 border rounded-md text-black"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option className="text-black" key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      :
      <select
        name="minute"
        value={time.minute}
        onChange={handleTimeChange}
        className="p-2 border rounded-md text-black"
      >
        <option className="text-black" key={"00"} value={0}>
            00
          </option>
          <option className="text-black" key={"15"} value={15}>
            15
          </option>
          <option className="text-black" key={"30"} value={30}>
            30
          </option>
          <option className="text-black" key={"45"} value={45}>
            45
          </option>
          <option className="text-black" key={"60"} value={60}>
            60
          </option>
      </select>
      <select
        name="period"
        value={time.period}
        onChange={handleTimeChange}
        className="p-2 border rounded-md text-black"
      >
        <option className="text-black"value="AM">AM</option>
        <option className="text-black" value="PM">PM</option>
      </select>
    </div>
)

  return (
    <div className="flex flex-row">
    <div className="w-full min-h-screen h-fit flex  flex-col bg-white" >
        <div className=" h-fit max-w-screen-lg  flex flex-row items-center justify-items-center gap-4">
          <Image className=" h-28 w-28 m-8" src={logo} alt="Logo" />
          <button className='bg-white h-12 w-36 border-2 border-black rounded-xl ' onClick={createModal}>
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
        <button onClick={task_open} className=" flex justify-center items-center absolute top-[50vh] text-black right-5 h-20 w-20 rounded-full border-4 border-black bg-white">
          {taskListOpen ?(
            <IoChevronForwardOutline className=" h-16  w-16 " />
          ) : (
            <IoChevronBackOutline className=" h-16  w-16 " />
          )}
        </button>
        <Create isVisible={createVisible} onClose={createModal}>
          <h1 className=' text-gray-700 text-3xl mb-3 justify-center text-center'>Add New Event</h1>
          <div className=' h-0.5 rounded mb-3 w-[50vw] bg-gray-700'/>
          <form className='w-[50vw] rounded-2xl h-72 bg-gray-300 p-4 shadow-md mx' onSubmit={handleSubmit}>
            <div className="flex items-center mb-4">
              <input type="text" value={eventName} onChange={handleInputChange}
              placeholder="Event Name" className="flex-grow p-2 text-black border rounded-md"/>
              <button type="button" className="ml-2 p-2 bg-gray-400 rounded">
                {/* Color picker placeholder */}
                <div className="w-6 h-6 bg-green-700 rounded"></div>
              </button>
            </div>
              <div className="flex justify-between mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <button
                  type="button"
                  key={day}
                  onClick={() => handleDayToggle(day)}
                  className={`px-2 py-1 border rounded-md ${selectedDays.includes(day) ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                >
                  {day}
                </button>
                ))}
              </div>
              <div className="flex flex-col items-center justify-center mb-4">
                <TimePicker label="Start Time" time={startTime} handleTimeChange={e => handleTimeChange(e, 'start')}/>
                <div className="text-black" >to</div>
                <TimePicker label="End Time" time={endTime} handleTimeChange={e => handleTimeChange(e, 'end')} />
              </div>
              <button type="submit" className="block w-full p-2 bg-blue-500 text-white rounded-md">
                Finish
              </button>
          </form>
        </Create>
    </div>
    {taskListOpen &&(
      <div className='flex justify-center allign-middle items-center h-[100vh] w-[30vw] bg-white'>
        <div className=' rounded h-[80vh] w-[20vw] bg-slate-300'>
          <h1 className=' mt-3 text-2xl justify-center text-center text-black'>Tasks</h1>

        </div>
      </div>
      )
    }
    </div>
  );
}
