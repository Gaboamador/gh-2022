import Home from "./Home";
import ContadorNominaciones from "./ContadorNominaciones";
import VotacionesPorJugador from "./VotacionesPorJugador";
import GraficoVotos from "./GraficoVotos";
import VotacionesPorSemana from "./VotacionesPorSemana";
import PlacasPorSemana from "./PlacasPorSemana";
import PlacasEnContinuado from "./PlacasEnContinuado";
import ListadoLideres from "./ListadoLideres";
import ListadoEliminados from "./ListadoEliminados";


export const navlist = [
    { desc: 'Página principal', link: '', component: Home },
    { desc: 'GALA DE NOMINACIÓN', link: 'ContadorNominaciones', component: ContadorNominaciones},
    { desc: 'Nominaciones',
        submenu: [
            { desc: 'Nominaciones por jugador', link: 'VotacionesPorJugador', component: VotacionesPorJugador },
            { desc: 'Nominaciones por semana', link: 'VotacionesPorSemana', component: VotacionesPorSemana },
            { desc: 'Gráficos de nominaciones', link: 'GraficoVotos', component: GraficoVotos },
        ],
    },
    {desc: 'Placas de Nominados',
        submenu: [
            { desc: 'Placas por semana', link: 'PlacasPorSemana', component: PlacasPorSemana },
            { desc: 'Placas en lista', link: 'PlacasEnContinuado', component: PlacasEnContinuado },
        ],
    },
    { desc: 'Listado de líderes', link: 'ListadoLideres', component: ListadoLideres },
    { desc: 'Listado de eliminados', link: 'ListadoEliminados', component: ListadoEliminados },
  ];