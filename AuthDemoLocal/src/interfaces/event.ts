export interface EventFromJSON {
    event_id: string;
    user_id?: string;
    host_id?: string;
    location_id: string;
    title: string;
    description?: string;
    startDateTime?: string;
    endDateTime?: string;
    imageKey?: string;
}
