import React, {useState, useEffect} from "react";
import ArtistsDataService from "../../../services/artists.service";
import {Link} from "react-router-dom";

const Artist = (props) =>{
  const [isLoaded, setLoaded] = useState(false);
  const [artist, setArtist] = useState({});
  const [user, setUser] = useState(false);
  const [artistId] = useState(props.match.params.id);

  useEffect(()=>{
    isUser();
    retrieveArtist(artistId);
  },[]);
  const isUser = () =>{
    let user = JSON.parse(sessionStorage.getItem('user'));
    if(user){
      setUser(true);
    }
  };
  const retrieveArtist = (id) =>{
    ArtistsDataService.getOne(id)
    .then(response => {
      setArtist(response.data);
      setLoaded(true);
    })
    .catch(err=>{
      console.log(err);
    });
  };
  return(
    <div>
      <p>{artist.artistname}</p>
      <p>{artist.artistbio}</p>
      <ul>
      </ul>
    </div>
  )
}
export default Artist;
