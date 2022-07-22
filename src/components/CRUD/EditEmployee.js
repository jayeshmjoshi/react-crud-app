import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { getSingleEmployee, updateSingleEmployee } from "../../lib/api";
import { referenceValues } from "../../lib/formValidation.js";

const EditEmployeee = (props) => {
  const navigate = useNavigate();

  const [loadedEmployee, setLoadedEmployee] = useState({
    id: null,
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    age: "",
    emailid: "",
    dateOfBirth: "",
    personalPhone: "",
    workPhone: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    reference: [],
  });

  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState({});

  const { empId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const list = await getSingleEmployee(empId);
      setLoadedEmployee(list);
    }
    fetchData();
  }, [empId]);

  const checkboxHandler = (value, checked, type) => {
    if (type !== "checkbox") return;
    const { reference } = loadedEmployee;
    if (checked) {
      setLoadedEmployee((prevState) => ({
        ...prevState,
        reference: reference ? [...reference, value] : [],
      }));
    } else {
      setLoadedEmployee((prevState) => ({
        ...prevState,
        reference: reference.filter((val) => val !== value),
      }));
    }
  };

  const onChangeHandler = (event) => {
    const { name, value, checked, type } = event.target;

    checkboxHandler(value, checked, type);
    validateInputs(event);

    if (name === "refer") {
      return;
    }
    setLoadedEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateInputs = (e) => {
    if (e.target.value === "") {
      setFormValid(false);
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: true,
      }));
    } else {
      setFormValid(true);
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const fetchUpdatedData = async () => {
      const upData = await updateSingleEmployee(empId, loadedEmployee);
      if (upData) {
        navigate("/dashboard", { replace: true });
      }
    };
    fetchUpdatedData();
  };

  return (
    <Container>
      <Row>
        <Col xs={10} className="mt-5 mx-auto">
          <h2>Update Employee</h2>
        </Col>
        <Col xs={10} className="mt-5 mx-auto">
          <Form onSubmit={onSubmitHandler}>
            <Row>
              <Col xs={3}>
                <Form.Group className="mb-3" controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Select
                    name="title"
                    onChange={onChangeHandler}
                    value={loadedEmployee.title}
                  >
                    <option>Please select</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Miss">Miss</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    onChange={onChangeHandler}
                    value={loadedEmployee.firstName || ""}
                  />
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Form.Group className="mb-3" controlId="formMiddleName">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="middleName"
                    onChange={onChangeHandler}
                    value={loadedEmployee.middleName || ""}
                  />
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Form.Group className="mb-3" controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    onChange={onChangeHandler}
                    value={loadedEmployee.lastName || ""}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={3}>
                <Form.Group className="mb-3" controlId="formAge">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    min="1"
                    max="100"
                    onChange={onChangeHandler}
                    value={loadedEmployee.age || 1}
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3 " controlId="formGender">
                  <Form.Label>Gender</Form.Label>
                  <div className="d-flex justify-content-between my-2">
                    <Form.Check
                      type="radio"
                      name="gender"
                      value="Male"
                      label="Male"
                      onChange={onChangeHandler}
                      checked={"Male" === loadedEmployee.gender}
                    />
                    <Form.Check
                      type="radio"
                      name="gender"
                      value="Female"
                      label="Female"
                      onChange={onChangeHandler}
                      checked={"Female" === loadedEmployee.gender}
                    />
                    <Form.Check
                      type="radio"
                      name="gender"
                      value="Other"
                      label="Other"
                      onChange={onChangeHandler}
                      checked={"Other" === loadedEmployee.gender}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Form.Group className="mb-3" controlId="formDate">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="age"
                    min="1950-01-01"
                    max="2022-12-31"
                    onChange={onChangeHandler}
                    value={String(loadedEmployee.dateOfBirth) || "2022-12-31"}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="emailId"
                    onChange={onChangeHandler}
                    value={loadedEmployee.emailId || ""}
                  />
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Form.Group className="mb-3" controlId="formWorkPhone">
                  <Form.Label>Work Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="workPhone"
                    onChange={onChangeHandler}
                    value={loadedEmployee.workPhone || ""}
                  />
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Form.Group className="mb-3" controlId="formPersonalPhone">
                  <Form.Label>Personal Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="personalPhone"
                    onChange={onChangeHandler}
                    value={loadedEmployee.personalPhone || ""}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={3}>
                <Form.Group className="mb-3" controlId="formCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    onChange={onChangeHandler}
                    value={loadedEmployee.country || ""}
                  />
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Form.Group className="mb-3" controlId="formState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    onChange={onChangeHandler}
                    value={loadedEmployee.state || ""}
                  />
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Form.Group className="mb-3" controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    onChange={onChangeHandler}
                    value={loadedEmployee.city || ""}
                  />
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Form.Group className="mb-3" controlId="formPinCode">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    type="text"
                    name="pincode"
                    onChange={onChangeHandler}
                    value={loadedEmployee.pincode || ""}
                  />
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group className="mb-3" controlId="formRefer">
                  <Form.Label>How did you hear about us?</Form.Label>
                  <Row>
                    {referenceValues.map((ref) => (
                      <Col xs={4} key={ref}>
                        <Form.Check
                          type="checkbox"
                          name="refer"
                          value={ref}
                          label={ref}
                          onChange={onChangeHandler}
                          checked={
                            loadedEmployee.reference
                              ? loadedEmployee.reference.includes(ref)
                              : false
                          }
                        />
                      </Col>
                    ))}
                  </Row>
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditEmployeee;
