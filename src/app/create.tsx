import { useState } from 'react';
import {saveEvent,Task} from './localStorage';

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
};



const Create = ({ isVisible, onClose }: ModalProps) => {
    
    const [startTime, setStartTime] = useState({ hour: 3, minute: 0, period: 'PM' });
    const [endTime, setEndTime] = useState({ hour: 4, minute: 0, period: 'PM' });
    const [eventName, setEventName] = useState('');
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    if (!isVisible) return null;

  const handleDayToggle = (day: string) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  const createModal = () => isVisible=!isVisible;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic
    const tasks: Task[] = []
    const event = { eventName, selectedDays, startTime, endTime, tasks};
    console.log(event);
    saveEvent(event);
    createModal();
    window.location.reload();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
      <select name="minute" value={time.minute} onChange={handleTimeChange} className="p-2 border rounded-md text-black">
        <option className="text-black" key={"00"} value={0}>00</option>
        <option className="text-black" key={"15"} value={15}>15</option>
        <option className="text-black" key={"30"} value={30}>30</option>
        <option className="text-black" key={"45"} value={45}>45</option>
        <option className="text-black" key={"60"} value={60}>60</option>
      </select>
      <select name="period" value={time.period} onChange={handleTimeChange} className="p-2 border rounded-md text-black">
        <option className="text-black"value="AM">AM</option>
        <option className="text-black" value="PM">PM</option>
      </select>
    </div>
)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={handleBackdropClick}>
      <div className="bg-white p-4 rounded-3xl shadow-lg">
        <h1 className=' text-gray-700 text-3xl mb-3 justify-center text-center'>Add New Event</h1>
          <div className=' h-0.5 rounded mb-3 w-[50vw] bg-gray-700'/>
          <form className='w-[50vw] rounded-2xl h-72 bg-gray-300 p-4 shadow-md mx' onSubmit={handleSubmit}>
            <div className="flex items-center mb-4">
              <input type="text" value={eventName} onChange={handleInputChange} placeholder="Event Name" className="flex-grow p-2 text-black border rounded-md"/>
              <button type="button" className="ml-2 p-2 bg-gray-400 rounded">
                <div className="w-6 h-6 bg-green-700 rounded"></div>
              </button>
            </div>
            <div className="flex justify-between mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <button type="button" key={day} onClick={() => handleDayToggle(day)} className={`px-2 py-1 border rounded-md ${selectedDays.includes(day) ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>
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
      </div>
    </div>
  );
};

export default Create;