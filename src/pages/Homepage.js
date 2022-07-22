import logo from "../logo.svg";
import { Row, Col } from "react-bootstrap";

const HomePage = (props) => {
  return (
    <section>
      <div className="container">
        <div className="py-4">
          <Row>
            <Col xs={6} className="mx-auto text-center">
              <h1 className="display-4">React CRUD App with Authentication</h1>
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

export default HomePage;
