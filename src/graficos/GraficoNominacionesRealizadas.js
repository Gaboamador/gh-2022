import React, { useState, useEffect, useContext} from "react";
import { Collapse} from "react-bootstrap";
import ReactEcharts from "echarts-for-react";
import TitleChart from "../componentes/TitleChart";
import Context from "../context";
import { fetchData } from "../componentes/DataService";

const GraficoNominacionesRealizadas = ({participantName}) => {
  
  const [data, setData] = useState([]);
  const [participantsChart, setParticipantsChart] = useState([]);

  const context= useContext(Context)
  
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const { nominaciones, participantsChart } = await fetchData();
          if (nominaciones && nominaciones.data) {
          setData(nominaciones.data);
            } else {
              console.error('Invalid data format:', nominaciones);
          }        
          if (participantsChart.participantsChart && Array.isArray(participantsChart.participantsChart)) {
          setParticipantsChart(participantsChart.participantsChart)
            } else {
            console.error('Invalid data format:', participantsChart);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    };
  
    fetchDataFromAPI();
  }, []);

//   useEffect(() => {
//   const fetchData = async () => {
//   try {
//     const response = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/nominaciones.json');
//     const jsonData = await response.json();

//     if (jsonData && jsonData.data) {
//       setData(jsonData.data);
//     } else {
//       console.error('Invalid data format:', jsonData);
//     }

// // Fetch data from the second URL
// const response2 = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/participantsChart.json');
// const jsonData2 = await response2.json();

// // Check if the response has a "participants" property
// // if (jsonData.participantsChart && Array.isArray(jsonData.participantsChart)) {
//   if (jsonData2 && Array.isArray(jsonData2.participantsChart)) {
//     setParticipantsChart(jsonData2.participantsChart);
// } else {
//   console.error('Invalid data format:', jsonData2);
// }

//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

//   fetchData();
// }, []);

  // CÁLCULO VECES VOTADO A CADA COMPETIDOR
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
  
const dataEntries = voteCounts[participantName] ? Object.entries(voteCounts[participantName]).sort((a, b) => a[1] - b[1]) : [];
  
  const sortedLabels = dataEntries.map(([label, _]) => label);
  const sortedData = dataEntries.map(([_, value]) => value);

  // CÁLCULO VOTOS DADOS A CADA COMPETIDOR
  const [votesGiven, setVotesGiven] = useState({});
  useEffect(() => {
  const countVotesGiven = (data) => {
    const participants = {};
    for (const week of data) {
      for (const [i, [participant, ...competitors]] of week.entries()) {
        if (!participants[participant]) {
          participants[participant] = {};
        }
        for (let j = 0; j < competitors.length; j++) {
          const competitor = competitors[j];
          if (participantsChart.includes(competitor)) {
            if (!participants[participant][competitor]) {
              participants[participant][competitor] = 0;
            }
            const votes = j === 0 ? 2 : j === 1 ? 1 : 0;
            participants[participant][competitor] += votes;
          }
        }
      }
    }
    return participants;
  };
    setVotesGiven(countVotesGiven(data));
}, [data, participantsChart]);

  const dataEntriesGiven = [];
    for (let i = 0; i < dataEntries.length; i++) {
      const [participant, count] = dataEntries[i];
      const givenCount =  votesGiven[participantName] ? votesGiven[participantName][participant] : [];
      dataEntriesGiven.push([participant, givenCount]);
    }

  const sortedDataGiven = dataEntriesGiven.map(([_, value]) => value);

const options = {
  color: [context.paleta.secundarioClaro],
  series: [
    {
      name: 'Veces votado',
      data: sortedData,
      type: 'bar',
      itemStyle: {
        color: context.paleta.primario,
      },
      label: {
        show: true,
      }
    },
    {
      name: 'Votos dados',
      data: sortedDataGiven,
      type: 'effectScatter',
      colorBy: 'series',
      symbol: 'pin',
      label: {
        show: true,
        position: 'top',
        color: context.paleta.secundarioClaro,
        fontWeight: 'bold',
        distance: 10,
      }
    },
  ],
  legend: {
    show: true,
    top: 5,
  },
  xAxis: {
    type: 'category',
    data: sortedLabels,
    axisLabel: {
      color: 'black',
      interval: 0, // muestra todas las etiquetas
      rotate: 90,
  },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
  },
  
  yAxis: {
    type: 'value',
    max: function (value) {
      return value.max + 1;
  },
    axisLabel: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
  },
  grid: {
    top: '15%',
    left: '5%',
    right: '5%',
    bottom: '10%',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
  },
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
  secondPart=''
  isChartVisible={isChartVisible}
  toggleChartVisibility={toggleChartVisibility}
  />

      <Collapse in={isChartVisible}>
        <div>
          <ReactEcharts option={options} className='grafico'/>
        </div>
      </Collapse>

    </div>
  );
};

export default GraficoNominacionesRealizadas;