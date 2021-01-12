import React from "react";
import Moment from "react-moment";

const ProfileExperience = ({
    experience: { company, title, to, from, description },
}) => (
    <div>
        <h3 className="text-dark">{company}</h3>
        <p>
            <Moment format="YYYY/MM/DD">{from}</Moment> -
            {/* {!to ? " Now" : <Moment format="YYYY/MM/DD">{to}</Moment>} */}
            {!to ? " Ahora" : <Moment format="YYYY/MM/DD">{to}</Moment>}
        </p>
        <p>
            {/* <strong>Position: </strong> */}
            <strong>Posición: </strong>
            {title}
        </p>
        <p>
            {/* <strong>Description: </strong> */}
            <strong>Descripción: </strong>
            {description}
        </p>
    </div>
);
ProfileExperience.propTypes = {};

export default ProfileExperience;
