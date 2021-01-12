import React from "react";
import Moment from "react-moment";

const ProfileEducation = ({
    education: { school, degree, fieldofstudy, to, from, description },
}) => (
    <div>
        <h3 className="text-dark">{school}</h3>
        <p>
            <Moment format="YYYY/MM/DD">{from}</Moment> -
            {/* {!to ? " Now" : <Moment format="YYYY/MM/DD">{to}</Moment>} */}
            {!to ? " Ahora" : <Moment format="YYYY/MM/DD">{to}</Moment>}
        </p>
        <p>
            {/* <strong>Degree: </strong> */}
            <strong>Grado: </strong>
            {degree}
        </p>
        <p>
            {/* <strong>Field Of Study: </strong> */}
            <strong>Campo de estudio: </strong>
            {fieldofstudy}
        </p>
        <p>
            {/* <strong>Description: </strong> */}
            <strong>Descripción: </strong>
            {description}
        </p>
    </div>
);
ProfileEducation.propTypes = {};

export default ProfileEducation;
