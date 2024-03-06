import React, { useState, useContext, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import { Collapse, Table } from "react-bootstrap";
// import { useData } from "../data/votacionesData";
// import { participantsChart } from "../data/participantsData";
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

const GraficoVotos3 = ({participantName}) => {

  const [data, setData] = useState([]);
  
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
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


  fetchData();
}, []);    
  
  // const [data] = useData();
  
      const countVotesReceived = (data) => {
        const participants = {};
        for (const week of data) {
          for (const [i, [voter, participant1, participant2]] of week.entries()) {
            if (!participants[participant1]) {
              participants[participant1] = {};
            }
            if (!participants[participant2]) {
              participants[participant2] = {};
            }
      
            participants[participant1][voter] = participants[participant1][voter] ? participants[participant1][voter] + 2 : 2;
            participants[participant2][voter] = participants[participant2][voter] ? participants[participant2][voter] + 1 : 1;
          }
        }
        return participants;
      };
      
      const votesReceived = countVotesReceived(data);
      
      const generateVotesTable = () => {
        const tableRows = [];
    
        if (votesReceived[participantName]) {
          const voters = Object.keys(votesReceived[participantName]);
    
          voters.sort((a, b) => votesReceived[participantName][b] - votesReceived[participantName][a]);
    
      voters.forEach((voter) => {
        const votes = votesReceived[participantName][voter];
        const row = (
          <tr key={voter}>
            <td className='comboBoxNominAnteriores'>{voter}</td>
            <td>{votes}</td>
          </tr>
        );
        tableRows.push(row);
      });
    }

    return (
      <Table striped bordered hover className="tablaGeneral">
        <thead>
          <tr>
            <th>Participante</th>
            <th>Nominaciones</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </Table>
    );
  };

  
      const totalVotesReceived = Object.values(votesReceived[participantName] || {}).reduce(
        (total, votes) => total + votes,
        0
      );
      

      const [isChartVisible, setChartVisibility] = useState(false);

      const toggleChartVisibility = () => {
        setChartVisibility(!isChartVisible);
      };

    return (
        <div>
{/* {totalVotesReceived >= 1 && ( */}
<div>

    <TitleChart
  firstPart='DETALLE DE NOMINACIONES RECIBIDAS POR '
  participantName={participantName}
  secondPart=''
  votesReceived={totalVotesReceived}
  isChartVisible={isChartVisible}
  toggleChartVisibility={toggleChartVisibility}
  />
  
  <Collapse in={isChartVisible}>
  <div style={{marginTop: 10}}>
  {totalVotesReceived > 0 ? (
    
    <div>
  {generateVotesTable()}
  </div>
  ) : (
    <div className="mensajeNoVotado">
      {participantName} no ha recibido votos en contra
      </div>
  )}
  
  </div>
  </Collapse>

</div>
{/* )} */}

</div>
  );
};

export default GraficoVotos3;