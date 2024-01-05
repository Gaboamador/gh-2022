import React from "react";
import {AiOutlineUp, AiOutlineDown} from 'react-icons/ai';
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io";

const TitleChart = ({participantName, isChartVisible, toggleChartVisibility, firstPart, secondPart, votesReceived}) => {

    return (
<div className="titleContainer" onClick={toggleChartVisibility}>
    {/* <div className="titleWithArrow"> */}
      <h6
      // style={{backgroundImage: `url(${require('../pictures/HeaderVotaciones.jpg')})`}}
      className="titleWithArrow">
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
      </h6>
    <div className="title-icon-container">
    {isChartVisible ? (
        <IoIosArrowDropupCircle className="icon-circle"/>) :
      <IoIosArrowDropdownCircle className="icon-circle"/>
      }
    </div>
</div>
);
};

export default TitleChart;