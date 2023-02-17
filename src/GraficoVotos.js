import React, { useState } from "react";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Button, Row, Col, Container, ListGroup, Table, FormCheck, FormSelect } from "react-bootstrap";
import { useData } from "./data";
import GraficoVotos2 from "./GraficoVotos2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import { Bar, Doughnut, Pie, Radar, Line} from "react-chartjs-2";
import {Chart, ArcElement, RadialLinearScale, PointElement, LineElement} from 'chart.js'

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
  const participantes = [    "Agustín",    "Alexis",    "Ariel",    "Camila",    "Constanza",    "Daniela",    "Juan",    "Juliana",    "Julieta",    "Lucila",    "Marcos",    "María Laura",    "Martina",    "Maximiliano",    "Mora",    "Nacho",    "Romina",    "Thiago",    "Tomás",    "Walter",  ];

  const [data, setData] = useData();
  const [selectedParticipant, setSelectedParticipant] = useState(participantes[0]);

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
  const dataEntriesGiven = Object.entries(votesGiven[selectedParticipant]).sort((a, b) => a[1] - b[1]);
  const sortedLabelsGiven = dataEntriesGiven.map(([label, _]) => label);
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
    },
    {
      type: 'line',
      label: 'Votos dados',
      data: sortedDataGiven,
      backgroundColor: "rgba(200, 200, 200, 1)",
      borderColor: "rgba(193, 56, 219, 1)",
      borderWidth: 2,
      tension: 0.2,
      datalabels: {
        display: true,
        font: {
          weight: 'bold',
        },
        align: 'top',
        offset: 4,
        color: 'rgba(193, 56, 219, 1)',
        }
      
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

  console.log(voteCounts, "VecesVotados");

  return (
<div className="contentChart" style={{
minHeight: '100vh'
}}>

<Container style={{paddingBottom:10}}>
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

  <Container>
  <h6 style={{marginBottom: 20, backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})`}} className="tituloTablasNomAnteriores">VOTOS DE {selectedParticipant.toUpperCase()}</h6>
{/*  <h6 style={{backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})`}} className="tituloTablasNomAnteriores">CANTIDAD DE VECES VOTADOS</h6>*/}
  </Container>

    <Container >
      <Bar data={chartData} plugins={[ChartDataLabels]} options={chartOptions}/>
    </Container>

    {/*
    <Container style={{paddingTop: 30}}>
    <GraficoVotos2 selectedParticipant={selectedParticipant}/>
    </Container>
    */}

    </div>
  );
};

export default GraficoVotos;