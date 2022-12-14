import React, { useState, useContext, useEffect } from "react";
import TopBar from "../../component/topBar/topBar";
import PlentyValueGraph from "../plenaryValues/plentyValueGraph";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import FacilitatorNav from "../../component/navTab/facilitatorNav";
import axios from "axios";
import ParticipantContext from "../../provider/participantProvider";

const FacilitatorBarChart = () => {
  const [pollRes, setPollRes] = useState(null);
  const navigate = useNavigate();
  const {  RESPONSE } = useContext(ParticipantContext);
  const [success, setSuccess] = useState("");

  const baseUrl = "https://thriving-mooncake-c43c5f.netlify.app/.netlify/functions/api" //${baseUrl}


  async function handleCreatePoll() {
    await axios
      .post(`${baseUrl}/poll/`)
      .then((res) => {
        setPollRes(res.data.enablePoll);
        RESPONSE.savePollStatus(res.data);
        console.log({ enablePoll: res.data });
        setSuccess("Poll enabled");
        setTimeout(() => {
          setSuccess("");
          navigate("/facilitator-poll");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="facilitator-bar-chart-container">
      <div className="facilitator-bar-chart">
        <TopBar />
        <div className="facilitator-bar-chat-top">
          <FacilitatorNav
            barBg="#0f74be"
            barColor="#fff"
            ercerColor="#0f74be"
            pollColor="#0f74be"
          />
          <span style={{ color: "green" }}>{success}</span>

          <span>
            This bar chart is a graphical representation of the response from
            highest to lowest
          </span>
          <div className="plenary-bar-chat-container">
            <div className="plenary-bar-chat">
              <PlentyValueGraph />
            </div>
          </div>
        
        </div>
      
      </div>
    </div>
  );
};

export default FacilitatorBarChart;
