import React from "react";
import { Container, Row, Col} from "react-bootstrap";

const LineaDivisoria = ({nLine}) => {

let line;
if (nLine === 1) {
    line = (
    <div>
    <Container style={{marginTop: 20, marginBottom: 10}}>
    <Row>
    <Col xs={1}>
    </Col>
    <Col xs={8} className="lineaDivisoria" style={{width:'60%'}}>
    </Col>
    <Col xs={1}>
    </Col>
    <Col xs={2} className="lineaDivisoria" style={{width:'20%'}}>
    </Col>
    </Row>
    </Container>
    </div>
    );
} else if (nLine === 2) {
    line =  (
    <div>
    <Container style={{marginTop: 20, marginBottom: 10}}>
    <Row>
    <Col xs={1} className="lineaDivisoria" style={{width:'5%', marginLeft:20}}>
    </Col>
    <Col xs={2}>
    </Col>
    <Col xs={4} className="lineaDivisoria" style={{width:'60%'}}>
    </Col>
    <Col xs={2}>
    </Col>
    </Row>
    </Container>
    </div>
    )
}

    return (
<div>
{line}
</div>
);
};

export default LineaDivisoria;