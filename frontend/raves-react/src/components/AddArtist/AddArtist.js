import React, { useState } from 'react';
import ArtistDataService from '../../services/artists.service';

const AddArtist = () => {
  const initialArtistState = {
    id: null,
    artistname: "",
    artistpicture: Object,
    artistbio: String,
    artistlinks: [String],
    artistdocs: [Object]
  };
  const [artist, setArtist] = useState(initialArtistState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange =  (e) => {
    const {name, value} = e.target;
    setArtist({...artist, [name]: value});
  };

  const saveArtist = () => {
    var data ={
      artistname: artist.artistname,
      artistpicture: artist.artistpicture,
      artistbio: artist.artistbio,
      artistlinks: artist.artistlinks,
      artistdocs: artist.artistdocs
    };
    ArtistDataService.create(data)
      .then(response => {
        setArtist({
          _id: response.data.id,
          artistname: response.data.artistname,
          artistpicture: response.data.artistpicture,
          artistbio: response.data.artistbio,
          artistlinks: response.data.artistlinks,
          artistdocs: response.data.artistdocs
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(err =>{
        console.log(err);
      });
  };
  const newArtist = () => {
    setArtist(initialArtistState);
    setSubmitted(false);
  };
  return(
    <div className="submit-form">
      {submitted ?
        <div>
          <h4>You submitted successfully</h4>
          <button className="btn btn-success" onClick={newArtist}>
            Add
          </button>
        </div>
      :
        <div>
          <div className="form-group">
            <label htmlFor="artistname">Artist Name</label>
            <input type="text"
                   className="form-control"
                   id="artistname"
                   value={artist.artistname}
                   onChange={handleInputChange}
                   name="artistname" />
          </div>
          <div className="form-group">
            <label htmlFor="artistpicture">Artist Profile Picture</label>
            <input type="file"
                   className="form-control"
                   id="artistpicture"
                   value={artist.artistpicture}
                   onChange={handleInputChange}
                   name="aritstpicture"
                   accept="image/png, image/jpeg, image/jpg, image/gif" />
          </div>
          <div className="form-group">
            <label htmlFor="artistbio">Artist Bio</label>
            <textarea className="form-control"
                      id="artistbio"
                      value={artist.artistbio}
                      onChange={handleInputChange}
                      name="artistbio" />
          </div>
          <div className="form-group">
            <label htmlFor="artistlinks">Artist Links</label>
            <input type="text"
                   className="form-control"
                   id="artistlinks"
                   value={artist.artistlinks}
                   onChange={handleInputChange}
                   name="artistlinks" />
          </div>
          <div className="form-group">
            <label htmlFor="artistdocs">Artist Documents</label>
            <input type="file"
                   className="form-control"
                   id="artistdocs"
                   value={artist.artistdocs}
                   onChange={handleInputChange}
                   name="artistdocs"
                   multiple />
          </div>
        </div>
      }
    </div>
  )
}
