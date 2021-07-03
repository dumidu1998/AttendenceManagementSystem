import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CheckIcon from "@material-ui/icons/Check";
import PersonIcon from "@material-ui/icons/Person";
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import SettingsIcon from "@material-ui/icons/Settings";
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    links: {
        textDecoration: 'none',
        color: 'black'
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    }
}));


function Navbar() {

    if (sessionStorage.getItem("username")) {
    } else {
        window.location.href = "login";
    }

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <h4><img src="https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image.png" alt="admin-pic" width='80' />
                </h4>
                <h3>Dilupa Bandara</h3>
                <Divider />
                <List>
                    <NavLink className={classes.links} to='/dashboard'>
                        <ListItem button key="Dashboard">
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                    </NavLink>
                    <NavLink className={classes.links} to='/manualmarking'>
                        <ListItem button key="Marking (Manual)" >
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Marking (Manual)" />
                        </ListItem>
                    </NavLink>
                    <NavLink className={classes.links} to='/Requests'>
                        <ListItem button key="Att. Requests" >
                            <ListItemIcon>
                                <LiveHelpIcon />
                            </ListItemIcon>
                            <ListItemText primary="Att. Requests" />
                        </ListItem>
                    </NavLink>
                    <NavLink className={classes.links} to='/adminhome'>
                        <ListItem button key="Admin List">
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="Admin List" />
                        </ListItem>
                    </NavLink>
                    <NavLink className={classes.links} to='/studenthome'>
                        <ListItem button key="Students">
                            <ListItemIcon>
                                <PersonAddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Students" />
                        </ListItem>
                    </NavLink>
                    <NavLink className={classes.links} to='/staffhome'>
                        <ListItem button key="Staff">
                            <ListItemIcon>
                                <PersonAddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Staff" />
                        </ListItem>
                    </NavLink>
                    <NavLink className={classes.links} to='/batchhome'>
                        <ListItem button key="Batch">
                            <ListItemIcon>
                                <GroupWorkIcon />
                            </ListItemIcon>
                            <ListItemText primary="Batch" />
                        </ListItem>
                    </NavLink>
                    <NavLink className={classes.links} to='/settings'>
                        <ListItem button key="Profile Settings">
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Profile Settings" />
                        </ListItem>
                    </NavLink>
                </List>
            </Drawer>
        </div>
    )
}

export default Navbar
