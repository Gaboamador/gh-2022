import React, { useState } from "react";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Button, Row, Col, Container, ListGroup, Table, FormCheck, FormSelect } from "react-bootstrap";
import { useData } from "../data/votacionesData";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import { Bar, Doughnut, Pie, Radar, Line} from "react-chartjs-2";
import {Chart, ArcElement, RadialLinearScale, PointElement, LineElement} from 'chart.js'
import { participantsChart } from "../data/participantsData";

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

/*const GraficoVotos2 = () => {*/
const GraficoVotos2 = ({ selectedParticipant }) => {
  const participantes = participantsChart;

  const [data, setData] = useData();
  /*const [selectedParticipant, setSelectedParticipant] = useState(participantes[0]);*/
  

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
  labels: sortedLabelsGiven,
  datasets: [
    {
      label: selectedParticipant,
      data: sortedDataGiven,
      backgroundColor: "rgba(193, 56, 219, 1)",
      borderColor: "rgba(32, 42, 234, 1)",
      borderWidth: 1,
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
            color: 'white',
            sort: (a, b) => a.parsed - b.parsed,
                    },
        
                    title: {
                        display: false,
                      },
                    legend: {
                        labels: {
                          filter: function (legendItem, chartData) {
                            return legendItem.datasetIndex !== chartData.datasets.findIndex(ds => ds.label === selectedParticipant);
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
                stacked: true,
                ticks: {
                    color: 'grey',
                  },
                },
            },
        backgroundColor: "rgba(255, 255, 255, 0.2)", // set the background color to a semi-transparent white
};
  
  

  /*const handleParticipantChange = (event) => {
    setSelectedParticipant(event.target.value);
  };*/

  console.log(votesGiven, "TotalesDados");

  return (
<div>

{/*<Container style={{marginBottom:10, marginTop:30}}>
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
              </Container>*/}

        
  <h6 style={{backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})`}} className="tituloTablasNomAnteriores">VOTOS TOTALES DADOS</h6>
  

    
      <Line data={chartData} plugins={[ChartDataLabels]} options={chartOptions} />
    
    </div>
  );
};

export default GraficoVotos2;