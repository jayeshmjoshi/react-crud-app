import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Col, Container, Row } from "react-bootstrap";
import { getSingleEmployee } from "../../lib/api";

const EmployeeDetail = (props) => {
  const [loadedEmployee, setLoadedEmployee] = useState({});
  const { empId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const list = await getSingleEmployee(empId);

      // const { id: EmployeeID, "First Name": firstName } = list;
      // console.log();
      setLoadedEmployee(list);
    }
    fetchData();
  }, [empId]);

  return (
    <Container>
      <Row>
        <Col xs={6} className="py-3 mx-auto">
          <h1>Employee Detail</h1>
          <Table striped className="mt-3">
            <tbody>
              {Object.entries(loadedEmployee).map(([key, value]) => {
                return (
                  <tr key={key}>
                    <td className="text-center">{`${
                      key.charAt(0).toUpperCase() +
                      key.slice(1).replace(/([a-z])([A-Z])/g, "$1 $2")
                    }`}</td>

                    <td style={{ whiteSpace: "pre" }}>
                      {Array.isArray(value)
                        ? value.join("\r\n")
                        : value.toString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeDetail;
