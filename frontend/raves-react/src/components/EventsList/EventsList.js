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
        setEvents(response.data.Event);
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
                        <p>{event.eventdatetime ? event.eventdatetime : "Event Datetime not found"}</p>
                        <p>{event.venuename}</p>
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
