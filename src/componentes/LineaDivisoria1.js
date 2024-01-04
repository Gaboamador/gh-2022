import React from "react";
import { Container, Row, Col} from "react-bootstrap";

const LineaDivisoria1 = () => {
return (
<div>
<Container style={{marginTop: 20, marginBottom: 20}}>
<Row>
<Col xs={1}>
</Col>
<Col xs={8} className="lineaDivisoria2" style={{width:'60%'}}>
</Col>
<Col xs={1}>
</Col>
<Col xs={2} className="lineaDivisoria2" style={{width:'20%'}}>
</Col>
</Row>
</Container>
</div>
);
};

export default LineaDivisoria1;