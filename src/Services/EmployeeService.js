import axios from "axios";
import { useState, useEffect } from "react";
import { getBloodCollection } from "./EmployeeServiceData";

const API_URL = "http://localhost:8080/employees";
const BIN_URL = "http://localhost:8080/employees";

const useEmployeeServices = () => {
  const [employeeListUpdated, setEmployeeListUpdated] = useState(false);

  const addEmployee = async (values) => {
    try {
      await axios.post(API_URL, values);
      setEmployeeListUpdated(!employeeListUpdated);
    } catch (error) {
      console.error(error);
    }
  };

  const useAllEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const bloods = getBloodCollection();

    useEffect(() => {
      axios
        .get(API_URL)
        .then((response) => {
          setEmployees(response.data);
          console.log(employees);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [employeeListUpdated]);

    const employeesWithBlood = employees.map((x) => ({
      ...x,
      blood: bloods[x.bloodId - 1]?.title,
    }));

    return employeesWithBlood;
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setEmployeeListUpdated(!employeeListUpdated);
    } catch (error) {
      console.error(error);
    }
  };

  const updateEmployee = async (values) => {
    try {
      await axios.put(`${API_URL}/${values.id}`, values);
      setEmployeeListUpdated(!employeeListUpdated);
    } catch (error) {
      console.error(error);
    }
  };

  const useBinEmployees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
      axios
        .get(`${BIN_URL}/bin/`)
        .then((response) => {
          setEmployees(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [employeeListUpdated]);

    const bloods = getBloodCollection();

    const employeesWithBlood = employees.map((x) => ({
      ...x,
      blood: bloods[x.bloodId - 1]?.title,
    }));

    console.log(employeesWithBlood);
    return employeesWithBlood;
  };

  const emptyRecycleBin = async () => {
    try {
      await axios.delete(`${BIN_URL}/clearbin/`);
      setEmployeeListUpdated(!employeeListUpdated);
    } catch (error) {
      console.error(error);
    }
  };

  const restoreEmployee = async (id) => {
    try {
      await axios.delete(`${BIN_URL}/restore/${id}`);
      setEmployeeListUpdated(!employeeListUpdated);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    addEmployee,
    useAllEmployees,
    deleteEmployee,
    updateEmployee,
    useBinEmployees,
    emptyRecycleBin,
    restoreEmployee,
  };
};

export default useEmployeeServices;
