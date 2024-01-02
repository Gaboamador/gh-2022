import React, { useState, useContext, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import { Button, Row, Col, Container, ListGroup, Table, FormCheck, FormSelect } from "react-bootstrap";
import { useData } from "../data/votacionesData";
import { participantsChart } from "../data/participantsData";

const GraficoVotos3 = ({participantName}) => {

    const [data] = useData();
  const [chartData, setChartData] = useState({
    xAxisData: [], // for storing names
    seriesData: [], // for storing counts
  });

  useEffect(() => {
    // Calculate counts for each participant in each week
    const counts = data.map((week) => {
      const weekCount = {};
      week.forEach((names) => {
        names.slice(1).forEach((name, index) => {
          weekCount[name] = (weekCount[name] || 0) + (index === 0 ? 2 : 1);
        });
      });
      return weekCount;
    });

    // Initialize chart data
    const xAxisData = participantsChart;
    const seriesData = xAxisData.map((participant) =>
      counts.reduce((total, weekCount) => total + (weekCount[participant] || 0), 0)
    );
    
    // Sort data in descending order
    const sortedIndices = [...Array(xAxisData.length).keys()].sort(
      (a, b) => seriesData[b] - seriesData[a]
    );
    const sortedXAxisData = sortedIndices.map((index) => xAxisData[index]);
    const sortedSeriesData = sortedIndices.map((index) => seriesData[index]);

    // Update state with chart data
    setChartData({
      xAxisData: sortedXAxisData,
      seriesData: sortedSeriesData,
    });

  }, [data]);

  const selectedColor = 'rgba(193, 56, 219, 1)';
  const defaultColor = 'rgba(32, 42, 234, 1)';

  const updatedSeriesData = chartData.seriesData.map((item, index) => ({
    value: item,
      itemStyle: {
        color: chartData.xAxisData[index] === participantName ? selectedColor : defaultColor,
        borderColor: chartData.xAxisData[index] === participantName ? defaultColor : selectedColor,
      },
  }));


    const option = {
        // tooltip: {
        //   trigger: 'axis',
        //   axisPointer: {
        //     type: 'shadow'
        //   }
        // },
        legend: {
            
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
            type: 'value',
          },
          yAxis: {
            type: 'category',
            data: chartData.xAxisData,
            inverse: true,
            axisLabel: {
                textStyle: {
                  fontWeight: 'bold',
                  color: 'black'
                }
              },
          },
          series: [
            {
              type: 'bar',
              data: updatedSeriesData,
              label: {
                show: true,
              },
            },
          ],
      };



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
      <Table striped bordered hover className="center">
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
      


    return (
        <div>
<ReactEcharts option={option} style={{marginTop: '-50px', minHeight: '90vh'}}/>

{totalVotesReceived >= 1 && (
<div>
  <h6 style={{marginBottom:5, backgroundImage: `url(${require('../pictures/HeaderVotaciones.jpg')})`}} className="tituloTablasNomAnteriores">DETALLE DE NOMINACIONES RECIBIDAS ({totalVotesReceived})</h6>
  {generateVotesTable()}
</div>
)}

</div>
  );
};

export default GraficoVotos3;