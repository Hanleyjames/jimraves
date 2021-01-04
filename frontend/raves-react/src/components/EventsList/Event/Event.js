import React, {useState, useEffect} from "react";
import EventsDataService from "../../../services/events.service";

const Event = (props) => {
  //Set the state of page loading, event data, user data, and the eventID passed in the url
  const [isLoaded, setLoaded] = useState(false);
  const [event, setEvent] = useState({});
  const [user, setUser] = useState(false);
  const [eventId] = useState(props.match.params.id);

  // When the components are loaded, call the isUser function and retrieve the individual event
  useEffect(()=>{
    isUser();
    retrieveEvent(eventId);
  },[]);
  //isUser gets the sessionStorage item user
  const isUser = () =>{
    let user = JSON.parse(sessionStorage.getItem('user'));
    if(user){
      setUser(true);
    }
  }
  //retrieveEvents takes an Id as a parameter,
  //First take whatever you get back, and set it to response, take the data from that object, and set the events
  //Then setLoaded to true, else catch the error and log it in the console.
  const retrieveEvent = (id) =>{
    EventsDataService.getOne(id)
    .then(response =>{
      setEvent(response.data);
      setLoaded(true);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  console.log(eventId);
  //
  return (
    <div>
      <h3>Artists:</h3>
      <p>{event.artist_names}</p>
      <h3>Event name:</h3>
      <p>{event.eventname}</p>
      <h3>When?</h3>
      <p>{event.eventdate} | {event.eventtime}</p>
      <h3>Where?</h3>
      <p>{event.venuename}</p>
      <h3>Venue phone number</h3>
      <p>{event.venuephone}</p>
    </div>
  )
}
export default Event;
