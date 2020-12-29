import React, {useState, useEffect} from "react";
import ArtistsDataService from "../../services/artists.service";
import {Link} from "react-router-dom";

const ArtistList = () => {
  //Set state for hooks
  const [artists, setArtists] = useState([]);
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
      setArtists(response.data.Artists);
      setLoaded(true);
    })
    .catch(err=>{
      console.log(err)
    })
  };
  return(
    <div>
      {isLoaded ?
        <ul>
          {artists && artists.map((artist)=>(
            <li key={artist._id}>
              <img src={"localhost:3000/"+artist.artistpicture} />
              <p>{artist.artistname}</p>
            </li>
          ))}
        </ul>
      :
        <div>Loading</div>}
    </div>
  )
};
export default ArtistList;
