import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from 'echarts';
import { Row, Col } from "react-bootstrap";
import { useData } from "./data";

const GraficoVotos5 = ({ participantName }) => {
//   const [data] = useData();

const [chartRef, setChartRef] = useState(null)

useEffect(() => {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);
    setChartRef(myChart)
    let option;



const data = [];
for (let i = 0; i < 5; ++i) {
  data.push(Math.round(Math.random() * 200));
}
option = {
  xAxis: {
    max: 'dataMax'
  },
  yAxis: {
    type: 'category',
    data: ['A', 'B', 'C', 'D', 'E'],
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300
  },
  series: [
    {
      realtimeSort: true,
      name: 'X',
      type: 'bar',
      data: data,
      label: {
        show: true,
        position: 'right',
        valueAnimation: true
      }
    }
  ],
  legend: {
    show: true
  },
  animationDuration: 0,
  animationDurationUpdate: 3000,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear'
};
function run() {
  for (var i = 0; i < data.length; ++i) {
    if (Math.random() > 0.9) {
      data[i] += Math.round(Math.random() * 2000);
    } else {
      data[i] += Math.round(Math.random() * 200);
    }
  }
  myChart.setOption({
    series: [
      {
        type: 'bar',
        data
      }
    ]
  });
}
setTimeout(function () {
  run();
}, 0);
setInterval(function () {
  run();
}, 3000);

myChart.setOption(option);
  
// Clean up the chart when the component unmounts
return () => {
  myChart.dispose();
};
}, []);

  

  return (
    <div>
      
          <h6 style={{ marginBottom: 15 }}>Bar Race Chart</h6>
          <div ref={chartRef} id="main" style={{ width: '100%', minHeight: '80vh' }} />
        
      
    </div>
  );
};

export default GraficoVotos5;
