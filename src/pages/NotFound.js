import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";

const NotFound = (props) => {
  return (
    <Container>
      <Row className="text-center my-5">
        <h1>Requested page not found!</h1>
      </Row>
    </Container>
  );
};

export default NotFound;
