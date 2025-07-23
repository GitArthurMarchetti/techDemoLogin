import { TicketFromJSON } from "../interfaces/tickets";
import ticketsData from '../data/tickets.json'; 

 
export const getTicketsByEvent = async (eventId: string): Promise<TicketFromJSON[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const filteredTickets = (ticketsData as TicketFromJSON[]).filter(ticket => ticket.EventId === eventId);
    return filteredTickets;
};
