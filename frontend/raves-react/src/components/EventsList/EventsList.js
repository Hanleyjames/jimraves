import React, {useState, useEffect} from "react";
import EventsDataService from "../../services/events.service";
import {Link} from "react-router-dom";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(()=>{
    isUser();
    retrieveEvents();
  },[]);

  const isUser =() => {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if(user){
      setUser(true);
    }
  }
  const retrieveEvents = () => {
    EventsDataService.getAll()
      .then(response => {
        setEvents(response.data.Events);
        setLoaded(true);
      })
      .catch(err=> {
        console.log(err)
      });
  };
  const deleteEvent = (id) =>{
    EventsDataService.remove(id)
      .then(response =>{
        console.log("Item Removed");
        setLoaded(false)
        setEvents([]);
        retrieveEvents();
      })
      .catch(err => {console.log(err)})
  };
  function handleClick(id) {
    return deleteEvent(id);
  };

  return (
    <div>
    {isLoaded ?  <ul>
                    {events && events.map((event)=>(
                      <li key={event._id}>
                        <Link className="btn btn-info" to={`/events/${event._id}`}>Show Event Details</Link>
                        <h3>Artists:</h3>
                        <p>{event.artist_names}</p>
                        <h3>Event name</h3>
                        <p>{event.eventname}</p>
                        <h3>Event Date</h3>
                        <p>{event.eventdate } | {event.eventtime}</p>
                        <p>{user ? <button className="btn btn-danger" onClick={()=> handleClick(event._id)} >Delete</button>:"User is not logged in, show nothing"}</p>
                      </li>
                    ))}
                  </ul>

                :
                <p>Loading Event Data</p> }

    </div>
  );
}

export default EventsList;
