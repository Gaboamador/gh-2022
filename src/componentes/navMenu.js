import Home from "../pages/Home";
import ContadorNominaciones from "../pages/ContadorNominaciones";
import VotacionesPorJugador from "../pages/VotacionesPorJugador";
import GraficosNominaciones from "../pages/GraficosNominaciones";
import VotacionesPorSemana from "../pages/VotacionesPorSemana";
import PlacasPorSemana from "../pages/PlacasPorSemana";
import PlacasEnContinuado from "../pages/PlacasEnContinuado";
import ListadoLideres from "../pages/ListadoLideres";
import ListadoEliminados from "../pages/ListadoEliminados";


export const navlist = [
    { desc: 'Jugadores', link: '', component: Home },
    { desc: 'GALA DE NOMINACIÓN', link: 'ContadorNominaciones', component: ContadorNominaciones},
    { desc: 'Nominaciones',
        submenu: [
            { desc: 'Nominaciones por jugador', link: 'VotacionesPorJugador', component: VotacionesPorJugador },
            { desc: 'Nominaciones por semana', link: 'VotacionesPorSemana', component: VotacionesPorSemana },
            { desc: 'Gráficos de nominaciones', link: 'GraficosNominaciones', component: GraficosNominaciones },
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