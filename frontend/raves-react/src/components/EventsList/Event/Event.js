import React, {useState, useEffect} from "react";
import EventsDataService from "../../../services/events.service";
import {Link} from "react-router-dom";

const Event = (props) => {
  const [isLoaded, setLoaded] = useState(false);
  const [event, setEvent] = useState([]);
  const [user, setUser] = useState(false);
  const [eventId] = useState(props.match.params.id);
  useEffect(()=>{
    isUser();
  },[]);
  const isUser = () =>{
    let user = JSON.parse(sessionStorage.getItem('user'));
    if(user){
      setUser(true);
    }
  }

  console.log(eventId);
  return (
    <div>
      <p>{props.match.params.id}</p>
    </div>
  )
}
export default Event;
