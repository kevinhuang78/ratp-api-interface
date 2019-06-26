import React from "react";
import PropTypes from "prop-types";
import LogoMetro from "../static/logo-metro.png";
import LogoTramway from "../static/logo-tramway.png";
import LogoRer from "../static/logo-rer.png";

function renderIcon(type) {
    switch (type) {
        case "metro":
            return LogoMetro;
        case "tramway":
            return LogoTramway;
        case "rer":
            return LogoRer;
        default:
            return null;
    }
}

const TrafficCard = (props) => (
    <div className="trafficCard">
        <div className="trafficCard__header">
            {
                renderIcon(props.type) &&
                    <img className="trafficCard__icon" src={renderIcon(props.type)} alt={"Icône de " + props.trafficItem.line} />
            }
            <h2 className="trafficCard__line">{renderIcon(props.type) === null && "Métro"} {props.trafficItem.line}</h2>
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
    type: PropTypes.oneOf(['metro', 'tramway', 'rer'])
};

export default TrafficCard;