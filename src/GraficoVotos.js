import React, { useState } from "react";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Button, Row, Col, Container, ListGroup, Table, FormCheck, FormSelect } from "react-bootstrap";
import { useData } from "./data";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import { Bar } from "react-chartjs-2";

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
  const chartData = {
    labels: Object.keys(voteCounts[selectedParticipant]).sort(),
    datasets: [
      {
        label: selectedParticipant,
        data: Object.values(voteCounts[selectedParticipant]).sort((a, b) => a - b),
        backgroundColor: "rgba(32, 42, 234, 1)",
        borderColor: "rgba(193, 56, 219, 1)",
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
  
  

  const handleParticipantChange = (event) => {
    setSelectedParticipant(event.target.value);
  };

  console.log(voteCounts);

  return (
<div className="contentChart" style={{
minHeight: '100vh'
}}>

<Container style={{marginBottom:10}}>
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

        <Container style={{marginBottom:5}}>
  <h6 style={{backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})`}} className="tituloTablasNomAnteriores">VOTOS DE {selectedParticipant.toUpperCase()}</h6>
  </Container>

    <Container style={{paddingTop: 20}}>
      <Bar data={chartData} plugins={[ChartDataLabels]} options={chartOptions} />
    </Container>
    </div>
  );
};

export default GraficoVotos;