const FIREBASE_DOMAIN =
  "https://emp-task-ed525-default-rtdb.asia-southeast1.firebasedatabase.app";

export const addEmployeee = async (inputValues) => {
  const response = await fetch(
    "https://emp-task-ed525-default-rtdb.asia-southeast1.firebasedatabase.app/employees.json",
    {
      method: "POST",
      body: JSON.stringify(inputValues),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

export const getAllEmployees = async (setIsLoading) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/employees.json`);
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  const data = await response.json();

  const transformedEmployees = [];

  for (const key in data) {
    const empObj = {
      id: key,
      ...data[key],
    };

    transformedEmployees.push(empObj);
  }
  setIsLoading(false);
  return transformedEmployees;
};

export const getSingleEmployee = async (empId) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/employees/${empId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quote.");
  }

  const loadedEmployees = {
    id: empId,
    ...data,
  };
  return loadedEmployees;
};

export const updateSingleEmployee = async (empId, empData) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/employees/${empId}.json`, {
    method: "PATCH",
    body: JSON.stringify(empData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quote.");
  }

  return data;
};

export const deleteEmployee = async (empId) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/employees/${empId}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quote.");
  }
};
