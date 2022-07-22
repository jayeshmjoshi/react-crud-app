import "./Header.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Dropdown } from "react-bootstrap";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";

import { Link, NavLink as NavLinkRouter, useNavigate } from "react-router-dom";
import { Fragment, useContext } from "react";
import AuthContext from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/login", { replace: true });
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          React CRUD App
        </Navbar.Brand>
        <Nav className="ms-auto">
          {!isLoggedIn && (
            <Fragment>
              <Nav.Link className="my-link" as={Link} to="/login">
                Log in
              </Nav.Link>
              <Nav.Link as={Link} to="/sign-up">
                Sign up
              </Nav.Link>
            </Fragment>
          )}
          {isLoggedIn && (
            <Fragment>
              <Nav.Link
                as={NavLinkRouter}
                to="/dashboard"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link
                as={NavLinkRouter}
                to="/add-employee"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Add Employee
              </Nav.Link>
              <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}>My Account</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/change-password">
                    Change Password
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logoutHandler}>Log Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* <Nav.Link as={Link} to="/change-password">
                Change Password
              </Nav.Link>
              <Nav.Link onClick={logoutHandler}>Log Out</Nav.Link> */}
            </Fragment>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
