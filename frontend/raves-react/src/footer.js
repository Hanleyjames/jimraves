import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons';


function goToEmail() {
    window.location = "mailto:Raves.party@gmail.com"
}
function goToFacebook() {
    window.location = "https://www.facebook.com/raves.party"
}
function goToInstagram() {
    window.location = "https://www.instagram.com/raves.party"
}

const Footer = () => (
    <div className="footer">
        <p>
            <FontAwesomeIcon className="icon-hover" icon={faEnvelope} onClick={goToEmail} /> Raves.party@gmail.com <FontAwesomeIcon className="icon-hover" icon={faFacebook} onClick={goToFacebook} /> raves.party <FontAwesomeIcon className="icon-hover" icon={faInstagramSquare} onClick={goToInstagram}/> raves.party</p>
    </div>
);

export default Footer;
