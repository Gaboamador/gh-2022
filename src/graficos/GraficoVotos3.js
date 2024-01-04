import React, { useState, useContext, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import { Collapse, Table } from "react-bootstrap";
import { useData } from "../data/votacionesData";
import { participantsChart } from "../data/participantsData";
import TitleChart from "../componentes/TitleChart";

const GraficoVotos3 = ({participantName}) => {

    const [data] = useData();
  
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
      <Table striped bordered hover className="center" style={{marginBottom: 30}}>
        <thead>
          <tr className='encabezadoVotaciones' style={{ backgroundImage: `url(${require('../pictures/HeaderVotaciones.jpg')})` }}>
            <th className='tituloTablaDetalleVotosJugador'>Participante</th>
            <th className='tituloTablaDetalleVotosJugador'>Nominaciones</th>
          </tr>
        </thead>
        <tbody style={{ background: 'rgba(255,255,255,0.6)', backgroundImage: `url(${require('../pictures/FondoPlaca2.jpg')})` }}>
          {tableRows}
        </tbody>
      </Table>
    );
  };

  
      const totalVotesReceived = Object.values(votesReceived[participantName] || {}).reduce(
        (total, votes) => total + votes,
        0
      );
      

      const [isChartVisible, setChartVisibility] = useState(true);

      const toggleChartVisibility = () => {
        setChartVisibility(!isChartVisible);
      };

    return (
        <div>
{totalVotesReceived >= 1 && (
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
    <div>
  {generateVotesTable()}
  </div>
  </Collapse>
</div>
)}

</div>
  );
};

export default GraficoVotos3;