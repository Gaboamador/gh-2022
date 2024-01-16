import React, {useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import { Row, Col, Accordion, Collapse } from "react-bootstrap";
// import { useData } from "../data/votacionesData";
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

const GraficoVotos4 = ({participantName}) => {

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

  const countVotesReceivedByWeek = (data) => {
    const participantsByWeek = {};
  
    data.forEach((week, weekIndex) => {
      week.forEach(([voter, participant1, participant2]) => {
        const participants = [participant1, participant2];
        participants.forEach((participant, index) => {
          if (!participantsByWeek[participant]) {
            participantsByWeek[participant] = [];
          }
  
          const votes = index === 0 ? 2 : 1;
  
          const existingWeek = participantsByWeek[participant].find(
            (entry) => entry.week === weekIndex + 1
          );
  
          if (existingWeek) {
            existingWeek.votes += votes;
          } else {
            participantsByWeek[participant].push({
              week: weekIndex + 1,
              votes: votes,
            });
          }
        });
      });
    });
  
    return participantsByWeek;
  };
  
  const votesReceivedByWeek = countVotesReceivedByWeek(data);
  
  const weeks = Array.from(
    new Set(
      Object.values(votesReceivedByWeek)
        .flat()
        .map((entry) => entry.week)
    )
  );

  const filteredSeries = Object.entries(votesReceivedByWeek)
  .filter(([participant]) => participant === participantName)
  .map(([participant, entries]) => ({
    name: participant,
    type: 'line',
    data: weeks.map((week) => {
      const weekEntry = entries.find((entry) => entry.week === week);
      return weekEntry ? weekEntry.votes : 0;
    }),
  }));

  
    const option = {
        xAxis: {
            type: 'category',
            data: weeks.map((week) => `Semana ${week}`),
            axisLabel: {
              color: 'black'
          },
          },
          yAxis: {
            type: 'value',
          },
          series: filteredSeries,
          label: {
            show: true,
            formatter: '{c}',
            position: 'right',
          },
          grid: {
            top: '10%',
            left: '5%',
            right: '5%',
            bottom: '10%',
            containLabel: true
          },
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
      
      const totalVotesReceived = Object.values(votesReceived[participantName] || {}).reduce(
        (total, votes) => total + votes,
        0
      );

const contributorsData = [];

data.forEach((week, weekIndex) => {
  week.forEach(([voter, participant1, participant2]) => {
    const participants = [participant1, participant2];
    participants.forEach((participant, index) => {
      if (participant !== participantName) {
        return;
      }

      if (!contributorsData[weekIndex + 1]) {
        contributorsData[weekIndex + 1] = {
          week: weekIndex + 1,
          participants: {},
        };
      }

      const votes = index === 0 ? 2 : 1;

      if (!contributorsData[weekIndex + 1].participants[participant]) {
        contributorsData[weekIndex + 1].participants[participant] = {
          votesReceived: 0,
          contributors: [],
        };
      }

      contributorsData[weekIndex + 1].participants[participant].votesReceived += votes;

      const contributorIndex = contributorsData[weekIndex + 1].participants[participant].contributors.findIndex(
        (contributor) => contributor.voter === voter
      );

      if (contributorIndex === -1) {
        contributorsData[weekIndex + 1].participants[participant].contributors.push({
          voter: voter,
          votesContributed: votes,
        });
      } else {
        contributorsData[weekIndex + 1].participants[participant].contributors[contributorIndex].votesContributed += votes;
      }
    });
  });
});

// const [isChartVisible, setChartVisibility] = useState(totalVotesReceived >= 1 && true);
const [isChartVisible, setChartVisibility] = useState(false);

  const toggleChartVisibility = () => {
    setChartVisibility(!isChartVisible);
  };

    return (
        <div>

{/* {totalVotesReceived >= 1 && (
<> */}

  <TitleChart
  firstPart='NOMINACIONES RECIBIDAS POR SEMANA POR '
  participantName={participantName}
  secondPart=''
  isChartVisible={isChartVisible}
  toggleChartVisibility={toggleChartVisibility}
  />

<Collapse in={isChartVisible}>
  <div>
{totalVotesReceived > 0 ? (
<ReactEcharts option={option} className='grafico'/>
) : (
<div className="mensajeNoVotado" style={{marginTop: 10}}>
  {participantName} no ha recibido votos en contra
  </div>
)
}
</div>
</Collapse>
{/* </>
)} */}

<Collapse in={isChartVisible}>
<Accordion defaultActiveKey="0" style={{marginBottom: 30}} className="custom-accordion">
        {contributorsData.map((weekData, index) => {
          if (!weekData) {
            return null;
          }
          const { week, participants } = weekData;
          return (
            <Accordion.Item key={index} eventKey={index.toString()}>
              <Accordion.Header>{`SEMANA ${week}`}</Accordion.Header>
              <Accordion.Body>
                <div >
                  {Object.entries(participants).map(([participant, data]) => {
                    const { contributors } = data;
                    if (!contributors || !Array.isArray(contributors)) {
                      // Handle unexpected data structure
                      console.error('Unexpected data structure for contributors:', contributors);
                      return null;
                    }
                    return contributors.map(({ voter, votesContributed }) => (
                      <Row className='accordionContributors' key={`${voter}-${participant}-${index}`}>
                        <Col >
                        {voter}
                        </Col>
                        <Col >
                        {votesContributed}
                        </Col>
                      </Row>
                    ));
                  })}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
      </Collapse>
</div>
  );
};

export default GraficoVotos4;