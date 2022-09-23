import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "../../component/topBar/topBar";
import "./style.css";
import NavTab from "../../component/navTab/navTab";
import ParticipantContext from "../../provider/participantProvider";
import axios from "axios";
import FacilitatorPollGraph from "../facilitatorPollResult/facilitator-poll-graph";

const PollScreen = () => {
  const { responseState, RESPONSE } = useContext(ParticipantContext);
  const navigate = useNavigate();
  const [topVote, setTopVote] = useState([]);
  const [getSortedRes, setGetSortedRes] = useState([]);
  const [isPollEnd, setIsPollEnd] = useState(false);
  const [enablePoll, setEnablePoll] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showresult, setShowResult] = useState(false);
  const [isPollEmpty, setIsPollEmpty] = useState(false);
  const [finalFourRes, setFinalFourRes] = useState([]);
  const [isVote, setIsVote]=useState(false);

  const [voteInfo, setVoteInfo] = useState({
    allVotes: [],
  });

  var topres = [];

  const baseUrl = "https://thriving-mooncake-c43c5f.netlify.app/.netlify/functions/api" //${baseUrl}


  async function getResponses() {
    await axios(`${baseUrl}/get/`)
      .then((res) => {
        RESPONSE.savePollStatus(res.data.enablePoll);
        setEnablePoll(res.data.enablePoll);
        setIsPollEnd(res.data.endPoll);
        setShowResult(res.data.showResult);
        setIsPollEmpty(res.data.isPollEmpty);//sortedResponse
        setGetSortedRes(res.data.sortedResponse)

      })
      .catch((err) => {
        console.log(err);
      });
  }


  useEffect(() => {
    getResponses();
    setFinalFourRes(getSortedRes.slice(0,4))

   
  }, [getSortedRes]);

  async function handleVote() {

    if(isVote){
      alert("You Already Voted")
      return
     

    }
  
    try {
      if (topVote.length === 2) {
        var newVote = [];
        topVote.map((x) => {
          return newVote.push(x.name);
        });

        await axios
          .put(`${baseUrl}/vote/`, newVote)
          .then((res) => {
          })
          .catch((err) => {
            console.log(err + "error sending vote");
          });

        setSuccess("Vote Successfull!!!");
        setIsVote(true);
        setTimeout(() => {
          setSuccess("");
        }, 6000);
      } else {
        setError("You can only select two options");
        setTimeout(() => {
          setError("");
          console.log("error 1");
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error + "vote not sent");
    }
  }

  return (
    <div className="poll-screen-container">
      <div className="poll-screen">
        <div className="poll-screen-top">
          <TopBar />
        </div>
        <div className="poll-screen-down">
          <NavTab
            wkBgColor="#fff"
            wkTextColor="#0f74be"
            pvTextColor="#0f74be"
            poBgColor="#0f74be"
            poTextColor="#fff"
          />
          <span style={{ color: "red" }}>{error}</span>

          <h4 className="exer-c">Living Our Values template for Exercise B – Poll</h4>


          {enablePoll ? (
            <div className="poll-screen-data-container">
              <h6>
                This polling unit is derived from the response with the highest
                numbers
              </h6>
              <span>You are required to select two options</span>

              <span className="poll-success" >{success && success}</span>

              <div className="topVote-vontainer">
                {finalFourRes.map((item, i) => {
                  return (
                    <div key={i} className="check-box-container">
                      <input
                        onChange={(e) => {
                          // add to list
                          if (e.target.checked) {
                            setTopVote([
                              ...topVote,

                              {
                                name: item,
                                id: i++,
                              },
                            ]);

                          } else {
                            // remove from list

                            setTopVote([topVote.filter((x, i) => x !== item)]);
                          }
                        }}
                        value={topVote}
                        style={{ margin: "20px" }}
                        type="checkbox"
                        id={item.id}
                        className="check-box"
                      />
                      {/* &nbsp; */}
                      <label className="checkboxLabel" htmlFor={item.id}>
                        {item}
                      </label>
                    </div>
                  );
                })}
              </div>

              <div onClick={handleVote} className="poll-vote">
                <span>Vote</span>
              </div>
            </div>
          ) : isPollEmpty ? (
            <span className="poll-endedClass">Poll Ended</span>
          ) : (
            <h4 className="poll-endedClass">No Poll Is Ready</h4>
          )}
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
        </div>
      </div>
    </div>
  );
};

export default PollScreen;
