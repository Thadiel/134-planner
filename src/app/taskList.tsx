import { useState,useEffect } from 'react';
import { getEvents, saveEvent, Event, Task } from './localStorage';

const TaskList = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [newTaskName, setNewTaskName] = useState<{ [key: string]: string }>({});
    const [collapsedTasks, setCollapsedTasks] = useState<{ [key: string]: boolean }>({});

    useEffect(()=>{
        setEvents(getEvents());
    },[]);

    const toggleTaskList = (eventIndex: number) => {
        setCollapsedTasks((prevCollapsedTasks) => ({
            ...prevCollapsedTasks,
            [eventIndex]: !prevCollapsedTasks[eventIndex],
        }));
    };

    const handleAddTask = (eventIndex: number, taskName: string) => {
        if (taskName.trim() === "") return;

        const updatedEvents = [...events];
        updatedEvents[eventIndex].tasks.push({ taskName, completed: false });
        setEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents));

        setNewTaskName((prevNewTaskName) => ({
            ...prevNewTaskName,
            [eventIndex]: "",
        }));
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, eventIndex: number) => {
        if (event.key === 'Enter') {
            handleAddTask(eventIndex, newTaskName[eventIndex]);
        }
    };

    return (
        <div className='flex justify-center allign-middle items-center h-[100vh] w-[30vw] bg-white'>
            <div className=' rounded h-[80vh] w-[20vw] bg-slate-300 overflow-y-auto scrollbar-none'>
                <h1 className=' mt-3 text-2xl justify-center text-center text-black'>Tasks</h1>
                {events.map((event, index) => (
                    <div key={index} className="event relative bg-red-200 rounded-xl my-2 pb-2">
                        <button className='w-full' onClick={() => toggleTaskList(index)}>
                            <h4 className='p-2 text-2xl'>{event.eventName}</h4>
                            <p className=" p-2 text-lg">{`${event.startTime.hour}:${String(event.startTime.minute).padStart(2, '0')} ${event.startTime.period} - ${event.endTime.hour}:${String(event.endTime.minute).padStart(2, '0')} ${event.endTime.period}`}</p>
                        </button>
                        {!collapsedTasks[index] && (
                            <div>
                                {event.tasks.map((task, idx) => (
                                    <li key={idx} className='min-h-10 list-none flex p-2 items-center gap-5'>
                                        <input
                                            type="checkbox" checked={task.completed}
                                            onChange={() => {
                                                const updatedEvents = [...events];
                                                updatedEvents[index].tasks[idx].completed = !updatedEvents[index].tasks[idx].completed;
                                                setEvents(updatedEvents);
                                                localStorage.setItem('events', JSON.stringify(updatedEvents));
                                            }}
                                            className='w-5 h-5'
                                        />
                                        {task.taskName}
                                    </li>
                                ))}
                                <div className="add-task mx-2 ">
                                    <input type="text"
                                        value={newTaskName[index] || ""}
                                        onChange={(e) =>
                                            setNewTaskName((prevNewTaskName) => ({
                                                ...prevNewTaskName,
                                                [index]: e.target.value,
                                            }))
                                        }
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        placeholder="New Task"
                                        className="p-2 border rounded-md w-full text-black"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;