import React, { useState } from 'react';
import EventDataService from '../../services/events.service';

const AddEvent = () => {
  const initialEventState = {
    id: null,
    artist_names: "",
    eventname: "",
    eventdate: Date.now(),
    eventtime: "",
    eventlinks: [null],
    venuename:"",
    venuephone: ""
  };
  const [event, setEvent] = useState(initialEventState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setEvent({...event, [name]: value});
  };

  const saveEvent = () => {
    var data = {
      artist_names: event.artist_names,
      eventname: event.eventname,
      eventdate: event.eventdate,
      eventtime: event.eventtime,
      eventlinks: [event.eventlinks],
      venuename: event.venuename,
      venuephone: event.venuephone
    };
    EventDataService.create(data)
      .then(response => {
        setEvent({
          _id: response.data.id,
          artist_names: response.data.artist_names,
          eventname: response.data.eventname,
          eventdate: response.data.eventdate,
          eventtime: response.data.eventtime,
          eventlinks: response.data.eventlinks,
          venuename: response.data.venuename,
          venuephone: response.data.venuephone
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const newEvent = () => {
    setEvent(initialEventState);
    setSubmitted(false);
  };
  return (
    <div className="submit-form">
      {submitted ?
        <div>
          <h4>You submitted Successfully!</h4>
          <button className="btn btn-success" onClick={newEvent}>
            Add
          </button>
        </div>
       :
        <div>
          <div className="form-group">
            <label htmlFor="artist_names">Artist names</label>
            <input type="text"
                   className="form-control"
                   id="artist_names"
                   value={event.artist_names}
                   onChange={handleInputChange}
                   name="artist_names" />

          </div>
          <div className="form-group">
            <label htmlFor="eventname">Event Name</label>
            <input type="text"
                   className="form-control"
                   id="eventname"
                   value={event.eventname}
                   onChange={handleInputChange}
                   name="eventname" />

          </div>
          <div className="form-group">
            <label htmlFor="eventtime">Event time</label>
            <input type="text"
                   className="form-control"
                   id="eventtime"
                   value={event.eventtime}
                   onChange={handleInputChange}
                   name="eventtime" />

          </div>
          <div>
            <div className="form-group">
              <label htmlFor="eventdate">Event Date</label>
              <input type="date"
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
                     name="venuephone" />
            </div>
          </div>
        </div>
        <button onClick={saveEvent} className="btn btn-success">
          Submit
        </button>

    </div>
    }
    </div>
  )
};
export default AddEvent;
