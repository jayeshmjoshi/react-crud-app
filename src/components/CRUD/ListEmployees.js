import { useRef } from "react";
import { Row, Col, Form, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ListEmployees = (props) => {
  const searchEl = useRef("");

  const deleteHandler = (delId) => {
    props.onDelete(delId);
  };

  const getSearchTerm = () => {
    props.searchKeyword(searchEl.current.value);
  };

  return (
    <Row>
      <Col xs={12} className="mt-5">
        <Form.Control
          type="text"
          name="searchField"
          value={props.term}
          placeholder="Search Employees"
          onChange={getSearchTerm}
          ref={searchEl}
        />
      </Col>
      <Col xs={12} className="mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Work Phone</th>
              <th>Personal Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.employees.map((emp, index) => {
              return (
                <tr key={emp.id}>
                  <td>{index + 1}</td>
                  <td>{emp.title}</td>
                  <td>{emp.firstName}</td>
                  <td>{emp.middleName}</td>
                  <td>{emp.lastName}</td>
                  <td>{emp.emailId}</td>
                  <td>{emp.workPhone}</td>
                  <td>{emp.personalPhone}</td>
                  <td
                    style={{ whiteSpace: "pre-wrap" }}
                  >{`${emp.country} \n${emp.state} \n${emp.city} \n${emp.pincode}`}</td>
                  <td>
                    <div className="d-flex justify-content-evenly">
                      <Button as={Link} to={`/employee/${emp.id}`}>
                        View
                      </Button>
                      <Button as={Link} to={`/employee/edit/${emp.id}`}>
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure to delete this record?"
                            )
                          ) {
                            deleteHandler(emp.id);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default ListEmployees;
