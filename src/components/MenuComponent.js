import * as React from 'react';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Link as LinkRouter } from "react-router-dom";
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import { getMyRights } from "./../GraphQL/queries/UserQueries";
import { Navigate } from 'react-router-dom';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { rightIsInRole, isAdmin } from '../Helpers/RightsGestion';
import '../styles/menu.css'
import { useNavigate } from 'react-router-dom'

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    zIndex: 1300,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function MenuComponent(props) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState("");
  const [administrationList, setAdministrationListOpen] = React.useState(false);
  const [myRights, setMyRights] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [disconnect, setDisconnect] = React.useState(false);

  const getRightsUser = () => {
    if (localStorage.getItem("Token")) {
      getMyRights().then((res) => {
        setMyRights([...res.myRights],
          setIsLoading(false));;
      });
    }
  };

  const getCurrentUrl = () => {
    let currentUrl = window.location.href;
    if (currentUrl.includes("board")) {
      setSelectedItem("board");
      setTitle("Tableau de bord");
      setAdministrationListOpen(false);
    } else if (currentUrl.includes("myaccount")) {
      setSelectedItem("account");
      setTitle("Mon Compte");
      setAdministrationListOpen(false);
    } else if (currentUrl.includes("eventsGestion")) {
      setSelectedItem("manageEvents");
      setTitle("Gestion des évènements");
      setAdministrationListOpen(true);
    } else if (currentUrl.includes("events")) {
      setSelectedItem("events");
      setTitle("Evènements");
      setAdministrationListOpen(false);
    } else if (currentUrl.includes("partitions")) {
      setSelectedItem("partitions");
      setTitle("Partitions");
      setAdministrationListOpen(false);
    } else if (currentUrl.includes("allowance")) {
      setSelectedItem("allowance");
      setTitle("Dons / Indemnités kilométriques");
      setAdministrationListOpen(false);
    } else if (currentUrl.includes("dressing")) {
      setSelectedItem("dressing");
      setTitle("Vestiaire");
      setAdministrationListOpen(false);
    } else if (currentUrl.includes("claims")) {
      setSelectedItem("claims");
      setTitle("Sinistres");
      setAdministrationListOpen(false);
    } else if (currentUrl.includes("membersGestion") || currentUrl.includes("add/user")) {
      setSelectedItem("manageMembers");
      setTitle("Gestion des membres");
      setAdministrationListOpen(true);
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUrl();
  }, [navigate])

  useEffect(() => {
    getRightsUser();
  }, [])

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleAdministrationListOpen = () => {
    setAdministrationListOpen(!administrationList);
  }

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleDisconnect = () => {
    localStorage.clear();
    setDisconnect(true);
  }

  const handleClickItem = (title, selectedItem) => {
    setTitle(title);
    setSelectedItem(selectedItem);
    setOpen(false);
  }

  const ListItemTextStyled = styled(ListItemText)(({ theme }) => ({
    color: "white",
    '.MuiListItemText-primary': {
      fontSize: "13px"
    },
  }));

  return (
    isLoading ?
      ("") : (
        disconnect ? (
          <Navigate to="/signin" />
        )
          : (
            < ClickAwayListener onClickAway={handleClickAway} >
              <div>
                <CssBaseline />
                <AppBar position="fixed" open={open} style={{ backgroundColor: "#1D70B7" }}>
                  <Toolbar>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      sx={{ mr: 2, ...(open && { display: 'true' }) }}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                      {title}
                    </Typography>

                    {localStorage.getItem("Token") ? (
                      <div style={{ flex: 1 }}>
                        <IconButton
                          id="btnProfile"
                          aria-haspopup="true"
                          onClick={handleDisconnect}
                          color="inherit"
                          size="large"
                          style={{ float: "right" }}>
                          <LogoutIcon />
                        </IconButton>
                        <IconButton
                          id="btnProfile"
                          aria-haspopup="true"
                          onClick={() => console.log("notifications")}
                          color="inherit"
                          size="large"
                          style={{ float: "right" }}>
                          <NotificationsNoneIcon />
                        </IconButton>
                      </div>
                    ) : (
                      ""
                    )}
                  </Toolbar>
                </AppBar>
                <Drawer
                  sx={{
                    width: drawerWidth,
                    zIndex: 1,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                      width: drawerWidth,
                      boxSizing: 'border-box',
                      backgroundColor: "#111827",
                    },
                  }}
                  variant="persistent"
                  anchor="left"
                  open={open}
                >
                  <DrawerHeader>
                  </DrawerHeader>
                  <Divider />
                  <List>
                    {/* Tableau de bord */}
                    <LinkRouter to="/board" style={{ textDecoration: "none" }}>
                      <ListItem button
                        onClick={() => handleClickItem("Tableau de bord", "board")}
                        sx={{
                          backgroundColor: selectedItem === "board" ? "#242A38" : "",
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: selectedItem === "board" ? "#242A38" : "#FFB020"
                          }
                        }}>
                        <ListItemIcon>
                          <DashboardOutlinedIcon style={{ color: selectedItem === "board" ? "#FFB020" : "white" }} />
                        </ListItemIcon>
                        <ListItemTextStyled primary="Tableau de bord" style={{ color: selectedItem === "board" ? "#FFB020" : "" }} />
                      </ListItem>
                    </LinkRouter>

                    {/* Mon compte */}
                    <LinkRouter to="/myaccount" style={{ textDecoration: "none" }}>
                      <ListItem button
                        onClick={() => handleClickItem("Mon compte", "account")}
                        sx={{
                          backgroundColor: selectedItem === "account" ? "#242A38" : "",
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: selectedItem === "account" ? "#242A38" : "#FFB020"
                          }
                        }}>
                        <ListItemIcon>
                          <ManageAccountsIcon style={{ color: selectedItem === "account" ? "#FFB020" : "white" }} />
                        </ListItemIcon>
                        <ListItemTextStyled primary="Mon Compte" style={{ color: selectedItem === "account" ? "#FFB020" : "" }} />
                      </ListItem>
                    </LinkRouter>

                    {/* Evènements */}
                    {
                      // !rightIsInRole(myRights, "manage_events") ? (
                      //   <LinkRouter to="/events" style={{ textDecoration: "none" }}>
                      //     <ListItem button
                      //       onClick={() => handleClickItem("Evènements", "events")}
                      //       sx={{
                      //         backgroundColor: selectedItem === "events" ? "#242A38" : "",
                      //         borderRadius: "10px",
                      //         "&:hover": {
                      //           backgroundColor: selectedItem === "events" ? "#242A38" : "#FFB020"
                      //         }
                      //       }}>
                      //       <ListItemIcon>
                      //         <EventIcon style={{ color: selectedItem === "events" ? "#FFB020" : "white" }} />
                      //       </ListItemIcon>
                      //       <ListItemTextStyled primary="Evènements" style={{ color: selectedItem === "events" ? "#FFB020" : "" }} />
                      //     </ListItem>
                      //   </LinkRouter>
                      // ) : (
                      <LinkRouter to="/events" style={{ textDecoration: "none" }}>
                        <ListItem button
                          onClick={() => handleClickItem("Evènements", "events")}
                          sx={{
                            backgroundColor: selectedItem === "events" ? "#242A38" : "",
                            borderRadius: "10px",
                            "&:hover": {
                              backgroundColor: selectedItem === "events" ? "#242A38" : "#FFB020"
                            }
                          }}>
                          <ListItemIcon>
                            <EventNoteIcon style={{ color: selectedItem === "events" ? "#FFB020" : "white" }} />
                          </ListItemIcon>
                          <ListItemTextStyled primary="Evènements" style={{ color: selectedItem === "events" ? "#FFB020" : "" }} />
                        </ListItem>
                      </LinkRouter>
                      // )
                    }

                    {/* Partitions */}
                    <LinkRouter to="/partitions" style={{ textDecoration: "none" }}>
                      <ListItem button
                        onClick={() => handleClickItem("Partitions", "partitions")}
                        sx={{
                          backgroundColor: selectedItem === "partitions" ? "#242A38" : "",
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: selectedItem === "partitions" ? "#242A38" : "#FFB020"
                          }
                        }}>
                        <ListItemIcon>
                          <LibraryMusicIcon style={{ color: selectedItem === "partitions" ? "#FFB020" : "white" }} />
                        </ListItemIcon>
                        <ListItemTextStyled primary="Partitions" style={{ color: selectedItem === "partitions" ? "#FFB020" : "" }} />
                      </ListItem>
                    </LinkRouter>

                    {/* Dons / indemnités kilométriques */}
                    <LinkRouter to="/allowance" style={{ textDecoration: "none" }}>
                      <ListItem button
                        onClick={() => handleClickItem("Dons / Indemnités kilométriques", "allowance")}
                        sx={{
                          backgroundColor: selectedItem === "allowance" ? "#242A38" : "",
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: selectedItem === "allowance" ? "#242A38" : "#FFB020"
                          }
                        }}>
                        <ListItemIcon>
                          <EuroSymbolIcon style={{ color: selectedItem === "allowance" ? "#FFB020" : "white" }} />
                        </ListItemIcon>
                        <ListItemTextStyled primary="Dons / Indemnités kilométriques" style={{ color: selectedItem === "allowance" ? "#FFB020" : "" }} />
                      </ListItem>
                    </LinkRouter>

                    {/* Vestiaire */}
                    <LinkRouter to="/dressing" style={{ textDecoration: "none" }}>
                      <ListItem button
                        onClick={() => handleClickItem("Vestiaire", "dressing")}
                        sx={{
                          backgroundColor: selectedItem === "dressing" ? "#242A38" : "",
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: selectedItem === "dressing" ? "#242A38" : "#FFB020"
                          }
                        }}>
                        <ListItemIcon>
                          <CheckroomIcon style={{ color: selectedItem === "dressing" ? "#FFB020" : "white" }} />
                        </ListItemIcon>
                        <ListItemTextStyled primary="Vestiaire" style={{ color: selectedItem === "dressing" ? "#FFB020" : "" }} />
                      </ListItem>
                    </LinkRouter>

                    {/* Sinistres */}
                    <LinkRouter to="/claims" style={{ textDecoration: "none" }}>
                      <ListItem button
                        onClick={() => handleClickItem("Sinistres", "claims")}
                        sx={{
                          backgroundColor: selectedItem === "claims" ? "#242A38" : "",
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: selectedItem === "claims" ? "#242A38" : "#FFB020"
                          }
                        }}>
                        <ListItemIcon>
                          <HealthAndSafetyIcon style={{ color: selectedItem === "claims" ? "#FFB020" : "white" }} />
                        </ListItemIcon>
                        <ListItemTextStyled primary="Sinistres" style={{ color: selectedItem === "claims" ? "#FFB020" : "" }} />
                      </ListItem>
                    </LinkRouter>

                    {/* Administration */}
                    {/* Collapse Menu*/}
                    {isAdmin(myRights) ? (
                      <>
                        <ListItem button onClick={handleAdministrationListOpen}
                          sx={{
                            backgroundColor: props.selectedElement === "administration" ? "#242A38" : "",
                            borderRadius: "10px",
                            "&:hover": {
                              backgroundColor: selectedItem === "administration" ? "#242A38" : "#FFB020"
                            }
                          }}>
                          <ListItemIcon>
                            <AdminPanelSettingsOutlinedIcon style={{ color: "white" }} />
                          </ListItemIcon>
                          <ListItemTextStyled primary="Administration" />
                          {administrationList ? <ExpandLess style={{ color: "white" }} /> : <ExpandMore style={{ color: "white" }} />}
                        </ListItem>
                        <Collapse in={administrationList} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            {
                              // Gestion des membres
                              rightIsInRole(myRights, "manage_members") ?
                                (
                                  <LinkRouter to="/membersGestion" style={{ textDecoration: "none" }}>
                                    <ListItem
                                      button
                                      onClick={() => handleClickItem("Gestion des membres", "manageMembers")}
                                      sx={{
                                        backgroundColor: selectedItem === "manageMembers" ? "#242A38" : "",
                                        borderRadius: "10px",
                                        "&:hover": {
                                          backgroundColor: selectedItem === "manageMembers" ? "#242A38" : "#FFB020"
                                        }
                                      }}>
                                      <ListItemIcon></ListItemIcon>
                                      <ListItemTextStyled primary="Gestion des membres" style={{ color: selectedItem === "manageMembers" ? "#FFB020" : "" }} />
                                    </ListItem>
                                  </LinkRouter>
                                ) : ("")
                            }

                            {
                              // Gestion des évènements
                              rightIsInRole(myRights, "manage_events") ?
                                (
                                  <LinkRouter to="/eventsGestion" style={{ textDecoration: "none" }}>
                                    <ListItem
                                      button
                                      onClick={() => handleClickItem("Gestion des évènements", "manageEvents")}
                                      sx={{
                                        backgroundColor: selectedItem === "manageEvents" ? "#242A38" : "",
                                        borderRadius: "10px",
                                        "&:hover": {
                                          backgroundColor: selectedItem === "manageEvents" ? "#242A38" : "#FFB020"
                                        }
                                      }}>
                                      <ListItemIcon></ListItemIcon>
                                      <ListItemTextStyled primary="Gestion des évènements" style={{ color: selectedItem === "manageEvents" ? "#FFB020" : "" }} />
                                    </ListItem>
                                  </LinkRouter>
                                ) : ("")
                            }

                            {
                              // Gestion du vestiaire
                              rightIsInRole(myRights, "manage_locker_room") ?
                                (
                                  <LinkRouter to="/lockerGestion" style={{ textDecoration: "none" }}>
                                    <ListItem
                                      button
                                      onClick={() => handleClickItem("Gestion du vestiaire", "manageLockerRoom")}
                                      sx={{
                                        backgroundColor: selectedItem === "manageLockerRoom" ? "#242A38" : "",
                                        borderRadius: "10px",
                                        "&:hover": {
                                          backgroundColor: selectedItem === "manageLockerRoom" ? "#242A38" : "#FFB020"
                                        }
                                      }}>
                                      <ListItemIcon></ListItemIcon>
                                      <ListItemTextStyled primary="Gestion du vestiaire" style={{ color: selectedItem === "manageLockerRoom" ? "#FFB020" : "" }} />
                                    </ListItem>
                                  </LinkRouter>
                                ) : ("")
                            }

                            {
                              // Gestion de la communication
                              rightIsInRole(myRights, "manage_communication") ?
                                (
                                  <LinkRouter to="/communicationGestion" style={{ textDecoration: "none" }}>
                                    <ListItem
                                      button
                                      onClick={() => handleClickItem("Communication générale", "manageCommunication")}
                                      sx={{
                                        backgroundColor: selectedItem === "manageCommunication" ? "#242A38" : "",
                                        borderRadius: "10px",
                                        "&:hover": {
                                          backgroundColor: selectedItem === "manageCommunication" ? "#242A38" : "#FFB020"
                                        }
                                      }}>
                                      <ListItemIcon></ListItemIcon>
                                      <ListItemTextStyled primary="Communication générale" style={{ color: selectedItem === "manageCommunication" ? "#FFB020" : "" }} />
                                    </ListItem>
                                  </LinkRouter>
                                ) : ("")
                            }

                            {
                              // Gestion des sinistres
                              rightIsInRole(myRights, "manage_sinisters") ?
                                (
                                  <LinkRouter to="/claimsGestion" style={{ textDecoration: "none" }}>
                                    <ListItem
                                      button
                                      onClick={() => handleClickItem("Gestion des sinistres", "manageSinisters")}
                                      sx={{
                                        backgroundColor: selectedItem === "manageSinisters" ? "#242A38" : "",
                                        borderRadius: "10px",
                                        "&:hover": {
                                          backgroundColor: selectedItem === "manageSinisters" ? "#242A38" : "#FFB020"
                                        }
                                      }}>
                                      <ListItemIcon></ListItemIcon>
                                      <ListItemTextStyled primary="Gestion des sinistres" style={{ color: selectedItem === "manageSinisters" ? "#FFB020" : "" }} />
                                    </ListItem>
                                  </LinkRouter>
                                ) : ("")
                            }
                          </List>
                        </Collapse>
                      </>
                    ) : ("")}
                  </List>
                </Drawer>
              </div>
            </ClickAwayListener >
          )
      )
  );
}
