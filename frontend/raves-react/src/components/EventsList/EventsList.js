import React, {useState, useEffect} from "react";
import EventsDataService from "../../services/events.service";
import {Link} from "react-router-dom";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const isUser = () => {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if(user){
      return true;
    }else{
      return false;
    }
  };

  useEffect(()=>{
    retrieveEvents();
  },[]);

  const retrieveEvents = () => {
    EventsDataService.getAll()
      .then(response => {
        setEvents(response.data.Event);
        setIsLoading(true);
      })
      .catch(err=> {
        console.log(err)
      });
  }
  return (
    <div>
    {isLoading ?  <ul>
                    {events && events.map((event)=>(
                      <li key={event._id}>
                        <p>{event.eventdatetime ? event.eventdatetime : "Event Datetime not found"}</p>
                        <p>{event.venuename}</p>
                        <p>{isUser ? "simulated delete button":"User is not logged in, show nothing"}</p>
                      </li>
                    ))}
                  </ul>

                :
                <p>Loading Event Data</p> }

    </div>
  );
}

export default EventsList;
