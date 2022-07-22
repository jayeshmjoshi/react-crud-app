import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addEmployeee } from "../../lib/api";
import {
  checkFormValidity,
  referenceValues,
} from "../../lib/formValidation.js";

import "../../lib/formValidation.js";

const AddEmployeee = (props) => {
  const [formValid, setFormValid] = useState(false);
  const [inputValues, setInputValues] = useState({ reference: [] });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const checkboxHandler = (value, checked, type) => {
    const { reference } = inputValues;
    if (type !== "checkbox") return;
    if (checked) {
      setInputValues((prevState) => ({
        ...prevState,
        reference: [...reference, value],
      }));
    } else {
      setInputValues((prevState) => ({
        ...prevState,
        reference: reference.filter((val) => val !== value),
      }));
    }
  };

  const onChangeHandler = (event) => {
    const { name, value, checked, type } = event.target;

    checkboxHandler(value, checked, type);

    if (name === "refer") {
      return;
    }
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateInputs = (event) => {
    const { name, value, type } = event.target;
    const { errName, isError, errorMessage } = checkFormValidity(
      name,
      value,
      type
    );
    setErrors((prevError) => ({
      ...prevError,
      [errName]: {
        errName: errName,
        isError: isError,
        errorMessage: errorMessage,
      },
    }));
  };

  // const validateInputs = (e) => {
  //   if (e.target.value === "") {
  //     setFormValid(false);
  //     setErrors((prev) => ({
  //       ...prev,
  //       [e.target.name]: true,
  //     }));
  //   } else {
  //     setFormValid(true);
  //   }
  // };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const fetchAddedData = async () => {
      const addData = await addEmployeee(inputValues);
      if (addData) {
        navigate("/dashboard", { replace: true });
      }
    };
    fetchAddedData();
  };

  return (
    <Container>
      <Row>
        <Col xs={10} className="mt-5 mx-auto">
          <h2>Add Employee</h2>
        </Col>
        <Col xs={10} className="mt-5 mx-auto">
          <Form onSubmit={onSubmitHandler}>
            <Row>
              <Col xs={3}>
                <Form.Group className="mb-3" controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Select name="title" onChange={onChangeHandler}>
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
                    onBlur={validateInputs}
                    isInvalid={
                      errors.firstName ? errors.firstName.isError : false
                    }
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName && errors.firstName.errorMessage}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Form.Group className="mb-3" controlId="formMiddleName">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="middleName"
                    onChange={onChangeHandler}
                    onBlur={validateInputs}
                    isInvalid={
                      errors.middleName ? errors.middleName.isError : false
                    }
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.middleName && errors.middleName.errorMessage}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Form.Group className="mb-3" controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    onChange={onChangeHandler}
                    onBlur={validateInputs}
                    isInvalid={
                      errors.lastName ? errors.lastName.isError : false
                    }
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName && errors.lastName.errorMessage}
                  </Form.Control.Feedback>
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
                    required
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
                    />
                    <Form.Check
                      type="radio"
                      name="gender"
                      value="Female"
                      label="Female"
                      onChange={onChangeHandler}
                    />
                    <Form.Check
                      type="radio"
                      name="gender"
                      value="Other"
                      label="Other"
                      onChange={onChangeHandler}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Form.Group className="mb-3" controlId="formDate">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateOfBirth"
                    min="1950-01-01"
                    max="2022-12-31"
                    onChange={onChangeHandler}
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
                    onBlur={validateInputs}
                    isInvalid={
                      errors.workPhone ? errors.workPhone.isError : false
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.workPhone && errors.workPhone.errorMessage}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Form.Group className="mb-3" controlId="formPersonalPhone">
                  <Form.Label>Personal Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="personalPhone"
                    onChange={onChangeHandler}
                    onBlur={validateInputs}
                    isInvalid={
                      errors.personalPhone
                        ? errors.personalPhone.isError
                        : false
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.personalPhone && errors.personalPhone.errorMessage}
                  </Form.Control.Feedback>
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
                        />
                      </Col>
                    ))}
                  </Row>
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEmployeee;
