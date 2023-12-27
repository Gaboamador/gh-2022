import React, { useState, useEffect, useContext} from "react";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Container, Row, Col, FormSelect, Image} from "react-bootstrap";
import { useData } from "./data";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import { Bar, Doughnut} from "react-chartjs-2";
import {Chart, ArcElement, RadialLinearScale, PointElement, LineElement} from 'chart.js'
import {participantsChart} from "./participantsData";
import GraficoVotos3 from "./GraficoVotos3";
import GraficoVotos4 from "./GraficoVotos4";
import { participantsToImage } from "./participantsToImage";
import Context from "./context";

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


const GraficoVotos = () => {
  
  const context= useContext(Context)

  const participantes = participantsChart;

  const [data] = useData();
  // const [selectedParticipant, setSelectedParticipant] = useState(participantes[0]);
  const [selectedParticipant, setSelectedParticipant] = useState(
    context.selectedParticipant !== '' ? context.selectedParticipant : participantes[0]
  );
  
  const selectedParticipantData = participantsChart.filter(participant => participant === selectedParticipant);

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

  const dataEntries = Object.entries(voteCounts[selectedParticipant]).sort((a, b) => a[1] - b[1]);
  
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
  /*const dataEntriesGiven = Object.entries(votesGiven[selectedParticipant]).sort((a, b) => a[1] - b[1]);*/
  const dataEntriesGiven = [];
    for (let i = 0; i < dataEntries.length; i++) {
      const [participant, count] = dataEntries[i];
      const givenCount = votesGiven[selectedParticipant][participant];
      dataEntriesGiven.push([participant, givenCount]);
    }
  const sortedLabelsGiven = dataEntriesGiven.map(([label, _]) => label); 
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

const sortedLabelsChart = participantsData.map(({ participant }) => participant);
const sortedDataChart = participantsData.map(({ averageReceived }) => averageReceived);


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
          weight: 'bold',
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
                    weight: 'bold',
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
                                (ds) => ds.label === selectedParticipant
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
                    font: {
                      weight: 'bold'
                    }
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
  

  const handleParticipantChange = (event) => {
    setSelectedParticipant(event.target.value);
  };

  
  const selectedParticipantIndex = labelsAverages.indexOf(selectedParticipant);

const backgroundColors = dataAverages.map((data, index) => {
  if (index === selectedParticipantIndex) {
    return "rgba(193, 56, 219, 0.5)"; // Use a different color for selected participant
  } else {
    return "rgba(193, 56, 219, 1)";
  }
});

const backgroundColors2 = dataAverages.map((data, index) => {
  if (index === selectedParticipantIndex) {
    return "rgba(32, 42, 234, 0.5)"; // Use a different color for selected participant
  } else {
    return "rgba(32, 42, 234, 1)";
  }
});

  const chartDataStats = {
    labels: labelsAverages,
    datasets: [
      {
        label: 'Por semana',
        data: dataAverages,
        backgroundColor: backgroundColors,
        borderColor: "rgba(32, 42, 234, 1)",
        borderWidth: 1,
        hoverBorderWidth: 3,
      },
      {
        label: 'Por veces votado',
        data: sortedDataChart,
        backgroundColor: backgroundColors2,
        borderColor: "rgba(193, 56, 219, 1)",
        borderWidth: 1,
        hoverBorderWidth: 3,
      },
    ],
  };
  
    const chartOptionsStats = {
      plugins: {
          datalabels: {
              display: true,
              font: {
                      weight: 'bold',
                      },
                      align: 'center',
                      offset: 0,
                      color: 'white',
              formatter: function(value, context) {
                const index = context.dataIndex;
                const dataset = context.chart.data.datasets[0];
                const label = context.chart.data.labels[context.dataIndex];
                if (label === selectedParticipant) {
                  return `${value}`;
                } else {
                  return `${value}`;
                };
              },
              color: function(context) {
                const label = context.chart.data.labels[context.dataIndex];
                if (label === selectedParticipant) {
                  return "rgba(32, 42, 234, 1)";
                } else {
                  return 'white';
                }
              },
              backgroundColor: function(context) {
                const label = context.chart.data.labels[context.dataIndex];
                if (label === selectedParticipant) {
                  return "white";
                } else {
                  return '';
                }
              },
              padding: 10,
              borderRadius: function(context) {
                const label = context.chart.data.labels[context.dataIndex];
                if (label === selectedParticipant) {
                  return 10;
                } else {
                  return 0;
                }
              },
              anchor: function(context) {
                const chart = context.chart;
                const width = chart.width;
                const label = context.chart.data.labels[context.dataIndex];
                if (label === selectedParticipant) {
                  return 'end';
                } else {
                  return 'center';
                }
              }
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
                                  (ds) => ds.label === selectedParticipant
                                )
                              );
                            },
                            // format for the bar chart label
                            generateLabels: function(chart) {
                              let labels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                              labels[0].text = 'Por semana'; // set the label text
                              return labels;
                            },
                             // format for the line chart label
                          generateLabelsLine: function(chart) {
                            let labels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                            labels[0].text = 'Por voto recibido'; // set the label text
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
                    display: false,  
                    color: 'black',
                      font: {
                        weight: 'bold'
                      }
                    },
                  },
                  y: {
                  stacked: true,
                  ticks: {
                    display: false,
                      color: 'grey',
                    },
                  },
              },
              backgroundColor: "rgba(255, 255, 255, 0.5)", // set the background color to a semi-transparent white
            };

  return (
<div className="contentChart" style={{
minHeight: '100vh'
}}>

<Container style={{display:'flex', alignItems: 'center'}}>
  {selectedParticipantData.map((participant) => (
          <div key={participant} style={{ display: 'inline-flex', alignItems: 'flex-end', padding: 5}}>
            <Image src={participantsToImage[selectedParticipant]} width="99px" height="105px" />
          </div>
        ))}
  <FormSelect
    value={selectedParticipant}
    onChange={handleParticipantChange}
    style={{display:'flex', justifyContent:'center', alignItems:'center', width:'50%', margin:'auto'}}
    className="selectNominAnteriores">
    {participantes.map((participant) => (
    <option key={participant}>
    {participant}
    </option>))}
  </FormSelect>
</Container>

<Container style={{marginTop: 20, marginBottom: 20}}>
<Row>
  <Col xs={1}>
  </Col>
  <Col xs={8} className="lineaDivisoria2" style={{width:'60%'}}>
  </Col>
  <Col xs={1}>
  </Col>
  <Col xs={2} className="lineaDivisoria2" style={{width:'20%'}}>
  </Col>
  </Row>
</Container>

  <Container>
  <h6 style={{backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})`}} className="tituloTablasNomAnteriores">NOMINACIONES DE {selectedParticipant.toUpperCase()}</h6>
{/*  <h6 style={{backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})`}} className="tituloTablasNomAnteriores">CANTIDAD DE VECES VOTADOS</h6>*/}
  </Container>

    <Container>
      <Bar data={chartData} plugins={[ChartDataLabels]} options={chartOptions}
      className='grafico'/>
    </Container>

    
    {/* <Container>    
    <h6 style={{marginTop: 10, backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})`}} className="tituloTablasNomAnteriores">PROMEDIO DE VOTOS CONTRA {selectedParticipant.toUpperCase()}</h6>
      <Doughnut data={chartDataStats} plugins={[ChartDataLabels]} options={chartOptionsStats}
      className='grafico'/>
    </Container> */}
    
    <Container style={{marginTop: 20, marginBottom: 20}}>
    <Row>
  <Col xs={1} className="lineaDivisoria2" style={{width:'5%', marginLeft:20}}>
  </Col>
  <Col xs={2}>
  </Col>
  <Col xs={4} className="lineaDivisoria2" style={{width:'60%'}}>
  </Col>
  <Col xs={2}>
  </Col>
  </Row>
</Container>

      <Container>
      <h6 style={{backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})`}} className="tituloTablasNomAnteriores">NOMINACIONES TOTALES RECIBIDAS</h6>
      <GraficoVotos3 participantName={selectedParticipant} className='grafico'/>
      </Container>



      <Container>
      <GraficoVotos4 participantName={selectedParticipant} className='grafico'/>
      </Container>

    </div>
  );
};

export default GraficoVotos;