import React, { useEffect, useState, useRef, useMemo } from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from 'echarts';
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



const GraficoVotos6 = ({ participantName }) => {
  
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

const adaptedArray = Object.entries(participantData).flatMap(([week, participants]) =>
  Object.entries(participants).flatMap(([participant, competitors]) =>
    Object.entries(competitors).map(([competitor, votes]) => [votes, competitor, parseInt(week)])
  )
);

// const adaptedArray = useMemo(() => {
//     return [
//       ["VotesGiven", "Competitor", "Week"],
//       ...Object.entries(participantData).flatMap(([week, participants]) =>
//         Object.entries(participants).flatMap(([participant, competitors]) =>
//           Object.entries(competitors).map(([competitor, votes]) => [votes, competitor, parseInt(week)])
//         )
//       )
//     ];
//   }, [participantData]);

console.log(adaptedArray, "adapted array");


  const [isChartVisible, setChartVisibility] = useState(true);

  const toggleChartVisibility = () => {
    setChartVisibility(!isChartVisible);
  };


  const chartRef = useRef(null);

    useEffect(() => {
        
            // const data = [
            //     ["VotesGiven","Competitor","Week"],
            //     [2,"Lucía",1],
            //     [1,"Isabel",1],
            //     [2,"Lucía",2],
            //     [1,"Isabel",2],
            //     [2,"Axel",2],
            //     [1,"Sabrina",2],
            //     [2,"Lucía",3],
            //     [1,"Isabel",3],
            //     [2,"Axel",3],
            //     [2,"Sabrina",3],
            //     [2,"Florencia",3],
            //     [2,"Lucía",4],
            //     [1,"Isabel",4],
            //     [2,"Axel",4],
            //     [3,"Sabrina",4],
            //     [2,"Florencia",4],
            //     [2,"Emmanuel",4],
            // ];

            const data = adaptedArray
            
            
            const weeks = [];
            for (let i = 0; i < data.length; ++i) {
              if (weeks.length === 0 || weeks[weeks.length - 1] !== data[i][2]) {
                weeks.push(data[i][2]);
              }
            }
    
            let startIndex = 0;
            let startWeek = weeks[startIndex];

            const updateFrequency = 3000;
            const dimension = 0;

            const distinguishableColors = [
                '#145b9e', // --color-primario
                '#602697', // --color-secundario
                '#c138db', // --color-terciario
                '#1e7cd4', // --color-primario-claro
                '#8436ce', // --color-secundario-claro
                '#d868ee', // --color-terciario-claro
                '#0a335a', // --color-primario-oscuro
                '#39155a', // --color-secundario-oscuro
                '#7b238d', // --color-terciario-oscuro
              ];

            const option = {
                grid: {
                    top: 10,
                    bottom: 30,
                    left: 80,
                    right: 50
                  },
                  xAxis: {
                    max: 'dataMax',
                  },
                  dataset: {
                    source: data.filter(function (d) {
                      return d[2] === startWeek;
                    })
                  },
                  yAxis: {
                    type: 'category',
                    inverse: true,
                    axisLabel: {
                      show: true,
                      fontSize: 14,
                    },
                    animationDuration: 300,
                    animationDurationUpdate: 300
                  },
                  series: [
                    {
                      realtimeSort: true,
                      seriesLayoutBy: 'column',
                      type: 'bar',
                      itemStyle: {
                        color: function (param) {
                            // Assign different colors to each bar based on its index
                            // const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272'];
                            const colors = distinguishableColors;
                            return colors[param.dataIndex % colors.length];
                          }
                      },
                      encode: {
                        x: dimension,
                        y: 3
                      },
                      label: {
                        show: true,
                        precision: 1,
                        position: 'right',
                        valueAnimation: true,
                        fontFamily: 'monospace'
                      }
                    }
                  ],
                  // Disable init animation.
                  animationDuration: 0,
                  animationDurationUpdate: updateFrequency,
                  animationEasing: 'linear',
                  animationEasingUpdate: 'linear',
                  graphic: {
                    elements: [
                      {
                        type: 'text',
                        right: 160,
                        bottom: 60,
                        style: {
                          text: startWeek,
                          font: 'bolder 80px monospace',
                          fill: 'rgba(100, 100, 100, 0.25)'
                        },
                        z: 100
                      }
                    ]
                  }
            };
    
            const myChart = echarts.init(chartRef.current);
            myChart.setOption(option);
    
            for (let i = startIndex; i < weeks.length - 1; ++i) {
              (function (i) {
                setTimeout(function () {
                  updateWeek(weeks[i + 1]);
                }, (i - startIndex) * updateFrequency);
              })(i);
            }
    
            function updateWeek(week) {
              let source = data.filter(function (d) {
                return d[2] === week;
              });
              option.series[0].data = source;
              option.graphic.elements[0].style.text = week;
              myChart.setOption(option);
            }

      }, [adaptedArray]); // Run once on mount

  return (
    <div>
      
        <TitleChart
  firstPart='VOTOS TOTALES DADOS POR '
  participantName={participantName}
  secondPart=' (CRONOLOGÍA)'
  isChartVisible={isChartVisible}
  toggleChartVisibility={toggleChartVisibility}
  />

    <Collapse in={isChartVisible}>
      <div>
      {/* <ReactEcharts key={participantName} option={option} style={{marginTop: 10}} className='grafico'/> */}
      {/* <div option={option} style={{ width: '100%', minHeight: '80vh' }} /> */}
      <div ref={chartRef} style={{ width: '100%', height: '400px' }} className='grafico'/>
      </div>
      </Collapse>
      
    </div>
  );
};

export default GraficoVotos6;
