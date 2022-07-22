import { useRef, useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import "./SignUpForm.css";

const SignUpForm = (props) => {
  let navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  // const [isLoading, setIsLoading] = useState("false");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      setError(true);
      setErrorMessage("Passwords don't match!");
      return;
    }

    setError(false);
    setErrorMessage("");
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJ7ohifeoaYuuZRhRXZ4uzXRIyWSv40pg";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          setError(false);
          setErrorMessage("");
          setSuccess(true);
          return res.json();
        } else {
          return res.json().then((data) => {
            console.log(data);
            let errorText = "Authentication Failed";

            if (
              data.error.code === 400 &&
              data.error.message.includes("EMAIL_EXISTS")
            ) {
              errorText =
                "The email address is already in use by another account.";
              setError(true);
              setErrorMessage(errorText);
            }
            if (
              data.error.code === 400 &&
              data.error.message.includes("EMAIL_NOT_FOUND")
            ) {
              errorText = "Email not found!";
              setError(true);
              setErrorMessage(errorText);
            }
            if (
              data.error.code === 400 &&
              data.error.message.includes("WEAK_PASSWORD")
            ) {
              errorText = "Password should be at least 6 characters";
              setError(true);
              setErrorMessage(errorText);
            }
            throw new Error(errorText);
          });
        }
      })
      .then((data) => {
        console.log(data);
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);
      })
      .catch((err) => {});
  };

  return (
    <Container>
      <Row>
        <Col xs={4} className="mx-auto">
          <Card className="my-5">
            <Card.Body>
              <h2 className="text-center my-3">Sign Up</h2>
              <Form onSubmit={onSubmitHandler}>
                <Form.Group className="mb-3" id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" id="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={confirmPasswordRef}
                    required
                  ></Form.Control>
                </Form.Group>
                {error && (
                  <Form.Group>
                    <Alert className="text-center" variant="danger">
                      {errorMessage}
                    </Alert>
                  </Form.Group>
                )}
                {!error && success && (
                  <Alert className="text-center" variant="success">
                    Success!
                  </Alert>
                )}
                <Form.Group>
                  <Button className="w-100" type="Submi">
                    Sign Up
                  </Button>
                </Form.Group>
              </Form>
              <div className="text-center my-3">
                <p>
                  Already have an account? <Link to="/login">Log In</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;
