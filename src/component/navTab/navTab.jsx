import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import ParticipantContext from "../../provider/participantProvider";
import axios from "axios";
const NavTab = ({
  wkBgColor,
  wkTextColor,
  pvBgColor,
  pvTextColor,
  poBgColor,
  poTextColor,
  exBgColor,
  exRBgColor,
  exTextColor,
  exRTextColor,
}) => {
  const [isEnablePoll, setIsEnablePoll] = useState(false);
  const { responseState, RESPONSE } = useContext(ParticipantContext);

  const baseUrl = "https://thriving-mooncake-c43c5f.netlify.app/.netlify/functions/api" //${baseUrl}


  async function getResponses() {
    await axios(`${baseUrl}/get/`)
      .then((res) => {
        RESPONSE.savePollStatus(res.data.endPoll);
        setIsEnablePoll(res.data.enablePoll);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getResponses();
  }, [isEnablePoll]);
  return (
    <>
      <div className="nav-tab-container">
        <Link
          to="/"
          className="nav-tab-text"
          style={{ backgroundColor: wkBgColor }}
        >
          <span style={{ color: wkTextColor }}>Exercise A - Shared Values</span>
        </Link>

        <Link
          to="/plenary-values"
          className="nav-tab-text-off"
          style={{ backgroundColor: pvBgColor }}
        >
          <span style={{ color: pvTextColor }}>Plenary Values</span>
        </Link>

        <Link
          to="/poll-screen"
          className="nav-tab-text-off"
          style={{ backgroundColor: poBgColor }}
        >
          <span style={{ color: poTextColor }}>Exercise B - Poll</span>
        </Link>

        <Link
          to="/exercise-screen"
          className="nav-tab-text-off"
          style={{ backgroundColor: exBgColor }}
        >
          <span style={{ color: exTextColor }}>Exercise C - Owning Our Values</span>
        </Link>
        <Link
          to="/exercise-response"
          className="nav-tab-text-off"
          style={{ backgroundColor: exRBgColor }}
        >
          <span style={{ color: exRTextColor }}>Exercise C Response</span>
        </Link>
      </div>
    </>
  );
};

export default NavTab;
