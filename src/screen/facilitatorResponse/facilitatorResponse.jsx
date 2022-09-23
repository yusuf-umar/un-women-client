import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import TopBar from "../../component/topBar/topBar";
import axios from "axios";
import FacilitatorNav from "../../component/navTab/facilitatorNav";




const FacilitatorResponse = ({ csvData, fileName }) => {
  
  const [getResponseData, setGetResponseData] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const baseUrl = "https://thriving-mooncake-c43c5f.netlify.app/.netlify/functions/api" //${baseUrl}


  const getResponses = async () => {
    const responseData = await axios.get(`${baseUrl}/get/`);
    getResponseData &&
      setGetResponseData(responseData.data.participantResponse);

    getResponseData.forEach((o, i) => (o.id = i + 1));
  };
  useEffect(() => {
    getResponses();
  }, []);

  function handleSubmit() {}

  async function handleModifileRes(e) {
    e.preventDefault();

    setShowEdit(false);
    await axios
      .put(`${baseUrl}/modify`, getResponseData)
      .then((res) => {
        setSuccess(res);
        console.log(res);
        setTimeout(() => {
          window.location.reload();
        }, 3000);

        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  }

  return (
    <div className="facilitator-response-container">
      <div className="facilitator-response">
        <TopBar />
        <div className="response-top">
          <FacilitatorNav
            responsBg="#0f74be"
            ercerColor="#0f74be"
            pollColor="#0f74be"
            resposeColor="#fff"
          />

<h4 className="exer-c">Living Our Values template for Exercise A – Shared Values</h4>

          <h5>
            Share the values. What are the ones you have in common? Name two and
            write them down.{" "}
          </h5>
          <span>
            The results below are responses given by the participant in the
            survey question above. Also, you can edit the response with errors
            in the spelling{" "}
          </span>
        </div>
        {error && <span style={{ color: "red" }}>{error}</span>}
        {success && <span style={{ color: "green" }}>{success}</span>}
        <form className="response-table" onSubmit={handleSubmit}>
          <div style={{ width: "100%" }} className="table">
            <thead>
              <tr className="table-tr">
                <th className="th">
                  <span className="participant-title">Participant</span>
                </th>
                <th className="th">
                  <div className="tDiv">
                    <span>Response A1</span>
                  </div>
                </th>
                <th className="th">
                  {" "}
                  <div className="tDiv">
                    <span>Response A2</span>
                  </div>
                </th>
              </tr>
            </thead>
            {getResponseData &&
              getResponseData.map((x, i) => {
                return (
                  <tbody>
                    <tr key={i}>
                      <td className="td">
                        <div className="tdDiv">{`Participant 0${i + 1}`}</div>
                      </td>
                      <td className="td">
                        <input
                          disabled={showEdit ? false : true}
                          type="text"
                          name="responseOne"
                          value={x.responseOne}
                          onChange={(e) => {
                            x.responseOne = e.target.value;
                            setGetResponseData([...getResponseData]);
                            console.log({ getResponseData });
                          }}
                        />
                      </td>
                      <td className="td">
                        <input
                          disabled={showEdit ? false : true}
                          type="text"
                          name="responseOne"
                          value={x.responseTwo}
                          onChange={(e) => {
                            x.responseTwo = e.target.value;
                            setGetResponseData([...getResponseData]);
                            console.log({ getResponseData });
                          }}
                        />
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </div>
          {/* ============= */}

          <div className="download-response-container">
            {showEdit ? (
              <div
                onClick={handleModifileRes}
                className="download-response"
                id="download-button"
              >
                Save Response
              </div>
            ) : (
              <div
                onClick={() => setShowEdit(true)}
                className="download-response"
                id="download-button"
              >
                Edit Response
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FacilitatorResponse;
