import { useContext, useRef, useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./SignUpForm.css";

const LoginForm = (props) => {
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  // const [isLoading, setIsLoading] = useState("false");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJ7ohifeoaYuuZRhRXZ4uzXRIyWSv40pg";
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

          return res.json();
        } else {
          return res.json().then((data) => {
            console.log(data);
            let errorText = "Authentication Failed";

            if (
              data.error.code === 400 &&
              data.error.message === "INVALID_PASSWORD"
            ) {
              errorText = "Password is invalid!";
              setError(true);
              setErrorMessage(errorText);
            }
            if (
              data.error.code === 400 &&
              data.error.message === "EMAIL_NOT_FOUND"
            ) {
              errorText = "Email not found!";
              setError(true);
              setErrorMessage(errorText);
            }
            throw new Error(errorText);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );

        authCtx.login(data.idToken, expirationTime.toISOString());

        navigate("/dashboard", { replace: true });
      })
      .catch((err) => {});
  };

  return (
    <Container>
      <Row>
        <Col xs={4} className="mx-auto">
          <Card className="my-5">
            <Card.Body>
              <h2 className="text-center my-3">Log In</h2>
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
                {error && (
                  <Form.Group>
                    <Alert className="text-center" variant="danger">
                      {errorMessage}
                    </Alert>
                  </Form.Group>
                )}
                <Form.Group>
                  <Button className="w-100" type="Submit">
                    Log In
                  </Button>
                </Form.Group>
              </Form>
              <div className="text-center my-3">
                <p>
                  Don't have an account? <Link to="/sign-up">Sign Up</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
