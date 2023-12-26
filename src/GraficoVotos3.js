import React, { useState, useContext, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import { Button, Row, Col, Container, ListGroup, Table, FormCheck, FormSelect } from "react-bootstrap";
import { useData } from "./data";
import { participantsChart } from "./participantsData";

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

      // const logVotesData = (participantName) => {
      //   const participantIndex = chartData.xAxisData.indexOf(participantName);
      
      //   if (participantIndex !== -1) {
      //     const participant = chartData.xAxisData[participantIndex];
      //     const totalVotes = chartData.seriesData[participantIndex];
      
      //     const votesData = [
      //       { Participant: participant },
      //       { "Total Votes": totalVotes },
      //       { Contributors: {} },
      //     ];
      
      //     data.forEach((week) => {
      //       week.forEach((names) => {
      //         const voter = names[0];
      //         const participantIndex = names.indexOf(participant);
      
      //         if (participantIndex !== -1 && participantIndex !== 0) {
      //           const contributor = names[1];
      //           const votes = participantIndex === 1 ? 2 : 1;
      
      //           votesData[2][contributor] = {
      //             Votes: (votesData[2][contributor]?.Votes || 0) + votes,
      //             Weeks: (votesData[2][contributor]?.Weeks || []).concat(voter),
      //           };
      //         }
      //       });
      //     });
      
      //     console.log(votesData);
      //   } else {
      //     console.log(`Participant '${participantName}' not found.`);
      //   }
      // };
      
      //       logVotesData(participantName);
      
      

    return (
        <div>
<ReactEcharts option={option} style={{marginTop: '-50px', minHeight: '90vh'}}/>

</div>
  );
};

export default GraficoVotos3;