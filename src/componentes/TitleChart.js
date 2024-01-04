import React from "react";
import {AiOutlineUp, AiOutlineDown} from 'react-icons/ai';
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io";

const TitleChart = ({participantName, isChartVisible, toggleChartVisibility, firstPart, secondPart, votesReceived}) => {

    return (

<div className="titleWithArrow">
<h6
onClick={toggleChartVisibility}
style={{backgroundImage: `url(${require('../pictures/HeaderVotaciones.jpg')})`}}
className="tituloTablasNomAnteriores">
  {/* {isChartVisible ? (
  <IoIosArrowDropupCircle className="icon-circle"/>) :
  <IoIosArrowDropdownCircle className="icon-circle"/>
  }
  &nbsp; */}
  {firstPart}
  {participantName.toUpperCase()}
  {secondPart}
  {votesReceived > 0 && ` (${votesReceived})`}
  &nbsp;
  {isChartVisible ? (
    <IoIosArrowDropupCircle className="icon-circle"/>) :
  <IoIosArrowDropdownCircle className="icon-circle"/>
  }
</h6>
</div>
);
};

export default TitleChart;