import eventsData from '../data/events.json'; 


import { EventFromJSON } from "../interfaces/event";

export const getEventsByUser = async (userId: string): Promise<EventFromJSON[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const filteredEvents = (eventsData as EventFromJSON[]).filter(event => event.user_id === userId);
    return filteredEvents;
};
