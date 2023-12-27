import React, { useState, useContext, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import { Button, Row, Col, Container, ListGroup, Table, FormCheck, FormSelect, Accordion, Card } from "react-bootstrap";
import { useData } from "./data";
import { participantsChart } from "./participantsData";

const GraficoVotos4 = ({participantName}) => {

    const [data] = useData();

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
              week: weekIndex + 1, // Adjusting week index to start from 1
              votes: votes,
            });
          }
        });
      });
    });
  
    return participantsByWeek;
  };
  
  // Example usage
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
      

    

// const contributorsData = [];
// data.forEach((week, weekIndex) => {
//   week.forEach(([voter, participant1, participant2]) => {
//     const participants = [participant1, participant2];
//     participants.forEach((participant, index) => {
//       if (!contributorsData[weekIndex + 1]) {
//         contributorsData[weekIndex + 1] = {
//           week: weekIndex + 1,
//           participants: {},
//         };
//       }
//       const votes = index === 0 ? 2 : 1;
//       if (!contributorsData[weekIndex + 1].participants[participant]) {
//         contributorsData[weekIndex + 1].participants[participant] = {
//           votesReceived: 0,
//           contributors: [],
//         };
//       }
//       contributorsData[weekIndex + 1].participants[participant].votesReceived += votes;
//       const contributorIndex = contributorsData[weekIndex + 1].participants[participant].contributors.findIndex(
//         (contributor) => contributor.voter === voter
//       );
//       if (contributorIndex === -1) {
//         contributorsData[weekIndex + 1].participants[participant].contributors.push({
//           voter: voter,
//           votesContributed: votes,
//         });
//       } else {
//         contributorsData[weekIndex + 1].participants[participant].contributors[contributorIndex].votesContributed += votes;
//       }
//     });
//   });
// });
// console.log(contributorsData);

const contributorsData = [];

data.forEach((week, weekIndex) => {
  week.forEach(([voter, participant1, participant2]) => {
    const participants = [participant1, participant2];
    participants.forEach((participant, index) => {
      if (participant !== participantName) {
        return; // Skip if the participant doesn't match participantName
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
console.log(contributorsData);

/**/
const generateContributorsTable = () => {
    const tableRows = [];
  
    contributorsData.forEach((weekData) => {
      if (!weekData) {
        return null; // Skip null entries
      }
  
      const { week, participants } = weekData;
  
      const participantsRows = Object.entries(participants).map(([participant, data]) => {
        const { contributors } = data;
  
        if (!contributors || !Array.isArray(contributors)) {
          // Handle unexpected data structure
          console.error('Unexpected data structure for contributors:', contributors);
          return null;
        }
  
        const voterRows = contributors.map(({ voter, votesContributed }) => (
          <tr key={`${voter}-${participant}`}>
            <td className='comboBoxNominAnteriores'>{voter}</td>
            <td>{votesContributed}</td>
          </tr>
        ));
  
        return (
          <React.Fragment key={`${week}-${participant}`}>
            <tr className='encabezadoVotaciones'>
              <th colSpan={2}>
                {`Semana ${week} - ${participant}`}
              </th>
            </tr>
            {voterRows}
          </React.Fragment>
        );
      });
  
      tableRows.push(participantsRows);
    });
    return (
      <Table striped bordered className='center'>
        <tbody style={{ background: 'rgba(255,255,255,0.6)', backgroundImage: `url(${require('./pictures/FondoPlaca2.jpg')})` }}>
          {tableRows.flat()} {/* Flatten the array of rows */}
        </tbody>
      </Table>
    );
  };
  
/**/


    return (
        <div>

{totalVotesReceived >= 1 && (
<>

<Container style={{marginTop: 20, marginBottom: 20}}>
    <Row>
  <Col xs={1} className="lineaDivisoria2" style={{width:'5%', marginLeft:20}}>
  </Col>
  <Col xs={2}>
  </Col>
  <Col xs={4} className="lineaDivisoria2" style={{width:'60%'}}>
  </Col>
  <Col xs={2}>
  </Col>
  </Row>
</Container>
<h6 style={{marginBottom: 15, backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})`}} className="tituloTablasNomAnteriores">NOMINACIONES RECIBIDAS POR SEMANA</h6>
<ReactEcharts option={option} style={{marginTop: '-50px'}}/>
</>
)}

<Accordion defaultActiveKey="0">
        {contributorsData.map((weekData, index) => {
          if (!weekData) {
            return null; // Skip null entries
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
</div>
  );
};

export default GraficoVotos4;