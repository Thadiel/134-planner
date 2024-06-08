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