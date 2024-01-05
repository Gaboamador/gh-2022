import React, { useState, useContext, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import { Collapse } from "react-bootstrap";
import { useData } from "../data/votacionesData";
import { participantsChart } from "../data/participantsData";
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

const GraficoVotos2 = ({participantName}) => {

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
          },
          yAxis: {
            type: 'category',
            data: chartData.xAxisData,
            inverse: true,
            axisLabel: {
                  color: 'black'
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
          <ReactEcharts option={option} style={{minHeight: '90vh'}} className='grafico'/>
          </div>
        </Collapse>
        </div>
  );
};

export default GraficoVotos2;