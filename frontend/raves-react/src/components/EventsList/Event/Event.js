import React, {useState, useEffect} from "react";
import EventsDataService from "../../../services/events.service";
import {Link} from "react-router-dom";

const Event = (props) => {
  const [isLoaded, setLoaded] = useState(false);
  const [event, setEvent] = useState({});
  const [user, setUser] = useState(false);
  const [eventId] = useState(props.match.params.id);
  useEffect(()=>{
    isUser();
    retrieveEvent(eventId);
  },[]);
  const isUser = () =>{
    let user = JSON.parse(sessionStorage.getItem('user'));
    if(user){
      setUser(true);
    }
  }
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
  return (
    <div>
      <p>{event.eventdatetime}</p>
      <p>{event.venuename}</p>
      <p>{event.venuephone}</p>
    </div>
  )
}
export default Event;
