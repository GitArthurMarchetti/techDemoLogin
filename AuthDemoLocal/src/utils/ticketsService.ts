import { TicketFromJSON } from "../interfaces/tickets";
import ticketsData from '../data/tickets.json'; 

 
export const getTicketsByEvent = async (eventId: string): Promise<TicketFromJSON[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const filteredTickets = (ticketsData as TicketFromJSON[]).filter(ticket => ticket.EventId === eventId);
    return filteredTickets;
};


export const validateTicket = async (scannedCode: string, eventId: string): Promise<boolean> => {
    try {
        const ticketsForEvent: TicketFromJSON[] = await getTicketsByEvent(eventId);

        const isValid = ticketsForEvent.some(ticket => ticket.TicketId === scannedCode);

        return isValid;
    } catch (error) {
        console.error("Error validating ticket:", error);
        return false;
    }
};
