import React from "react";
import {Row, Col, PageHeader} from "react-bootstrap";

class App extends React.Component {
  constructor(props, context, ...args) {
    super(props, context, ...args);
  }

  render() {
    let {children} = this.props;
    return (
      <Row>
        <Col xs={12}>
          <PageHeader className="text-center">Tic-tac-toe</PageHeader>
        </Col>
        <Col xs={12}>
          {children}
        </Col>
      </Row>
    );
  }
}

export default App;