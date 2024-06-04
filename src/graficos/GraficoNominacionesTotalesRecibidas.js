import React, { useState, useContext, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import { Collapse } from "react-bootstrap";
import TitleChart from "../componentes/TitleChart";
import Context from "../context";
import { fetchData } from "../componentes/DataService";

const GraficoNominacionesTotalesRecibidas = ({participantName}) => {

  const [data, setData] = useState([]);
  const [participantsChart, setParticipantsChart] = useState([]);

  const context= useContext(Context)
  
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const { nominaciones, participantsChart } = await fetchData();
          if (nominaciones && nominaciones.data) {
          setData(nominaciones.data);
            } else {
              console.error('Invalid data format:', nominaciones);
          }        
          if (participantsChart.participantsChart && Array.isArray(participantsChart.participantsChart)) {
          setParticipantsChart(participantsChart.participantsChart)
            } else {
            console.error('Invalid data format:', participantsChart);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    };
  
    fetchDataFromAPI();
  }, []);

//   useEffect(() => {
//   const fetchData = async () => {
//   try {
//     const response = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/nominaciones.json');
//     const jsonData = await response.json();

//     if (jsonData && jsonData.data) {
//       setData(jsonData.data);

//     } else {
//       console.error('Invalid data format:', jsonData);
//     }

// // Fetch data from the second URL
// const response2 = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/participantsChart.json');
// const jsonData2 = await response2.json();

// // Check if the response has a "participants" property
// // if (jsonData.participantsChart && Array.isArray(jsonData.participantsChart)) {
//   if (jsonData2 && Array.isArray(jsonData2.participantsChart)) {
//     setParticipantsChart(jsonData2.participantsChart);
// } else {
//   console.error('Invalid data format:', jsonData2);
// }

//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };


//   fetchData();
// }, []);  
  
  
  // const [data] = useData();
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

  }, [data, participantsChart]);

  const selectedColor = context.paleta.secundarioClaro;
  const defaultColor = context.paleta.primario;

  const updatedSeriesData = chartData.seriesData.map((item, index) => ({
    value: item,
      itemStyle: {
        color: chartData.xAxisData[index] === participantName ? selectedColor : defaultColor,
        borderColor: chartData.xAxisData[index] === participantName ? defaultColor : selectedColor,
      },
  }));


    const option = {
        legend: {
            
        },
        grid: {
          top: '3%',
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLabel: {
              show: false,
            }
          },
          yAxis: {
            type: 'category',
            data: chartData.xAxisData,
            inverse: true,
            axisLabel: {
                  color: 'black',
                  interval: 0,
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

      const [isChartVisible, setChartVisibility] = useState(false);

  const toggleChartVisibility = () => {
    setChartVisibility(!isChartVisible);
  };

    return (
        <div>
            <TitleChart
  firstPart='NOMINACIONES TOTALES RECIBIDAS (GENERAL)'
  participantName=''
  secondPart=''
  isChartVisible={isChartVisible}
  toggleChartVisibility={toggleChartVisibility}
  />
        <Collapse in={isChartVisible}>
          <div>
          <ReactEcharts option={option} style={{minHeight: '100vh'}} className='grafico'/>
          </div>
        </Collapse>
        </div>
  );
};

export default GraficoNominacionesTotalesRecibidas;