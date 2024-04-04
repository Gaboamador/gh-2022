import Context from './context';
import {useState} from 'react'


function GlobalState(props){

  const [selectedParticipant, setSelectedParticipant]=useState('')
  
  const [rowsExportar, setRowsExportar]=useState({})
  const [eliminadosExportar, setEliminadosExportar] = useState({ eliminado1: "", eliminado2: "" });  
  const [invitadoExportar, setInvitadoExportar] = useState("");
  const [votoFinal1Exportar, setVotoFinal1Exportar] = useState("");
  const [votoFinal2Exportar, setVotoFinal2Exportar] = useState("");
  const [noVotaExportar, setNoVotaExportar] = useState([]);
  const [unVotoVale1Exportar, setUnVotoVale1Exportar] = useState([]);
  const [unVotoVale2Exportar, setUnVotoVale2Exportar] = useState([]);
  const [statusExportar, setStatusExportar] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  
  const root = document.documentElement;
    const paleta = {
    textoClaro: getComputedStyle(root).getPropertyValue('--color-texto'),
    primario: getComputedStyle(root).getPropertyValue('--color-primario'),
    primarioClaro: getComputedStyle(root).getPropertyValue('--color-primario-claro'),
    primarioOscuro: getComputedStyle(root).getPropertyValue('--color-primario-oscuro'),
    secundario: getComputedStyle(root).getPropertyValue('--color-secundario'),
    secundarioClaro: getComputedStyle(root).getPropertyValue('--color-secundario-claro'),
    secundarioOscuro: getComputedStyle(root).getPropertyValue('--color-secundario-oscuro'),
    terciario: getComputedStyle(root).getPropertyValue('--color-terciario'),
    terciarioClaro: getComputedStyle(root).getPropertyValue('--color-terciario-claro'),
    terciarioOscuro: getComputedStyle(root).getPropertyValue('--color-terciario-oscuro')
    };

  return (
    <Context.Provider value={{
      paleta:paleta,
      selectedParticipant:selectedParticipant,
      setSelectedParticipant:setSelectedParticipant,
      rowsExportar:rowsExportar,
      setRowsExportar:setRowsExportar,
      eliminadosExportar:eliminadosExportar,
      setEliminadosExportar:setEliminadosExportar,
      invitadoExportar:invitadoExportar,
      setInvitadoExportar:setInvitadoExportar,
      votoFinal1Exportar:votoFinal1Exportar,
      setVotoFinal1Exportar:setVotoFinal1Exportar,
      votoFinal2Exportar:votoFinal2Exportar,
      setVotoFinal2Exportar:setVotoFinal2Exportar,
      noVotaExportar:noVotaExportar,
      setNoVotaExportar:setNoVotaExportar,
      unVotoVale1Exportar:unVotoVale1Exportar,
      setUnVotoVale1Exportar:setUnVotoVale1Exportar,
      unVotoVale2Exportar:unVotoVale2Exportar,
      setUnVotoVale2Exportar:setUnVotoVale2Exportar,
      statusExportar:statusExportar,
      setStatusExportar:setStatusExportar,
      sidebarOpen:sidebarOpen,
      setSidebarOpen:setSidebarOpen,

    }}>
        {props.children}
    </Context.Provider>
  )
}
export default GlobalState;