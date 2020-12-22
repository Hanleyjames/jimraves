import React, { useState } from 'react';
import EventDataService from '../../services/events.service';

export default const AddEvent = () => {
  const initialEventState = {
    id: null,
    artist_ids: [null],
    eventdatetime: Date.now(),
    eventlinks: [null],
    venuename:"",
    venuephone: ""
  };
  const [event, setEvent] = useState(initialEventState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setEvent({...event, [name: value]});
  };

  saveEvent = () => {
    var data = {
      artist_ids: [event.artist_ids],
      eventdatetime: event.eventdatetime,
      eventlinks: [event.eventlinks],
      venuename: event.venuename,
      venuephone: event.venuephone
    };
    EventDataService.create(data)
      .then(response => {
        setEvent({
          id: response.data.id,
          artist_ids: response.data.artist_ids,
          eventdatetime: response.data.eventdatetime,
          eventlinks: response.data.eventlinks,
          venuename: response.data.venuename,
          venuephone: response.data.venuephone
        });
        setSubmitted(true);
        console.log(response.data);
      })
      catch.(err => {
        console.log(err);
      });
  };
  const newEvent = () => {
    setEvent(initialEventState);
    setSubmitted(false);
  };
  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted Successfully!</h4>
          <button className="btn btn-success" onClick={newEvent}>
            Add
          </button>
        </div>
      ):(
        <div>
          <div className="form-group">
            <label htmlFor="artist_ids">Artist id</label>
            <input type="text"
                   className="form-control"
                   id="artist_ids"
                   value={event.artist_ids}
                   onChange={handleInputChange}
                   name="artist_ids" />

          </div>
          <div>
            <div className="form-group">
              <label htmlFor="eventdatetime">Event Date</label>
              <input type="datetime-local"
                     className="form-control"
                     id="eventdatetime"
                     value={event.eventdatetime}
                     onChange={handleInputChange}
                     name="eventdatetime" />

          </div>
          <div>
            <div className="form-group">
              <label htmlFor="eventlinks">Event Links</label>
              <input type="text"
                     className="form-control"
                     id="eventlinks"
                     value={event.eventlinks}
                     onChange={handleInputChange}
                     name="eventlinks" />
            </div>
          </div>
          <div>
            <div className="form-group">
              <label htmlFor="venuename">Venue Name</label>
              <input type="text"
                     className="form-control"
                     id="venuename"
                     value={event.venuename}
                     onChange={handleInputChange}
                     name="venuename" />

            </div>
          </div>
          <div>
            <div className="form-group">
              <label htmlFor="venuephone">Venue Phone Number</label>
              <input type="text"
                     className="form-control"
                     id="venuephone"
                     value={event.venuephone}
                     onChange={handleInputChange}
                     name="venuename" />
            </div>
          </div>
        </div>
        <button onClick={saveEvent} className="btn btn-success">
          Submit
        </button>
      )}
    </div>
  );
};
