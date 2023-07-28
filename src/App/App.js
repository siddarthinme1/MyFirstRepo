import "./App.css";
import React from "react";
import SideMenu from "../Components/SideMenu";
import Header from "../Components/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Employees from "../Pages/Employees/Employees";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  shape: {
    borderRadius: "10px",
  },
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "250px",
    width: "100%",
  },
});

function App() {
  const Classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <SideMenu />
      <div className={Classes.appMain}>
        <Header />
        <Employees></Employees>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
