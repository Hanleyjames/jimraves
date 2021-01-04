import React, {useState, useEffect} from "react";
import EventsDataService from "../../services/events.service";
import {Link} from "react-router-dom";

const EventsList = () => {
  //Its like a constructor (state, setter) = (default state);
  const [events, setEvents] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [user, setUser] = useState(false);

  //useEffect is called when the component loads
  useEffect(()=>{
    //Runs these functions
    isUser();
    retrieveEvents();
  },[]);

  //Checks to see if there is a user active
  const isUser =() => {
    //Gets the key of user to see if it exists in sessionStorage
    let user = JSON.parse(sessionStorage.getItem('user'));
    if(user){
      setUser(true);
    }
  }

  // This functions retrieves the events
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
  //When you press the delete button, it runs this function
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
  // check to see if isLoaded is true and then iterate over the array (the button onClick runs a function, this is a weird bug and I am to lazy to figure it out)
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
