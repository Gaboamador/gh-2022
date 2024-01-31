import React, { useState, useEffect } from 'react';
import '../App.css';
import { Button, Container, Table } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { ImSortNumbericDesc } from 'react-icons/im';
import { BsTable } from 'react-icons/bs';

const ListadoEliminados = () => {

/*inicio llamado de datos automaticos*/
const [dataPlaca, setData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/placasNominados.json');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchData();
}, []);
/*fin llamado de datos automaticos*/

const eliminated = [];

dataPlaca.forEach(week => {
    week.data.forEach(participant => {
      if (participant.result.includes('Eliminado')) {
        eliminated.push({...participant, week: week.week + 1, key: `${participant.name}_${week.week + 1}`});
      }
    })
});

const [sortOrder, setSortOrder] = useState(false);

const handleSort = () => {
  setSortOrder(!sortOrder);
}

const sortedData = sortOrder
  ? eliminated.sort((a, b) => {
      const aPercent = Number(a.result.match(/(\d+)/)[0]);
      const bPercent = Number(b.result.match(/(\d+)/)[0]);
      return bPercent - aPercent;
    })
  : eliminated;

return (
    <div className="content" style={{
    backgroundImage: `url(${require('../pictures/FondoPlaca.jpg')})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    zIndex: -1,
    paddingTop: 20,
    minHeight: '100vh'
    }}>

<Container style={{marginBottom:10}}>
  <h6 style={{backgroundImage: `url(${require('../pictures/HeaderVotaciones.jpg')})`}} className="tituloTablasNomAnteriores">LISTADO DE ELIMINADOS</h6>
</Container>

<Container style={{paddingBottom:10, marginTop:10}}>
    <><Button onClick={handleSort} className='buttonSort'>
        {sortOrder ? "Mostrar por defecto " : "Ordenar "}
        {sortOrder ? <BsTable /> : <ImSortNumbericDesc />}
    </Button>
    <Table striped bordered hover className="center">
        <thead style={{ background: 'rgba(40,43,242,0.5)' }}>
        <tr className='encabezadoVotaciones' style={{ marginBottom: '10px', backgroundImage: `url(${require('../pictures/HeaderVotaciones.jpg')})` }}>
        <th className='tituloTablaDetalleVotosJugador' style={{backgroundColor: 'transparent'}}>Semana</th>
        <th className='tituloTablaDetalleVotosJugador' style={{backgroundColor: 'transparent'}}>Nombre</th>
        <th className='tituloTablaDetalleVotosJugador' style={{backgroundColor: 'transparent'}}>Resultado</th>
        </tr>
        </thead>
        <tbody style={{ background: 'rgba(255,255,255,0.6)', backgroundImage: `url(${require('../pictures/FondoPlaca2.jpg')})`}}>
        {sortedData.map(eliminatedPlayer => (
        <tr key={eliminatedPlayer.key}>
        <td className='comboBoxNominAnteriores'>{eliminatedPlayer.week}</td>
        <td>{eliminatedPlayer.name}</td>
        <td>{eliminatedPlayer.result}</td>
        </tr>
        ))}
        </tbody>
    </Table></>

</Container>

  </div>
);
};
export default ListadoEliminados;