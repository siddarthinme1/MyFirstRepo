import React, { useState } from "react";
import {
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  InputAdornment,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../Components/PageHeader";
import PeopleIcon from "@mui/icons-material/People";
import Control from "../../Controls/Control";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import useTable from "../../Components/useTable";
import Popup from "../../Components/Popup";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreIcon from "@mui/icons-material/Restore";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import useEmployeeServices from "../../Services/EmployeeService";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "50%",
    "&:hover": {
      backgroundColor: "#F2F2F2",
    },
  },
  addButton: {
    marginLeft: "500px",
  },
  binSwitch: {
    marginLeft: "80px",
  },
}));

const headCells = [
  { id: "id", label: "ID" },
  { id: "gender", label: "Gender" },
  { id: "fullName", label: "Full Name" },
  { id: "phone", label: "Phone" },
  { id: "mail", label: "Email" },
  { id: "birthday", label: "Birthday" },
  { id: "blood", label: "Blood" },
  { id: "address", label: "Address" },
  { id: "emergency", label: "Emergency Contact Details" },
  { id: "", label: "" },
];

function Employees() {
  const classes = useStyles();

  const {
    addEmployee,
    useAllEmployees,
    deleteEmployee,
    updateEmployee,
    useBinEmployees,
    emptyRecycleBin,
    restoreEmployee,
  } = useEmployeeServices();

  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [bin, setBin] = useState(false);

  const employees = useAllEmployees();
  const deletedEmployees = useBinEmployees();

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPaging } = useTable(
    bin === false ? employees : deletedEmployees,
    headCells,
    filterFn
  );

  const addOrEdit = (employee, resetForm) => {
    if (employee.id === 0) {
      addEmployee(employee);
    } else {
      updateEmployee(employee);
    }
    setRecordForEdit(null);
    resetForm();
    setOpenPopup(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      deleteEmployee(id);
    }
  };

  const handleRestore = (id) => {
    if (window.confirm("Are you sure to restore the details?")) {
      restoreEmployee(id);
    }
  };

  const handleEmptyRecycleBin = () => {
    if (bin === true && window.confirm("Are you sure to empty recycle bin?")) {
      emptyRecycleBin();
    }
  };

  const openInPopup = (employee) => {
    if (bin === false) {
      setRecordForEdit(employee);
      setOpenPopup(true);
    }
  };

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") {
          return items;
        } else {
          return items.filter((x) =>
            x.firstName.toLowerCase().includes(target.value)
          );
        }
      },
    });
  };

  return (
    <>
      <PageHeader
        title="Employee"
        subTitle="Form Design With Validation"
        icon={<PeopleIcon fontSize="large" />}
      />
      <Paper elevation={0} className={classes.pageContent}>
        <Toolbar>
          <Control.Input
            className={classes.searchInput}
            label="Search Employee"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Control.Button
            className={classes.addButton}
            text="Add new"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />

          <FormControlLabel
            control={
              <Switch
                className={classes.binSwitch}
                onChange={() => setBin(bin === true ? false : true)}
              />
            }
            labelPlacement="end"
            label="Bin"
          />
          {bin === true ? (
            <Control.ActionButton>
              <ClearAllIcon onClick={() => handleEmptyRecycleBin()} />
            </Control.ActionButton>
          ) : null}
        </Toolbar>

        <TblContainer>
          <TblHead></TblHead>
          <TableBody>
            {employees.length > 0 ? (
              recordsAfterPaging().map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.gender}</TableCell>
                  <TableCell
                    onClick={() => {
                      openInPopup(employee);
                    }}
                  >
                    {employee.firstName} {employee.lastName}
                  </TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>{employee.mail}</TableCell>
                  <TableCell>{employee.birthday.slice(0, 10)}</TableCell>
                  <TableCell>{employee.blood}</TableCell>
                  <TableCell>
                    {employee.streetAddress} {employee.streetAddress2}
                    <br />
                    {employee.city} {employee.state}
                    <br />
                    {employee.country} {employee.zipcode}
                  </TableCell>
                  <TableCell>
                    {employee.firstNamex} {employee.lastNamex}
                    <br />
                    {employee.relationx}
                    <br />
                    {employee.phonex}
                    <br />
                    {employee.streetAddressx} {employee.streetAddress2x} <br />
                    {employee.cityx} {employee.statex}
                    <br />
                    {employee.countryx} {employee.zipcodex}
                  </TableCell>
                  {bin === false ? (
                    <TableCell>
                      <Control.ActionButton>
                        <DeleteForeverIcon
                          onClick={() => handleDelete(employee.id)}
                        />
                      </Control.ActionButton>
                    </TableCell>
                  ) : (
                    <TableCell>
                      <Control.ActionButton>
                        <RestoreIcon
                          onClick={() => handleRestore(employee.id)}
                        />
                      </Control.ActionButton>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center">
                  No Employees
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title={recordForEdit ? "Edit Employee" : "Add Employee"}
      >
        {" "}
        <EmployeeForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
    </>
  );
}

export default Employees;
