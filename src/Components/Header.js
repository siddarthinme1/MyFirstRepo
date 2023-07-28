import React from "react";
import {
  AppBar,
  Badge,
  Grid,
  IconButton,
  InputBase,
  Switch,
  Toolbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles(() => ({
  root: {
    transform: "translateZ(0)",
  },
  searchInput: {
    backgroundColor: "white",
    opacity: "0.8",
    padding: "0px 8px",
    //reference selector of the parent rule
    "&:hover": {
      backgroundColor: "#F2F2F2",
    },
  },
}));

function refreshPage() {
  window.location.reload(false);
}

function Header() {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" color="default" className={classes.root}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item>
              <InputBase
                data-testid="searchInput"
                startAdornment={<SearchIcon fontSize="small" />}
                placeholder="Search"
                className={classes.searchInput}
              ></InputBase>
            </Grid>
            <Grid item sm></Grid>
            <Grid item>
              <IconButton>
                <Badge badgeContent={4} color="secondary">
                  <NotificationsActiveIcon fontSize="small"></NotificationsActiveIcon>
                </Badge>
              </IconButton>
              <IconButton>
                <Badge badgeContent={3} color="primary">
                  <ChatBubbleIcon fontSize="small"></ChatBubbleIcon>
                </Badge>
              </IconButton>
              <IconButton>
                <Switch />
              </IconButton>
              <IconButton onClick={refreshPage}>
                <LogoutIcon></LogoutIcon>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
