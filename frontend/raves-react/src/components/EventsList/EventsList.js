import React, {useState, useEffect} from "react";
import EventsDataService from "../../services/events.service";
import {Link} from "react-router-dom";

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(()=>{
    retrieveEvents();
  },[]);

  const retrieveEvents = () => {
    EventsDataService.getAll()
      .then(response => {
        setEvents(response.data.Event);
        console.log(response.data.Event);
      })
      .catch(err=> {
        console.log(err)
      });
  }
  return (
    <div>
      <ul>
        {events && events.map((event)=>(
          <li key={event._id}>
            <p>{event.eventdatetime ? event.eventdatetime : "Event Datetime not found"}</p>
            <p>{event.venuename}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
