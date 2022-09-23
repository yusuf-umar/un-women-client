import React, { useState, useEffect, useContext } from "react";
import TopBar from "../../component/topBar/topBar";
import "./style.css";
import FacilitatorNav from "../../component/navTab/facilitatorNav";
import axios from "axios";
import ParticipantContext from "../../provider/participantProvider";
import FacilitatorPollGraph from "../facilitatorPollResult/facilitator-poll-graph";

const FacilitatorPoll = () => {
  const [topFour, setTopFour] = useState([]);
  const [finalFourRes, setFinalFourRes] = useState([]);

  const {  RESPONSE } = useContext(ParticipantContext);
  const [success, setSuccess] = useState("");
  const [isPollEnded, setIsPollEnded] = useState(false);
  const [isPollEnabled, setIsPollEnabled] = useState(false);
  const [showresult, setShowResult] = useState(false);






  async function handleEndPoll() {
    try {

    
      await axios
        .put("/api/end-poll/")
        .then((res) => {
          RESPONSE.saveEndPoll(res.data.endPoll);
          console.log({ endPoll: res.data });
          setSuccess("Poll Ended");
          setTimeout(() => {
            setSuccess("");
            window.location.reload();
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEnablePoll(e)  {
    e.preventDefault();




    axios
      .put("/api/enable-poll")
      .then((res) => {
     
        setSuccess("Poll Started");

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        // setError(err);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  }
  async function getResponses() {
    await axios("/api/get/")
      .then((res) => {
       
        setTopFour(res.data.sortedResponse);
        // console.log({top:res.data.sortedResponse})
        setIsPollEnabled(res.data.enablePoll);
        // console.log({isPollEnabled:res.data.enablePoll})
     
        setShowResult(res.data.showResult);
        setIsPollEnded(res.data.endPoll);


        

        // console.log({isPollEnabled:isPollEnabled})
        // console.log({endPoll:res.data.endPoll})
        console.log({isPollEnded:isPollEnded})


      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getResponses();

    setFinalFourRes(topFour.slice(0,4))
  

  }, [isPollEnabled, topFour]);

  return (
    <div className="facilitator-poll-container">
      <div className="facilitator-poll">
        <TopBar />
        <div className="facilitator-poll-top">
          <FacilitatorNav
            ercerColor="#0f74be"
            pollBg="#0f74be"
            pollColor="#fff"
          />
        </div>
        <span style={{ color: "green" }}>{success && success}</span>
        <h4 className="exer-c">Living Our Values template for Exercise B – Poll</h4>


        <span style={{ color: "#0f74be" }}>
          These are the top four responses{" "}
        </span>
        <div className="faccilitator-poll-bottom">
          {finalFourRes.map((item, i) => {
            return (
              <div key={i} className="facilitator-check-box-container">
                <span className="checkboxspan">{item}</span>
              </div>
            );
          })}
        </div>
        <div className="show-result-container">
          {showresult && (
            <div className="fa-poll-result">
              <span>These are the results from the poll</span>
              <div className="facilitaor-result-graph">
                <FacilitatorPollGraph />
              </div>
            </div>
          )}
        </div>
        <div className="poll-btn-container">
          {isPollEnded ? (
            <div className="poll-vote" onClick={handleEnablePoll}>  
            <span>Start Poll </span>
          </div>
          ) : !isPollEnabled ? (
            <div className="poll-vote" onClick={handleEnablePoll}>  
              <span>Start Poll </span>
            </div>
          ) : (
            <div className="poll-vote" onClick={handleEndPoll}>
              <span>End Poll & Show Result </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacilitatorPoll;


