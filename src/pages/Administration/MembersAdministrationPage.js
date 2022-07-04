import React from "react";
import { GreenButton } from "../../components/General/StyledComponents/StyledButtons";
import { Link as LinkRouter } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { Chip, Collapse, Grid, Paper } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import "../../App.css";
import "../../styles/membersAdmin.css";
import { getAllRights, getAllTypes, getUsers } from "../../GraphQL/queries/UserQueries";
import { rightIsInRoleV2 } from "../../Helpers/RightsGestion";
import Popup from "../../components/General/Popups/Popup";
import ConfirmPopup from "../../components/General/Popups/ConfirmPopup";
import { assignRightToUser, assignTypeToUser, deleteUser, removeRightFromUser, removeTypeFromUser } from "../../GraphQL/mutations/UserMutations";
import { AppContext } from "../../Context";
import CustomizedSnackbars from "../../components/General/Popups/CustomizedSnackbar";
import { superUserEmail } from "../../GraphQL/settings";
import ActionButtons from "../../components/General/Buttons/ActionButtons";
import { typeIsInUser } from "../../Helpers/UserTypesGestion";
import GeneralDataTab from "../../components/User/Account/GeneralDataTab";
import ModifyGeneralDataTab from "../../components/User/Gestion/ModifyGenaralDataTab";
import ModifyLegalGuardiansTab from "../../components/User/Gestion/ModifyLegalGuardiansTab";
import ModifyInstrumentsTab from "../../components/User/Gestion/ModifyInstrumentsTab";
import ModifyHealthCardTab from "../../components/User/Gestion/ModifyHealthCardTab";
import ModifyVehiclesTab from "../../components/User/Gestion/ModifyVehiclesTab";
import ModifyImageRightTab from "../../components/User/Gestion/ModifyImageRightTab";

function Row(props) {
    const { user } = props;
    const [open, setOpen] = React.useState(false);
    const [openRights, setOpenRights] = React.useState(false);
    const [openPopupEdit, setOpenPopupEdit] = React.useState(false);
    const [openPopupDeleteConfirm, setOpenPopupDeleteConfirm] = React.useState(false);
    const [personalDataOpen, setPersonalDataOpen] = React.useState(false);

    // rights
    const [accessApp, setAccessApp] = React.useState(rightIsInRoleV2(user.userRights, "access_app"));
    const [manageMembers, setManageMembers] = React.useState(rightIsInRoleV2(user.userRights, "manage_members"));
    const [manageEvents, setManageEvents] = React.useState(rightIsInRoleV2(user.userRights, "manage_events"));
    const [manageLockerRoom, setManageLockerRoom] = React.useState(rightIsInRoleV2(user.userRights, "manage_locker_room"));
    const [manageSinisters, setManageSinisters] = React.useState(rightIsInRoleV2(user.userRights, "manage_sinisters"));
    const [manageCommunication, setManageCommunication] = React.useState(rightIsInRoleV2(user.userRights, "manage_communication"));
    const [activeMember, setActiveMember] = React.useState(typeIsInUser(user.userTypes, "ACTIF"));
    const [conseilMember, setConseilMember] = React.useState(typeIsInUser(user.userTypes, "CONSEIL"));
    const [bureauMember, setBureauMember] = React.useState(typeIsInUser(user.userTypes, "BUREAU"));

    return (
        <div style={{ marginBottom: "10px" }}>
            <Grid container key={user.id} rowSpacing={0} style={{ border: "1px solid #E0E0E0", borderRadius: "2px", backgroundColor: "white" }}>
                <Grid item lg={2} md={6} xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", lg: "inherit" } }}>
                    <p className="contentTab" style={{ margin: "5px" }}>{user.lastName}</p>
                </Grid>
                <Grid item lg={2} md={6} xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", lg: "inherit" } }}>
                    <p className="contentTab" style={{ margin: "5px" }}>{user.firstName}</p>
                </Grid>
                <Grid item lg={1} md={6} xs={12} style={{ paddingTop: "5px" }}>
                    <p className="contentTab" style={{ margin: "5px" }}>{user.isRegistered ? <CheckCircleIcon style={{ color: "green" }} /> : <CancelIcon style={{ color: "red" }} />}</p>
                </Grid>
                <Grid item lg={2} md={6} xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", lg: "inherit" } }}>
                    <p className="contentTab" style={{ margin: "5px" }}>{user.mobileNumber}</p>
                </Grid>
                <Grid item lg={3} md={6} xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", lg: "inherit" } }}>
                    <p className="contentTab" style={{ margin: "5px" }}>{user.email}</p>
                </Grid>
                <Grid item lg={2} md={12} xs={12} className="arrow" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {
                        props.userId != user.id ? (
                            <div id="buttons">
                                <ActionButtons
                                    functionEdit={() => setOpenPopupEdit(true)}
                                    functionDelete={() => setOpenPopupDeleteConfirm(true)}
                                />
                            </div>
                        ) : ""
                    }
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                        style={{ float: "right", marginLeft: "20px" }}
                    >
                        {open ? <KeyboardArrowUpIcon sx={{ color: { xs: "white", lg: "black" } }} /> : <KeyboardArrowDownIcon sx={{ color: { xs: "white", lg: "black" } }} />}
                    </IconButton>
                </Grid>
            </Grid>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <div style={{ width: "100%", backgroundColor: "white", padding: "20px" }}>
                    <Grid container>
                        <Grid item lg={3} md={6} xs={12} sytle={{ marginBottom: "20px 20px 10px 20px" }}>
                            {
                                accessApp ? (
                                    <Chip avatar={<DoneIcon style={{ color: "white" }} />} label="Accès à l'application" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#00AF06", color: "white" }} />
                                ) : (
                                    <Chip avatar={<CloseIcon style={{ color: "white" }} />} label="Accès à l'application" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#FF0000", color: "white" }} />
                                )
                            }
                        </Grid>
                        <Grid item lg={3} md={6} xs={12}>
                            {
                                manageMembers ? (
                                    <Chip avatar={<DoneIcon style={{ color: "white" }} />} label="Gestion des membres" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#00AF06", color: "white" }} />
                                ) : (
                                    <Chip avatar={<CloseIcon style={{ color: "white" }} />} label="Gestion des membres" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#FF0000", color: "white" }} />
                                )
                            }
                        </Grid>
                        <Grid item lg={3} md={6} xs={12}>
                            {
                                manageEvents ? (
                                    <Chip avatar={<DoneIcon style={{ color: "white" }} />} label="Gestion des évènements" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#00AF06", color: "white" }} />
                                ) : (
                                    <Chip avatar={<CloseIcon style={{ color: "white" }} />} label="Gestion des évènements" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#FF0000", color: "white" }} />
                                )
                            }
                        </Grid>
                        <Grid item lg={3} md={6} xs={12}>
                            {
                                manageLockerRoom ? (
                                    <Chip avatar={<DoneIcon style={{ color: "white" }} />} label="Gestion du vestiaire" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#00AF06", color: "white" }} />
                                ) : (
                                    <Chip avatar={<CloseIcon style={{ color: "white" }} />} label="Gestion du vestiaire" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#FF0000", color: "white" }} />
                                )
                            }
                        </Grid>
                        <Grid item lg={3} md={6} xs={12}>
                            {
                                manageSinisters ? (
                                    <Chip avatar={<DoneIcon style={{ color: "white" }} />} label="Gestion des sinistres" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#00AF06", color: "white" }} />
                                ) : (
                                    <Chip avatar={<CloseIcon style={{ color: "white" }} />} label="Gestion des sinistres" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#FF0000", color: "white" }} />
                                )
                            }
                        </Grid>
                        <Grid item lg={3} md={6} xs={12}>
                            {
                                manageCommunication ? (
                                    <Chip avatar={<DoneIcon style={{ color: "white" }} />} label="Communication générale" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#00AF06", color: "white" }} />
                                ) : (
                                    <Chip avatar={<CloseIcon style={{ color: "white" }} />} label="Communication générale" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#FF0000", color: "white" }} />
                                )
                            }
                        </Grid>
                    </Grid>
                </div>
            </Collapse>
            <Popup
                title={"Modifier les données d'un utilisateur"}
                length="lg"
                openPopup={openPopupEdit}
                parentCallback={() =>
                    setOpenPopupEdit(false)
                }
            >
                <div style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "20px" }}>
                    <Paper elevation={3}>
                        <div style={{ display: "flex" }}>
                            <p style={{ marginLeft: "20px" }}>Droits et types de membre</p>
                            <div style={{ margin: "auto 10px auto auto" }}>
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => setOpenRights(!openRights)}
                                >
                                    {openRights ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </div>
                        </div>
                        <Collapse in={openRights} timeout="auto" unmountOnExit>
                            <Grid container style={{ paddingLeft: "2%", paddingRight: "2%", paddingBottom: "20px" }}>
                                <Grid item xs={12}>
                                    <h2 style={{ textAlign: "center", fontSize: "18px" }}>Droits</h2>
                                </Grid>
                                {/* First line */}
                                <Grid container>
                                    <Grid item lg={3} md={6} xs={12} sytle={{ marginBottom: "20px 20px 10px 20px" }}>
                                        {
                                            accessApp ? (
                                                <Chip
                                                    onClick={() => {
                                                        setAccessApp(!accessApp);
                                                        props.changeRightFunction(accessApp, user.id, "access_app");
                                                    }}
                                                    avatar={<DoneIcon style={{ color: "white" }} />} label="Accès à l'application" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#00AF06", color: "white" }} />
                                            ) : (
                                                <Chip
                                                    onClick={() => {
                                                        setAccessApp(!accessApp);
                                                        props.changeRightFunction(accessApp, user.id, "access_app");
                                                    }}
                                                    avatar={<CloseIcon style={{ color: "white" }} />} label="Accès à l'application" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#FF0000", color: "white" }} />
                                            )
                                        }
                                    </Grid>
                                    <Grid item lg={3} md={6} xs={12}>
                                        {
                                            manageMembers ? (
                                                <Chip
                                                    onClick={() => {
                                                        setManageMembers(!manageMembers);
                                                        props.changeRightFunction(manageMembers, user.id, "manage_members");
                                                    }}
                                                    avatar={<DoneIcon style={{ color: "white" }} />} label="Gestion des membres" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#00AF06", color: "white" }} />
                                            ) : (
                                                <Chip
                                                    onClick={() => {
                                                        setManageMembers(!manageMembers);
                                                        props.changeRightFunction(manageMembers, user.id, "manage_members");
                                                    }}
                                                    avatar={<CloseIcon style={{ color: "white" }} />} label="Gestion des membres" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#FF0000", color: "white" }} />
                                            )
                                        }
                                    </Grid>
                                    <Grid item lg={3} md={6} xs={12}>
                                        {
                                            manageEvents ? (
                                                <Chip
                                                    onClick={() => {
                                                        setManageEvents(!manageEvents);
                                                        props.changeRightFunction(manageEvents, user.id, "manage_events");
                                                    }}
                                                    avatar={<DoneIcon style={{ color: "white" }} />} label="Gestion des évènements" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#00AF06", color: "white" }} />
                                            ) : (
                                                <Chip
                                                    onClick={() => {
                                                        setManageEvents(!manageEvents);
                                                        props.changeRightFunction(manageEvents, user.id, "manage_events");
                                                    }}
                                                    avatar={<CloseIcon style={{ color: "white" }} />} label="Gestion des évènements" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#FF0000", color: "white" }} />
                                            )
                                        }
                                    </Grid>
                                    <Grid item lg={3} md={6} xs={12}>
                                        {
                                            manageLockerRoom ? (
                                                <Chip
                                                    onClick={() => {
                                                        setManageLockerRoom(!manageLockerRoom);
                                                        props.changeRightFunction(manageLockerRoom, user.id, "manage_locker_room");
                                                    }}
                                                    avatar={<DoneIcon style={{ color: "white" }} />} label="Gestion du vestiaire" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#00AF06", color: "white" }} />
                                            ) : (
                                                <Chip
                                                    onClick={() => {
                                                        setManageLockerRoom(!manageLockerRoom);
                                                        props.changeRightFunction(manageLockerRoom, user.id, "manage_locker_room");
                                                    }}
                                                    avatar={<CloseIcon style={{ color: "white" }} />} label="Gestion du vestiaire" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#FF0000", color: "white" }} />
                                            )
                                        }
                                    </Grid>
                                    <Grid item lg={3} md={6} xs={12}>
                                        {
                                            manageSinisters ? (
                                                <Chip
                                                    onClick={() => {
                                                        setManageSinisters(!manageSinisters);
                                                        props.changeRightFunction(manageSinisters, user.id, "manage_sinisters");
                                                    }}
                                                    avatar={<DoneIcon style={{ color: "white" }} />} label="Gestion des sinistres" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#00AF06", color: "white" }} />
                                            ) : (
                                                <Chip
                                                    onClick={() => {
                                                        setManageSinisters(!manageSinisters);
                                                        props.changeRightFunction(manageSinisters, user.id, "manage_sinisters");
                                                    }}
                                                    avatar={<CloseIcon style={{ color: "white" }} />} label="Gestion des sinistres" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#FF0000", color: "white" }} />
                                            )
                                        }
                                    </Grid>
                                    <Grid item lg={3} md={6} xs={12}>
                                        {
                                            manageCommunication ? (
                                                <Chip
                                                    onClick={() => {
                                                        setManageCommunication(!manageCommunication);
                                                        props.changeRightFunction(manageCommunication, user.id, "manage_communication");
                                                    }}
                                                    avatar={<DoneIcon style={{ color: "white" }} />} label="Communication générale" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#00AF06", color: "white" }} />
                                            ) : (
                                                <Chip
                                                    onClick={() => {
                                                        setManageCommunication(!manageCommunication);
                                                        props.changeRightFunction(manageCommunication, user.id, "manage_communication");
                                                    }}
                                                    avatar={<CloseIcon style={{ color: "white" }} />} label="Communication générale" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#FF0000", color: "white" }} />
                                            )
                                        }
                                    </Grid>
                                </Grid>
                                {/* USER TYPES  */}
                                <Grid item xs={12}>
                                    <h2 style={{ textAlign: "center", fontSize: "18px" }}>Types du membre</h2>
                                </Grid>
                                <Grid container>
                                    <Grid item lg={3} md={6} xs={12} sytle={{ marginBottom: "20px 20px 10px 20px" }}>
                                        {
                                            activeMember ? (
                                                <Chip
                                                    onClick={() => {
                                                        setActiveMember(!activeMember);
                                                        props.changeTypeFunction(activeMember, user.id, "ACTIF");
                                                    }}
                                                    avatar={<DoneIcon style={{ color: "white" }} />} label="Membre actif" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#00AF06", color: "white" }} />
                                            ) : (
                                                <Chip
                                                    onClick={() => {
                                                        setActiveMember(!activeMember);
                                                        props.changeTypeFunction(activeMember, user.id, "ACTIF");
                                                    }}
                                                    avatar={<CloseIcon style={{ color: "white" }} />} label="Membre actif" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#FF0000", color: "white" }} />
                                            )
                                        }
                                    </Grid>
                                    <Grid item lg={3} md={6} xs={12} sytle={{ marginBottom: "20px 20px 10px 20px" }}>
                                        {
                                            bureauMember ? (
                                                <Chip
                                                    onClick={() => {
                                                        setBureauMember(!bureauMember);
                                                        props.changeTypeFunction(bureauMember, user.id, "BUREAU");
                                                    }}
                                                    avatar={<DoneIcon style={{ color: "white" }} />} label="Membre du bureau" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#00AF06", color: "white" }} />
                                            ) : (
                                                <Chip
                                                    onClick={() => {
                                                        setBureauMember(!bureauMember);
                                                        props.changeTypeFunction(bureauMember, user.id, "BUREAU");
                                                    }}
                                                    avatar={<CloseIcon style={{ color: "white" }} />} label="Membre du bureau" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#FF0000", color: "white" }} />
                                            )
                                        }
                                    </Grid>
                                    <Grid item lg={3} md={6} xs={12} sytle={{ marginBottom: "20px 20px 10px 20px" }}>
                                        {
                                            conseilMember ? (
                                                <Chip
                                                    onClick={() => {
                                                        setConseilMember(!conseilMember);
                                                        props.changeTypeFunction(conseilMember, user.id, "CONSEIL");
                                                    }}
                                                    avatar={<DoneIcon style={{ color: "white" }} />} label="Membre du conseil d'administration" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#00AF06", color: "white" }} />
                                            ) : (
                                                <Chip
                                                    onClick={() => {
                                                        setConseilMember(!conseilMember);
                                                        props.changeTypeFunction(conseilMember, user.id, "CONSEIL");
                                                    }}
                                                    avatar={<CloseIcon style={{ color: "white" }} />} label="Membre du conseil d'administration" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#FF0000", color: "white" }} />
                                            )
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Collapse>
                    </Paper>
                </div>
                <ModifyGeneralDataTab />
                <ModifyLegalGuardiansTab />
                <ModifyInstrumentsTab />
                <ModifyHealthCardTab />
                <ModifyVehiclesTab />
                <ModifyImageRightTab />
            </Popup >

            <ConfirmPopup
                title={"Supprimer un utilisateur"}
                text={"La suppression d'un utilisateur entraînera la suppression de toutes ses données (inscriptions aux évènements, instruments de musique, coordonnées, etc.). Voulez vous vraiment supprimer " + user.firstName + " " + user.lastName + " ? "}
                openPopup={openPopupDeleteConfirm}
                parentCallback={() => setOpenPopupDeleteConfirm(false)}
                confirmButtonId="confirm-delete-user"
                confirmButtonFunction={() => props.deleteFunction(user.id)}
                cancelButtonFunction={() => setOpenPopupDeleteConfirm(false)}
                buttonDisabled={false}
            />
        </div >
    );
}

class MembersAdministrationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: localStorage.getItem("userId"),
            open: false,
            notifOpen: false,
            notifMessage: "",
            users: [],
            allRights: [],
            allTypes: []
        }
    }

    componentDidMount = () => {
        getUsers().then((res) => {
            getAllRights().then((res2) => {
                getAllTypes().then((res3) => {
                    this.setState({ users: res.users, allRights: res2.allRights, allTypes: res3.allTypes });
                })
            });
        });
    }

    deleteUserFunction = (userId) => {
        deleteUser(userId).then((res) => {
            if (res.deleteUser.statusCode == 200) {
                this.setState({
                    users: this.state.users.filter(function (user) {
                        return user.id !== userId
                    }),
                    openPopup: false,
                    notifOpen: true,
                    notifMessage: "Le membre a été supprimé avec succès !",
                    severity: "success"
                });
            } else {
                this.setState({
                    openPopup: false,
                    notifOpen: true,
                    notifMessage: "Une erreur est survenue lors de la suppression de l'utilisateur !",
                    severity: "error"
                })
            }
        });
    }

    changeRight = (value, userId, rightname) => {
        var user = this.state.users.find((user) => user.id == userId);
        var right = this.state.allRights.find((right) => right.name == rightname);
        if (!value) {
            assignRightToUser(userId, right.id).then((res) => {
                if (res.assignRightToUser.statusCode == 200) {
                    var newRight = {
                        right: {
                            name: rightname
                        }
                    }
                    user.userRights.push(newRight);
                }
            })
        } else {
            removeRightFromUser(userId, right.id).then((res) => {
                if (res.removeRightFromUser.statusCode == 200) {
                    user.userRights = user.userRights.filter((item) => item.right.name !== rightname);
                }
            })
        }
    }

    changeType = (value, userId, typeName) => {
        var user = this.state.users.find((user) => user.id == userId);
        var type = this.state.allTypes.find((type) => type.memberType == typeName);
        if (!value) {
            assignTypeToUser(userId, type.id).then((res) => {
                if (res.assignTypeToUser.statusCode == 200) {
                    var newType = {
                        type: {
                            memberType: typeName
                        }
                    }
                    user.userTypes.push(newType);
                }
            })
        } else {
            removeTypeFromUser(userId, type.id).then((res) => {
                if (res.removeTypeFromUser.statusCode == 200) {
                    user.userTypes = user.userTypes.filter((item) => item.type.memberType !== typeName);
                }
            })
        }
    }

    resetNotifOpen = () => {
        this.setState({ notifOpen: false });
    }

    render() {
        const dictionary = this.context["dictionary"]["user"];
        return (
            <div className="body">
                <div style={{ marginBottom: "20px" }}>
                    <h2 style={{ marginBottom: "20px", display: "inline" }}>{dictionary["manage-members"]}</h2>
                    <LinkRouter to="/add/user" style={{ textDecoration: "none" }}>
                        <GreenButton variant="contained" style={{ display: "inline", right: "10%", position: "absolute" }}>
                            <AddIcon style={{ marginRight: "20px", display: "inline", verticalAlign: "middle" }} />
                            <p style={{ display: "inline", verticalAlign: "middle" }}>Ajouter un membre</p>
                        </GreenButton>
                    </LinkRouter>
                </div>
                <div className="usersTab">
                    <Grid container className="tabHeader" style={{ marginBottom: "10px" }}>
                        <Grid item lg={2} md={6} xs={12} style={{ paddingLeft: "30px" }}>
                            <p className="titleTab">Nom</p>
                        </Grid>
                        <Grid item lg={2} md={6} xs={12} style={{ paddingLeft: "30px" }}>
                            <p className="titleTab">Prénom</p>
                        </Grid>
                        <Grid item lg={1} md={6} xs={12} style={{ paddingLeft: "30px" }}>
                            <p className="titleTab">Validé</p>
                        </Grid>
                        <Grid item lg={2} md={6} xs={12} style={{ paddingLeft: "30px" }}>
                            <p className="titleTab">N° de téléphone</p>
                        </Grid>
                        <Grid item lg={3} md={6} xs={12} style={{ paddingLeft: "30px" }}>
                            <p className="titleTab">Email</p>
                        </Grid>
                        <Grid item lg={2} md={6} xs={12} style={{ paddingLeft: "30px" }}>
                            <p className="titleTab">Actions</p>
                        </Grid>
                    </Grid>
                    {
                        this.state.users.filter((user) => user.email !== superUserEmail).map(user => {
                            return (
                                <Row
                                    key={user.id}
                                    user={user}
                                    userId={this.state.userId}
                                    changeRightFunction={(value, userId, rightname) => this.changeRight(value, userId, rightname)}
                                    changeTypeFunction={(value, userId, typeName) => this.changeType(value, userId, typeName)}
                                    deleteFunction={(userId) => this.deleteUserFunction(userId)}
                                    dictionary={dictionary}
                                />
                            );
                        })
                    }
                </div>
                {
                    this.state.notifOpen ? (
                        <CustomizedSnackbars
                            open={true}
                            timer={3000}
                            message={this.state.notifMessage}
                            severity={this.state.severity}
                            functionCallback={() => this.resetNotifOpen()}
                        />
                    ) : ""
                }
            </div>
        )
    }
}
MembersAdministrationPage.contextType = AppContext;
export default MembersAdministrationPage;