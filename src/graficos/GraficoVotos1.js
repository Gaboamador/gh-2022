import React, { useState, useEffect, useContext} from "react";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {AiOutlineUp, AiOutlineDown} from 'react-icons/ai';
import { Container, Collapse} from "react-bootstrap";
// import { useData } from "../data/votacionesData";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import {Chart, ArcElement, RadialLinearScale, PointElement, LineElement, registerables as registerablesjs} from 'chart.js'
import { Bar, Doughnut, chart} from "react-chartjs-2";
import ReactEcharts from "echarts-for-react";
// import {participantsChart} from "../data/participantsData";
import TitleChart from "../componentes/TitleChart";
import { participantsToImage } from "../data/participantsToImage";
import Context from "../context";

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


const GraficoVotos1 = ({participantName}) => {
  
  const [data, setData] = useState([]);
  const [participantsChart, setParticipantsChart] = useState([]);

  const context= useContext(Context)
  
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

// const dataEntries = Object.entries(voteCounts[participantName]).sort((a, b) => a[1] - b[1]);
  
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
  
  
  const chartData = {
  labels: sortedLabels,
  datasets: [
    {
      label: 'Veces votado',
      data: sortedData,
      backgroundColor: "rgba(32, 42, 234, 1)",
      borderColor: "rgba(193, 56, 219, 1)",
      borderWidth: 1,
      hoverBorderWidth: 3,
    },
    {
      type: 'line',
      label: 'Votos dados',
      data: sortedDataGiven,
      /*backgroundColor: "rgba(200, 200, 200, 1)",*/
      backgroundColor: "rgba(193, 56, 219, 1)",
      borderColor: "rgba(193, 56, 219, 1)",
      borderWidth: 0,
      pointRadius: 3.5,
      pointHoverRadius: 5, // Set the point hover radius
      tension: 0.5,
      datalabels: {
        display: true,
        font: {
          color: 'black',
        },
        align: 'top',
        offset: 4,
        color: 'rgba(193, 56, 219, 1)',
        },
    },
  ],
};

  const chartOptions = {
    plugins: {
        datalabels: {
            display: true,
            font: {
                    color: 'black',
                    },
                    align: 'center',
                    offset: 0,
                    color: 'white',
            sort: (a, b) => a.parsed - b.parsed,
                    },
                    title: {
                        display: false,
                      },
                      legend: {
                        labels: {
                          filter: function(legendItem, chartData) {
                            return (
                              legendItem.datasetIndex !==
                              chartData.datasets.findIndex(
                                (ds) => ds.label === participantName
                              )
                            );
                          },
                          // format for the bar chart label
                          generateLabels: function(chart) {
                            let labels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                            labels[0].text = 'Veces votado'; // set the label text
                            return labels;
                          },
                          // format for the line chart label
                          generateLabelsLine: function(chart) {
                            let labels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                            labels[0].text = 'Votos dados'; // set the label text
                            return labels;
                          }
                        }
                      }
                    },
        responsive: true,
            scales: {
                x: {
                stacked: true,
                ticks: {
                    color: 'black',
                  },
                },
                y: {
                suggestedMax: Math.max(...sortedData) + 3,
                stacked: true,
                ticks: {
                    color: 'grey',
                  },
                },
            },
            backgroundColor: "rgba(255, 255, 255, 0.5)", // set the background color to a semi-transparent white
};

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
      {/* <Bar data={chartData} plugins={[ChartDataLabels]} options={chartOptions} 
      className='grafico'/> */}
      <ReactEcharts option={options} className='grafico'/>
      </div>
      </Collapse>

    </div>
  );
};

export default GraficoVotos1;