import React, { useEffect, useState, useContext } from "react";
import TopBar from "../../component/topBar/topBar";
import "./style.css";
import NavTab from "../../component/navTab/navTab";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ParticipantContext from "../../provider/participantProvider";

const ExerciseScreen = () => {
  const [getSortedRes, setGetSortedRes] = useState([]);
  const [exerciseResData, setExerciseResData] = useState([]);
  const [exerciseCFirstA, setExerciseCFirstA] = useState("");
  const [exerciseCFirstB, setExerciseCFirstB] = useState("");
  const [exerciseCSecondA, setExerciseCSecondA] = useState("");
  const [exerciseCSecondB, setExerciseCSecondB] = useState("");
  const [success, setSuccess] = React.useState("");
  const [enablePoll, setEnablePoll] = useState(false);
  const [shortedRes, setSortedRes] = useState([]);
  const [endPoll, setEndPoll] = useState(false);
  const [resA, setResA] = useState([]);
  const [resB, setResB] = useState([]);

  const baseUrl = "https://thriving-mooncake-c43c5f.netlify.app/.netlify/functions/api" //${baseUrl}


  function handleSubmit(e) {
    e.preventDefault();
    try {
      axios
        .post(`${baseUrl}/exercise/`, {
          exerciseCFirstA,
          exerciseCFirstB,
          exerciseCSecondA,
          exerciseCSecondB,
        })
        .then((res) => {
          setExerciseResData(res.data.topTwoVote);
          setSuccess("Response Sent!");
          setTimeout(() => {
            setSuccess("");
            setExerciseCFirstA("");
            setExerciseCFirstB("");
            setExerciseCSecondA("");
            setExerciseCSecondB("");
            // window.location.reload();
          }, 3000);
        });
    } catch (error) {
      console.log(error);
    }
  }


  async function getResponses() {
    await axios(`${baseUrl}/get/`)
      .then((res) => {

        setEnablePoll(res.data.enablePoll);
        setEndPoll(res.data.endPoll);
        setGetSortedRes(res.data.finalTopFourVote);
        setSortedRes(res.data.finalTopFourVote && res.data.finalTopFourVote);
        setResA(res.data.finalTopFourVote[0])
        setResB(res.data.finalTopFourVote[1])

      
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getResponses();
  }, [resA]);
  return (
    <form className="survey-screen-container" onSubmit={handleSubmit}>
      <div className="survey-screen">
        <TopBar />
        <div className="survey-top">
          <NavTab
            wkBgColor="#fff"
            wkTextColor="#0f74be"
            pvTextColor="#0f74be"
            poTextColor="#0f74be"
            exBgColor="#0f74be"
            exTextColor="#fff"
          />
        </div>

        <h4 className="exer-c">Living Our Values template for Exercise C – Owning Our Values</h4>

        {endPoll ? ( 
          <div className="exercise-screen-text-container">
            <h4>Exercise B(POLL) :</h4>
            <h5>These are the most voted reponses from the polling unit</h5>
            <div className="most-voted-response-text">
              {/* {getSortedRes.map((res, i) => {
                return <span>{res}</span>;
              })} */}

              {resA  +"  "}     {"       -        "}     {resB}
            </div>

            <div className="survey-exercise-table">
              <div className="survey-exercise-table-text"></div>
            </div>
            <div className="survey-exercise-c1">
              <h4>Living Our Values template for Exercise C – Owning Our Values</h4>
              <span className="survey-cla">For each value answer the following (Please use very short sentence. There is a world limit)</span>

            </div>
            {/* <span className="survey-cla">For each value answer the following (Please use very short sentence. There is a world limit)</span> */}

            <h3 className="poll-success">{success && success}</h3>
            <div className="survey-exercise-table">
              <div className="survey-exercise-table-text">
                <div className="table">
                  <tr>
                    <th className="th">
                      <div className="thDiv">
                        <span className="tdDiv-text">{resA}</span>
                      </div>
                    </th>
                    <th className="th">
                      <div className="thDiv">
                        <span>Value</span>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <td className="tdC2">
                      <div className="tdDiv2">
                        In our work place what action is needed to live this
                        value?
                      </div>
                    </td>
                    <td className="td">
                      <input
                        style={{ height: 70 }}
                        type="text"
                        onChange={(e) => setExerciseCFirstA(e.target.value)}
                        name="exerciseCFirstA"
                        value={exerciseCFirstA}
                        maxLength="50"
                        required
                        placeholder="Please use very short sentence."
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="tdC2">
                      <div className="tdDiv2">
                        How will we hold ourselves accountable?
                      </div>
                    </td>
                    <td className="td">
                      <input
                        placeholder="Please use very short sentence."
                        style={{ height: 70 }}
                        type="text"
                        onChange={(e) => setExerciseCFirstB(e.target.value)}
                        name="exerciseCFirstB"
                        value={exerciseCFirstB}
                        maxLength="50"
                        required
                      />
                    </td>
                  </tr>

                  <tr>
                    <th className="th">
                      <div className="thDiv">
                        <span className="tdDiv-text">{resB}</span>
                      </div>
                    </th>
                    <th className="th">
                      <div className="thDiv">
                        <span>Value</span>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <td className="tdC2">
                      <div className="tdDiv2">
                        {" "}
                        In our work place what action is needed to live this
                        value?
                      </div>
                    </td>
                    <td className="td">
                      <input
                        type="text"
                        onChange={(e) => setExerciseCSecondA(e.target.value)}
                        name="exerciseCSecondA"
                        value={exerciseCSecondA}
                        maxLength="50"
                        required
                        style={{ height: 70 }}
                        placeholder="Please use very short sentence."
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="tdC2">
                      <div className="tdDiv2">
                        How will we hold ourselves accountable?
                      </div>
                    </td>
                    <td className="td">
                      <input
                        type="text"
                        onChange={(e) => setExerciseCSecondB(e.target.value)}
                        name="exerciseCSecondB"
                        value={exerciseCSecondB}
                        maxLength="50"
                        required
                        style={{ height: 70 }}
                        placeholder="Please use very short sentence."
                      />
                    </td>
                  </tr>
                </div>
              </div>
            </div>
            <button className="exercise-btn">Submit</button>
          </div>
        ) : (
          <h3>Exercise has not started yet</h3>
        )}
      </div>
    </form>
  );
};

export default ExerciseScreen;
