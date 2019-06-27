import React from "react";
import PropTypes from "prop-types";
import LogoMetro from "../../static/logo-metro.png";
import LogoTramway from "../../static/logo-tramway.png";
import LogoRer from "../../static/logo-rer.png";
import LogoNoctilien from "../../static/logo-noctilien.png";
import LogoBus from "../../static/logo-bus.png";

function renderIcon(type) {
    switch (type) {
        case "Métro":
            return LogoMetro;
        case "Tramway":
            return LogoTramway;
        case "RER":
            return LogoRer;
        case "Noctilien":
            return LogoNoctilien;
        case "Bus":
            return LogoBus;
        default:
            return null;
    }
}

const LineCard = (props) => (
    <div className="trafficCard">
        <div className="trafficCard__header">
            <img className="trafficCard__icon" src={renderIcon(props.type)} alt={"Icône de " + props.type + " " + props.lineItem.code} />
            <h2 className="trafficCard__line">{props.lineItem.code}</h2>
        </div>
        <div className="trafficCard__content">
            <p className="trafficCard__title">{props.lineItem.name}</p>
            <p className="trafficCard__message">Directions : {props.lineItem.directions}</p>
        </div>
    </div>
);

LineCard.propTypes = {
    /** The item which is containing traffic information */
    lineItem: PropTypes.object.isRequired,
    /** The type of traffic */
    type: PropTypes.oneOf(['Métro', 'Tramway', 'RER', 'Noctilien', 'Bus']).isRequired
};

export default LineCard;