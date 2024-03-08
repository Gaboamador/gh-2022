import React from "react";
import { Container } from "react-bootstrap";

const Titulos = ({titulo, semana, participante}) => {

return (
<div className="containerTituloPaginas">
    <div className="neon-line">
        <span></span>
        <span></span>
    <h6 className="tituloPaginas">
        {titulo.toUpperCase()}
        {semana && ` ${semana}º SEMANA`}
        {participante && ` ${participante.toUpperCase()}`}
    </h6>
    </div>
</div>
);
};

export default Titulos;