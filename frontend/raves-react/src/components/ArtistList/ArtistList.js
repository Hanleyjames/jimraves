import React, {useState, useEffect} from "react";
import ArtistsDataService from "../../services/artists.service";
import {Link} from "react-router-dom";

const ArtistList = () => {
  //Set state for hooks
  const [artists, setArtist] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(()=>{
    isUser();
    retrieveArtists();
  },[]);

  const isUser = () => {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if(user){
      setUser(true);
    }
  };
  const retrieveArtists = () =>{
    ArtistsDataService.getAll()
    .then(response => {
      setArtist(response.data.Artists);
      setLoaded(true);
    })
    .catch(err=>{
      console.log(err)
    })
  };
  return(
    <div>
      {isLoaded ?
        <ul></ul>
      :
        <div>Loading</div>}
    </div>
  )
};
export default ArtistList;
