import React from "react";
import { Container, Row, Col} from "react-bootstrap";

const LineaDivisoria2 = () => {
return (
<div>
<Container style={{marginTop: 20, marginBottom: 10}}>
<Row>
<Col xs={1} className="lineaDivisoria2" style={{width:'5%', marginLeft:20}}>
</Col>
<Col xs={2}>
</Col>
<Col xs={4} className="lineaDivisoria2" style={{width:'60%'}}>
</Col>
<Col xs={2}>
</Col>
</Row>
</Container>
</div>
);
};

export default LineaDivisoria2;