import { useContext, useRef, useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UpdatePassword = (props) => {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  let navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  // const [isLoading, setIsLoading] = useState("false");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

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
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCJ7ohifeoaYuuZRhRXZ4uzXRIyWSv40pg";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      navigate("/login", { replace: true });
    });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Card className="my-5">
        <Card.Body>
          <h2 className="text-center my-3">Change Password</h2>
          <Form onSubmit={onSubmitHandler}>
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
            <Form.Group>
              <Button className="w-100" type="Submit">
                Change Password
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UpdatePassword;
