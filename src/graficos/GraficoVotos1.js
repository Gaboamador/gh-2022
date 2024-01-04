import React, { useState, useEffect, useContext} from "react";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {AiOutlineUp, AiOutlineDown} from 'react-icons/ai';
import { Container, Collapse} from "react-bootstrap";
import { useData } from "../data/votacionesData";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import { Bar, Doughnut} from "react-chartjs-2";
import {Chart, ArcElement, RadialLinearScale, PointElement, LineElement} from 'chart.js'
import {participantsChart} from "../data/participantsData";
import TitleChart from "../componentes/TitleChart";
import { participantsToImage } from "../data/participantsToImage";
import Context from "../context";


Chart.register(
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const GraficoVotos1 = ({participantName}) => {
  
    const participantes = participantsChart;

  const [data] = useData();
  
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

 
  const countVotesGiven = (data) => {
    const participants = {};
    for (const week of data) {
      for (const [i, [participant, ...competitors]] of week.entries()) {
        if (!participants[participant]) {
          participants[participant] = {};
        }
        for (let j = 0; j < competitors.length; j++) {
          const competitor = competitors[j];
          if (participantes.includes(competitor)) {
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
  
  const votesGiven = countVotesGiven(data);

  const dataEntriesGiven = [];
    for (let i = 0; i < dataEntries.length; i++) {
      const [participant, count] = dataEntries[i];
      const givenCount = votesGiven[participantName][participant];
      dataEntriesGiven.push([participant, givenCount]);
    }

  const sortedDataGiven = dataEntriesGiven.map(([_, value]) => value);

/*PROMEDIOS DE VOTACIÓN POR SEMANA*/
const voteStats = {};

for (const [voter, votes] of Object.entries(votesGiven)) {
  for (const [participant, count] of Object.entries(votes)) {
    // If the participant has not been seen yet, initialize the stats object for them
    if (!voteStats[participant]) {
      voteStats[participant] = { votes: 0, weeks: 0 };
    }

    // Add the current count to the participant's total vote count and increment the weeks voted for
    voteStats[participant].votes += count;
    voteStats[participant].weeks += 1;
  }
}

// Calculate the average vote for each participant and create an array of [participant, average]
const voteAverages = Object.entries(voteStats).map(([participant, stats]) => {
  const average = stats.votes / stats.weeks;
  return [participant, Number(average.toFixed(1))];
});

// Sort the array by average vote, highest first
voteAverages.sort((a, b) => b[1] - a[1]);

const labelsAverages = voteAverages.map(([participant]) => participant);
const dataAverages = voteAverages.map(([, average]) => average);

/*PROMEDIOS DE VOTACIÓN POR VECES VOTADO*/
const participantsData = participantes.map((participant) => {
  const timesVoted = Object.values(voteCounts[participant]).reduce((a, b) => a + b, 0);
  const votesReceived = Object.values(votesGiven[participant]).reduce((a, b) => a + b, 0);
  const averageReceived = (votesReceived / timesVoted).toFixed(2);
  return {
    participant: participant,
    timesVoted,
    votesReceived,
    averageReceived,
  };
});

// Sort the participantsData array in the order of dataAverages
participantsData.sort((a, b) => {
  const averageA = dataAverages[labelsAverages.indexOf(a.participant)];
  const averageB = dataAverages[labelsAverages.indexOf(b.participant)];
  return averageB - averageA;
});


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
  

const [isChartVisible, setChartVisibility] = useState(true);

  const toggleChartVisibility = () => {
    setChartVisibility(!isChartVisible);
  };

  return (
<div>

  <Container>

  <TitleChart
  firstPart='NOMINACIONES DE '
  participantName={participantName}
  secondPart=''
  isChartVisible={isChartVisible}
  toggleChartVisibility={toggleChartVisibility}
  />

       <Collapse in={isChartVisible}>
        <div>
      <Bar data={chartData} plugins={[ChartDataLabels]} options={chartOptions}
      className='grafico'/>
      </div>
      </Collapse>

    </Container>


    </div>
  );
};

export default GraficoVotos1;