import React, { useState, useEffect,useContext } from "react";
import { Bar } from "react-chartjs-2";

import axios from "axios";

const FacilitatorPollGraph = () => {
  //
  const [topVote, setTopVote] = useState([]);
  const [sortedVote, setSortedVote] = useState([]);
  const [uniqueVote, setUniqueVote] = useState([]);
  const [sortedVoteString, setSortedVoteString] = useState([]);
  const [sortedVoteNumber, setSortedVoteNumber] = useState([]);


  let allVote = [];
  let sortedVoteStrr = [];
  let sortedVoteNum = [];

  const baseUrl = "https://thriving-mooncake-c43c5f.netlify.app/.netlify/functions/api" //${baseUrl}


  async function getTopVot() {
    await axios(`${baseUrl}/get/`)
      .then((res) => {
        setTopVote(res.data.topTwoVote);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  async function getTopVotData() {
    const map = allVote.reduce(
      (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
      new Map()
    );
    setSortedVote([...map.entries()].sort(({ [1]: a }, { [1]: b }) => b - a));
    sortedVote.map((x) => {
      return sortedVoteStrr.push(x[0]);
    });

    sortedVote.map((x) => {
      return sortedVoteNum.push(x[1]);
    });



    if(sortedVoteNum.length >0){
      axios.put(`${baseUrl}/final-top-four-vote`, sortedVoteString); 

      


    }


    await setUniqueVote(Array.from(new Set(allVote)));

    setSortedVoteString(sortedVoteStrr);
    setSortedVoteNumber(sortedVoteNum);


  }
  async function getFirstVote() {
    topVote.map((x) => {
      return allVote.push(x[0]);
    });
  }
  async function getsecondVote() {
    topVote.map((x) => {
      return allVote.push(x[1]);
    });
  }

  useEffect(() => {
    getTopVot();
    getFirstVote();
    getsecondVote();
    getTopVotData();
  }, [topVote]);


  const barChartData = {
    labels: sortedVoteString,
    datasets: [
      {
        data: sortedVoteNumber,
        label: "",
        borderColor: "#3333ff",
        backgroundColor: "#547db4",
        fill: true,
        animation: false,
      },
    ],
  };

  const barChart = (
    <Bar
      type="bar"
      width={50}
      height={30}
      options={{
        indexAxis: "y",
        plugins: {
          title: {
            display: true,
            // text: "",
          },
          legend: {
            display: false,
            position: "top",
          },
        },
        animation: {
          duration: 0,
        },
      }}
      data={barChartData}
    />
  );

  return barChart;
};

export default FacilitatorPollGraph;
