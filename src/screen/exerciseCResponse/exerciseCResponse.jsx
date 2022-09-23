import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import NavTab from "../../component/navTab/navTab";
import TopBar from "../../component/topBar/topBar";


const ExerciseCResponse = () => {
  const [response, setResponse] = useState([]);
  const [getSortedRes, setGetSortedRes] = useState([]);
  const [updatedRes, setUpdatedRes] = useState([]);
  const [enablePoll, setEnablePoll] = useState(false);
  const [shortedRes, setSortedRes] = useState([]);
  const [resA, setResA] = useState([]);
  const [resB, setResB] = useState([]);

  const ref = React.createRef();
  var topres = [];

  const baseUrl = "https://thriving-mooncake-c43c5f.netlify.app/.netlify/functions/api" //${baseUrl}


  function showTopRes() {
    topres = shortedRes.slice(0, 2);
    setGetSortedRes(topres);
  }

  useEffect(() => {
    showTopRes();
    if (localStorage.getItem("sorted-response")) {
      setUpdatedRes(JSON.parse(localStorage.getItem("sorted-response")));
    }
  }, [updatedRes]);

  async function getAllReponses() {
    await axios
      .get(`${baseUrl}/exercise`)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    
  }
  useEffect(() => {
    getAllReponses();
  }, [response]);

  function htmlToCSV(html, filename) {
    var data = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
      var row = [],
        cols = rows[i].querySelectorAll("td, th");

      console.log(row);
      for (var j = 0; j < cols.length; j++) {
        row.push(cols[j].innerText);
      }

      data.push(row.join(","));
    }

 

    downloadCSVFile(data.join("\n"), filename);
  }

  function downloadCSVFile(csv, filename) {
    var csv_file, download_link;

    csv_file = new Blob([csv], { type: "text/csv" });

    download_link = document.createElement("a");

    download_link.download = filename;

    download_link.href = window.URL.createObjectURL(csv_file);

    download_link.style.display = "none";

    document.body.appendChild(download_link);

    download_link.click();
  }

  function handleCrvDownload() {
    var html = document.querySelector("table").outerHTML;
    htmlToCSV(html, "response.csv");
  }

  async function getResponses() {
    await axios(`${baseUrl}/get/`)
      .then((res) => {
        setEnablePoll(res.data.enablePoll);
        setGetSortedRes(res.data.finalTopFourVote);
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
    <div className="exercise-c-esponse-container">
      <div className="exercise-c-esponse">
        <div className="exercise-c-esponse-top">
          <TopBar />
        </div>
        <div className="exercise-c-esponse-middle">
          <NavTab
            wkBgColor="#fff"
            wkTextColor="#0f74be"
            pvTextColor="#0f74be"
            poTextColor="#0f74be"
            exRBgColor="#0f74be"
            exTextColor="#0f74be"
            exRTextColor="#fff"
          />
        </div>
        <h4 className="exer-c">Living Our Values template for Exercise C – Owning Our Values</h4>

        {response.length === 0 ? (
          <h3>There is no response yet</h3>
        ) : (
          <div className="table-container-data">
            <table className="res-table" style={{ width: "100%" }}>
              <tr className="res-table-tr">
                <th colSpan="2">{resA}</th>
                <th colSpan="2">{resB}</th>
              </tr>
              <tr className="res-table-tr">
                <td>
                  {" "}
                  <h5>
                    In our work place what action is needed to live this value?
                  </h5>
                </td>
                <td>
                  {" "}
                  <h5>How will we hold ourselves accountable?</h5>
                </td>
                <td>
                  {" "}
                  <h5>
                    In our work place what action is needed to live this value?
                  </h5>
                </td>
                <td>
                  {" "}
                  <h5>How will we hold ourselves accountable?</h5>
                </td>
              </tr>
              {response.map((x, i) => {
                return (
                  <tr className="res-table-tr" key={i}>
                    <td className="res-table-td">
                      {response[0 + i].exerciseCFirstA}
                    </td>
                    <td className="res-table-td">
                      {response[0 + i].exerciseCFirstB}
                    </td>
                    <td className="res-table-td">
                      {response[0 + i].exerciseCSecondA}
                    </td>
                    <td className="res-table-td">
                      {response[0 + i].exerciseCSecondB}
                    </td>
                  </tr>
                );
              })}
            </table>
            {/* <div
              onClick={handleCrvDownload}
              className="download-response download-res-con"
              id="download-button"
            >
              Download
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseCResponse;
