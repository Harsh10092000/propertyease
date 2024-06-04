import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const CreateAgentAd = () => {
    const { currentUser } = useContext(AuthContext);
  return (
    <div className="ad-agent-card-wrapper shadow mb-3">

    <div className="ad-agent-card  ">
      <img
        src="images/create-agent.jpg"
        alt="Want to become an Estate Agent ?"
      />
      <div className=" ad-agent-card-text">
        Want to become an
        <p className="mb-0 fs-18">Estate Agent?</p>
      </div>
      <Link to={`/user/user-profile/${currentUser && currentUser[0].login_id}`} className="btn btn-primary reg-btn">
        Register
      </Link>
    </div>
    </div>
  );
};

export default CreateAgentAd;
