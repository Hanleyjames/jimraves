import React, {useState, useEffect} from "react";
import ArtistsDataService from "../../../services/artists.service";
import {Link} from "react-router-dom";

const Artist = (props) =>{
  const [isLoaded, setLoaded] = useState(false);
  const [artist, setArtist] = useState([]);
  const [user, setUser] = useState(false);
  const [artistId] = useState(props.match.params.id);

  useEffect(()=>{
    isUser();
  },[]);
  const isUser = () =>{
    let user = JSON.parse(sessionStorage.getItem('user'));
    if(user){
      setUser(true);
    }
  }
  return(
    <div>
      <p>{props.match.params.id}</p>
    </div>
  )
}
export default Artist;
