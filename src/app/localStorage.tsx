export interface Task {
    taskName: string;
    completed: boolean;
  }

export interface Event {
    eventName: string;
    selectedDays: string[];
    startTime: {
      hour: number;
      minute: number;
      period: string;
    };
    endTime: {
      hour: number;
      minute: number;
      period: string;
    };
    tasks: Task[];
  }

export const getEvents = (): Event[] => {
  if (typeof window !== "undefined") {
    const events = localStorage.getItem('events');
    return events ? JSON.parse(events) : [];
  }
  return [];
};
  
export const saveEvent = (event: Event) => {
    if (typeof window !== "undefined") {
      const events = getEvents();
      events.push(event);
      localStorage.setItem('events', JSON.stringify(events));
    }
  };

export const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const period = hour < 12 ? 'AM' : 'PM';
        const displayHour = hour % 12 === 0 ? 12 : hour % 12;
        const displayMinute = minute.toString().padStart(2, '0');
        slots.push(`${displayHour}:${displayMinute} ${period}`);
      }
    }
    return slots;
  };