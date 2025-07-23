export interface TicketFromJSON {
    TicketId: string;
    EventId: string;
    Name: string;
    Description: string;
    Category: string;
    Level: string;
    UsageType: string;
    ValidityPeriods: [];
    Price: number;
    Quantity: number;
    stripePriceID: string;
}
