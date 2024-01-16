import React, { useState, useEffect, useContext } from "react";
import ReactEcharts from "echarts-for-react";
import { Collapse } from "react-bootstrap";
// import { useData } from "../data/votacionesData";
// import {participantsChart} from "../data/participantsData";
import TitleChart from "../componentes/TitleChart";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import {Chart, ArcElement, RadialLinearScale, PointElement, LineElement, registerables as registerablesjs} from 'chart.js'
import { Bar, Doughnut, chart} from "react-chartjs-2";

ChartJS.register(...registerablesjs);

Chart.register(
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const GraficoVotos5 = ({ participantName }) => {

  const [data, setData] = useState([]);
  const [participantsChart, setParticipantsChart] = useState([]);
  
  useEffect(() => {
  const fetchData = async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/nominaciones.json');
    const jsonData = await response.json();

    if (jsonData && jsonData.data) {
      setData(jsonData.data);
    } else {
      console.error('Invalid data format:', jsonData);
    }

// Fetch data from the second URL
const response2 = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/participantsChart.json');
const jsonData2 = await response2.json();

// Check if the response has a "participants" property
// if (jsonData.participantsChart && Array.isArray(jsonData.participantsChart)) {
  if (jsonData2 && Array.isArray(jsonData2.participantsChart)) {
    setParticipantsChart(jsonData2.participantsChart);
} else {
  console.error('Invalid data format:', jsonData2);
}

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  fetchData();
}, []);

// const participantes = participantsChart;

const [voteCounts, setVoteCounts] = useState({});
  useEffect(() => {
const countVotes = (data) => {
  const participants = {};
  for (const week of data) {
    for (const [i, [participant, ...competitors]] of week.entries()) {
      if (!participants[participant]) {
        participants[participant] = {};
      }
      for (const competitor of competitors) {
        if (participantsChart.includes(competitor)) {
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
setVoteCounts(countVotes(data));
}, [data, participantsChart]);

// const voteCounts = countVotes(data);

// const dataEntries = Object.entries(voteCounts[participantName]).sort((a, b) => a[1] - b[1]);
const dataEntries = voteCounts[participantName] ? Object.entries(voteCounts[participantName]).sort((a, b) => a[1] - b[1]) : [];


const [votesGiven, setVotesGiven] = useState({});
useEffect(() => {
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
setVotesGiven(countVotesGiven(data));
}, [data, participantsChart]);


// const votesGiven = countVotesGiven(data);

// const dataEntriesGiven = [];
//     for (let i = 0; i < dataEntries.length; i++) {
//       const [participant, count] = dataEntries[i];
//       const givenCount = votesGiven[participantName][participant];
//       dataEntriesGiven.push([participant, givenCount]);
//     }
    
    const dataEntriesGiven = [];
    for (let i = 0; i < dataEntries.length; i++) {
      const [participant, count] = dataEntries[i];
      const givenCount =  votesGiven[participantName] ? votesGiven[participantName][participant] : [];
      dataEntriesGiven.push([participant, givenCount]);
    }

  const accumulateVotes = (votesGiven) => {
    const accumulatedVotes = {};
  
    // Iterate over each participant's weeks
    Object.entries(votesGiven).forEach(([participantName, participantWeeks]) => {
      participantWeeks.forEach((weekData) => {
        const weekNumber = weekData.week;
  
        accumulatedVotes[weekNumber] = accumulatedVotes[weekNumber] || {};
        accumulatedVotes[weekNumber][participantName] = accumulatedVotes[weekNumber][participantName] || {};
  
        // Use votes from previous weeks as a starting point
        for (let prevWeek = 1; prevWeek < weekNumber; prevWeek++) {
          if (votesGiven[participantName][prevWeek - 1] && votesGiven[participantName][prevWeek - 1].votes) {
            Object.entries(votesGiven[participantName][prevWeek - 1].votes).forEach(([competitor, voteCount]) => {
              accumulatedVotes[weekNumber][participantName][competitor] =
                (accumulatedVotes[weekNumber][participantName][competitor] || 0) + voteCount;
            });
          }
        }
  
        // Accumulate new votes for the current week
        if (weekData.votes) {
          Object.entries(weekData.votes).forEach(([competitor, voteCount]) => {
            accumulatedVotes[weekNumber][participantName][competitor] =
              (accumulatedVotes[weekNumber][participantName][competitor] || 0) + voteCount;
          });
        }
      });
    });
  
    return accumulatedVotes;
  };
  
  const accumulatedVotes = accumulateVotes(votesGiven);
  
  const getParticipantData = (accumulatedVotes, participantName) => {
    const participantData = {};
  
    // Iterate over each week in accumulatedVotes
    Object.entries(accumulatedVotes).forEach(([weekNumber, participants]) => {
      if (participants[participantName]) {
        // Include data for the specific participant
        participantData[weekNumber] = { [participantName]: participants[participantName] };
      }
    });
  
    return participantData;
  };
  
  const participantData = getParticipantData(accumulatedVotes, participantName);

// Extracting unique competitor names from the data
const competitorNames = Array.from(new Set(Object.values(participantData).flatMap(week => Object.keys(week[participantName] || {}))));

// Creating the legend data dynamically
const legendData = competitorNames.map(name => ({ name }));

// Creating the xAxis data dynamically based on the number of weeks
const weeks = Object.keys(participantData);
const xAxisData = weeks.map(week => `Semana ${week}`);

// Creating the series data dynamically
const seriesData = competitorNames.map(name => {
  return {
    name: name,
    type: 'line', // or 'bar' based on your preference
    stack: 'Total',
    label: {
      show: true,
      position: 'right'
    },
    areaStyle: {},
    emphasis: {
      focus: 'series'
    },
    data: weeks.map(week => (participantData[week][participantName] && participantData[week][participantName][name]) || 0)
  };
});

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: legendData
    },
    grid: {
      top: '20%',
      left: '5%',
      right: '10%',
      bottom: '0%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: xAxisData,
        axisLabel: {
          color: 'black'
      }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: seriesData
  };

  const [isChartVisible, setChartVisibility] = useState(false);

  const toggleChartVisibility = () => {
    setChartVisibility(!isChartVisible);
  };

  return (
    <div>
      
        <TitleChart
  firstPart='NOMINACIONES DE '
  participantName={participantName}
  secondPart=' POR SEMANA'
  isChartVisible={isChartVisible}
  toggleChartVisibility={toggleChartVisibility}
  />

    <Collapse in={isChartVisible}>
      <div>
      <ReactEcharts key={participantName} option={option} style={{marginTop: 10}} className='grafico'/>
      </div>
      </Collapse>
      
    </div>
  );
};

export default GraficoVotos5;
