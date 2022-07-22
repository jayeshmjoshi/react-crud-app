import logo from "../../logo.svg";
import { Row, Col } from "react-bootstrap";

const StartPageContent = (props) => {
  return (
    <section>
      <div className="container">
        <div className="py-4">
          <Row>
            <Col xs={6} className="mx-auto text-center">
              <h1 className="display-1">React Auth App</h1>
              <br />
              <br />
              <img src={logo} className="App-logo img-fluid" alt="logo" />
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default StartPageContent;
