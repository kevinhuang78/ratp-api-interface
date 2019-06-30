import React from "react";
import PropTypes from "prop-types";
import LogoMetro from "../../static/img/logo/logo-metro.png";
import LogoTramway from "../../static/img/logo/logo-tramway.png";
import LogoRer from "../../static/img/logo/logo-rer.png";
import LogoNoctilien from "../../static/img/logo/logo-noctilien.png";
import LogoBus from "../../static/img/logo/logo-bus.png";

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

const TrafficCard = (props) => (
    <div className="trafficCard">
        <div className="trafficCard__header">
            <img className="trafficCard__icon" src={renderIcon(props.type)} alt={"Icône de " + props.type + " " + props.trafficItem.line} />
            <h2 className="trafficCard__line">{props.trafficItem.line}</h2>
        </div>
        <div className="trafficCard__content">
            <p className="trafficCard__title">{props.trafficItem.title}</p>
            <p className="trafficCard__message">{props.trafficItem.message}</p>
        </div>
    </div>
);

TrafficCard.propTypes = {
    /** The item which is containing traffic information */
    trafficItem: PropTypes.object.isRequired,
    /** The type of traffic */
    type: PropTypes.oneOf(['Métro', 'Tramway', 'RER']).isRequired
};

export default TrafficCard;