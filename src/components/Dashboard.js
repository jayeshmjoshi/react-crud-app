import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { getAllEmployees, deleteEmployee } from "../lib/api";
import Spinner from "../UI/Spinner";

import ListEmployees from "./CRUD/ListEmployees";

const Dashboard = (props) => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let rs = await getAllEmployees(setIsLoading);
      setEmployees(rs);
    }
    fetchData();
  }, []);

  const deleteHandler = (deleteId) => {
    async function deleteData() {
      await deleteEmployee(deleteId);
      const newEmployeesList = employees.filter((emp) => {
        return emp.id !== deleteId;
      });
      setEmployees(newEmployeesList);
    }
    deleteData();
  };

  const searchHandler = (searchTerm) => {
    setSearchTitle(searchTerm);
    if (searchTerm !== "") {
      const newSearchList = employees.filter((emp) => {
        return Object.values(emp)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newSearchList);
    } else {
      setSearchResults(employees);
    }
  };

  return (
    <Container>
      {isLoading && <Spinner />}

      {!isLoading && (
        <Row>
          <ListEmployees
            employees={searchTitle.length < 1 ? employees : searchResults}
            onDelete={deleteHandler}
            term={searchTitle}
            searchKeyword={searchHandler}
          />
        </Row>
      )}
    </Container>
  );
};

export default Dashboard;
