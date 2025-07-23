// src/hooks/useUserEvents.ts
import { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { EventFromJSON } from '../interfaces/event'; 
import { getEventsByUser } from "../utils/eventsService"; 

interface UserEventsHook {
  userEvents: EventFromJSON[];
  isLoadingEvents: boolean; 
  errorLoadingEvents: boolean; 
}
export const useUserEvents = (): UserEventsHook => {
  const { user } = useAuthenticator(); 
  const [userEvents, setUserEvents] = useState<EventFromJSON[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState<boolean>(true);
  const [errorLoadingEvents, setErrorLoadingEvents] = useState<boolean>(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoadingEvents(true);
      setErrorLoadingEvents(false);
      if (user && user.userId) { 
        try {
          const userId = user.userId; 
          const events = await getEventsByUser(userId);
          setUserEvents(events);
        } catch (error) {
          console.error("Error fetching user events in hook:", error);
          setErrorLoadingEvents(true);
          setUserEvents([]);
        } finally {
          setIsLoadingEvents(false);
        }
      } else {
        setUserEvents([]);
        setIsLoadingEvents(false);
      }
    };

    fetchEvents();
  }, [user]); 

  return { userEvents, isLoadingEvents, errorLoadingEvents };
};
