import React, { useState, useEffect, useContext } from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from 'echarts';
import { Row, Col } from "react-bootstrap";
import { useData } from "../data/votacionesData";
import {participantsChart} from "../data/participantsData";

const GraficoVotos5 = ({ participantName }) => {
//   const [data] = useData();

const [chartRef, setChartRef] = useState(null)

/**/
const participantes = participantsChart;

const [data] = useData();
// const [selectedParticipant, setSelectedParticipant] = useState(participantes[0]);

const selectedParticipantData = participantsChart.filter(participant => participant === participantName);

useEffect(() => {
  // Scroll to the top when the component mounts
  window.scrollTo(0, 0);
}, []); 

const countVotes = (data) => {
  const participants = {};
  for (const week of data) {
    for (const [i, [participant, ...competitors]] of week.entries()) {
      if (!participants[participant]) {
        participants[participant] = {};
      }
      for (const competitor of competitors) {
        if (participantes.includes(competitor)) {
          if (!participants[participant][competitor]) {
            participants[participant][competitor] = 0;
          }
          participants[participant][competitor] += 1;
        }
      }
    }
  }
  return participants;
};
const voteCounts = countVotes(data);

const dataEntries = Object.entries(voteCounts[participantName]).sort((a, b) => a[1] - b[1]);

const sortedLabels = dataEntries.map(([label, _]) => label);
const sortedData = dataEntries.map(([_, value]) => value);


// const countVotesGiven = (data) => {
//   const participants = {};
//   for (const week of data) {
//     for (const [i, [participant, ...competitors]] of week.entries()) {
//       if (!participants[participant]) {
//         participants[participant] = {};
//       }
//       for (let j = 0; j < competitors.length; j++) {
//         const competitor = competitors[j];
//         if (participantes.includes(competitor)) {
//           if (!participants[participant][competitor]) {
//             participants[participant][competitor] = 0;
//           }
//           const votes = j === 0 ? 2 : j === 1 ? 1 : 0;
//           participants[participant][competitor] += votes;
//         }
//       }
//     }
//   }
//   return participants;
// };
const countVotesGiven = (data) => {
  const participants = {};

  for (let weekIndex = 0; weekIndex < data.length; weekIndex++) {
    const week = data[weekIndex];
    for (const [i, [participant, ...competitors]] of week.entries()) {
      if (!participants[participant]) {
        participants[participant] = [];
      }

      const votes = {};
      for (let j = 0; j < competitors.length; j++) {
        const competitor = competitors[j];
        const voteCount = j === 0 ? 2 : j === 1 ? 1 : 0;
        votes[competitor] = voteCount;
      }

      participants[participant].push({
        week: weekIndex + 1,
        votes,
      });
    }
  }

  return participants;
};



const votesGiven = countVotesGiven(data);

const dataEntriesGiven = [];
    for (let i = 0; i < dataEntries.length; i++) {
      const [participant, count] = dataEntries[i];
      const givenCount = votesGiven[participantName][participant];
      dataEntriesGiven.push([participant, givenCount]);
      console.log(votesGiven, "votes given")
    }
  const sortedLabelsGiven = dataEntriesGiven.map(([label, _]) => label); 
  const sortedDataGiven = dataEntriesGiven.map(([_, value]) => value);
/**/



useEffect(() => {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);
    setChartRef(myChart)
    let option;



    const data = sortedDataGiven
// const data = [];
// for (let i = 0; i < 5; ++i) {
//   data.push(Math.round(Math.random() * 200));
// }
// data.push()

option = {
  xAxis: {
    max: 'dataMax'
  },
  yAxis: {
    type: 'category',
    // data: ['A', 'B', 'C', 'D', 'E'],
    data: sortedLabelsGiven,
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300
  },
  series: [
    {
      realtimeSort: true,
      name: 'X',
      type: 'bar',
      data: data,
      label: {
        show: true,
        position: 'right',
        valueAnimation: true
      }
    }
  ],
  legend: {
    show: true
  },
  animationDuration: 0,
  animationDurationUpdate: 3000,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear'
};
function run() {
  for (var i = 0; i < data.length; ++i) {
    if (Math.random() > 0.9) {
      data[i] += Math.round(Math.random() * 2000);
    } else {
      data[i] += Math.round(Math.random() * 200);
    }
  }
  myChart.setOption({
    series: [
      {
        type: 'bar',
        data
      }
    ]
  });
}
setTimeout(function () {
  run();
}, 0);
setInterval(function () {
  run();
}, 3000);

myChart.setOption(option);
  
// Clean up the chart when the component unmounts
return () => {
  myChart.dispose();
};
}, []);






  return (
    <div>
      
          <h6 style={{ marginBottom: 15 }}>Bar Race Chart</h6>
          {/* <div ref={chartRef} id="main" style={{ width: '100%', minHeight: '80vh' }} /> */}
        
      
    </div>
  );
};

export default GraficoVotos5;
