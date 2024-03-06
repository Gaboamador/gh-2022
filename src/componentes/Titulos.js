import React from "react";
import { Container } from "react-bootstrap";

const Titulos = ({titulo, semana, participante}) => {

return (
<Container>
    <h6 className="tituloPaginas">
        {titulo.toUpperCase()}
        {semana && ` ${semana}º SEMANA`}
        {participante && ` ${participante.toUpperCase()}`}
    </h6>
</Container>
);
};

export default Titulos;