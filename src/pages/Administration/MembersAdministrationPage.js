import React from "react";
import { GreenButton, GreenSwitch, RedButton } from "../../components/General/StyledComponents/StyledButtons";
import { Link as LinkRouter } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { Chip, Collapse, Grid } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import "../../App.css";
import "../../styles/membersAdmin.css";
import { getAllRights, getUsers } from "../../GraphQL/queries/UserQueries";
import { rightIsInRoleV2 } from "../../Helpers/RightsGestion";
import Popup from "../../components/General/Popups/Popup";
import ConfirmPopup from "../../components/General/Popups/ConfirmPopup";
import { assignRightToUser, deleteUser, removeRightFromUser } from "../../GraphQL/mutations/UserMutations";
import { AppContext } from "../../Context";
import CustomizedSnackbars from "../../components/General/Popups/CustomizedSnackbar";
import { superUserEmail } from "../../GraphQL/settings";
import ActionButtons from "../../components/General/Buttons/ActionButtons";

function Row(props) {
    const { user } = props;
    const [open, setOpen] = React.useState(false);
    const [openPopupEdit, setOpenPopupEdit] = React.useState(false);
    const [openPopupDeleteConfirm, setOpenPopupDeleteConfirm] = React.useState(false);

    // rights
    const [accessApp, setAccessApp] = React.useState(rightIsInRoleV2(user.userRights, "access_app"));
    const [manageMembers, setManageMembers] = React.useState(rightIsInRoleV2(user.userRights, "manage_members"));
    const [manageEvents, setManageEvents] = React.useState(rightIsInRoleV2(user.userRights, "manage_events"));
    const [manageLockerRoom, setManageLockerRoom] = React.useState(rightIsInRoleV2(user.userRights, "manage_locker_room"));
    const [manageSinisters, setManageSinisters] = React.useState(rightIsInRoleV2(user.userRights, "manage_sinisters"));
    const [manageCommunication, setManageCommunication] = React.useState(rightIsInRoleV2(user.userRights, "manage_communication"));

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
                        {open ? <KeyboardArrowUpIcon sx={{ color: { xs: "white", lg: "black" }}} /> : <KeyboardArrowDownIcon sx={{ color: { xs: "white", lg: "black" }}} />}
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
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <h2 style={{ textAlign: "center" }}>Modifier les droits</h2>
                        </Grid>
                        {/* First line */}
                        <Grid item xs={0} md={2}></Grid>
                        <Grid item xs={6} md={2} style={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
                            <p>Accès à l'application</p>
                        </Grid>
                        <Grid item xs={6} md={1} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <GreenSwitch checked={accessApp} onChange={(event) => {
                                setAccessApp(!accessApp);
                                props.changeRightFunction(event, user.id, "access_app");
                            }
                            } />
                        </Grid>
                        <Grid item xs={0} md={2}></Grid>
                        <Grid item xs={6} md={2} style={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
                            <p>Gestion des membres</p>
                        </Grid>
                        <Grid item xs={6} md={1} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <GreenSwitch checked={manageMembers} onChange={(event) => {
                                setManageMembers(!manageMembers);
                                props.changeRightFunction(event, user.id, "manage_members");
                            }
                            } />
                        </Grid>
                        <Grid item xs={0} md={2}></Grid>

                        {/* second line */}
                        <Grid item xs={0} md={2}></Grid>
                        <Grid item xs={6} md={2} style={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
                            <p>Gestion des évènements</p>
                        </Grid>
                        <Grid item xs={6} md={1} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <GreenSwitch checked={manageEvents} onChange={(event) => {
                                setManageEvents(!manageEvents);
                                props.changeRightFunction(event, user.id, "manage_events");
                            }
                            } />
                        </Grid>
                        <Grid item xs={0} md={2}></Grid>
                        <Grid item xs={6} md={2} style={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
                            <p>Gestion du vestiaire</p>
                        </Grid>
                        <Grid item xs={6} md={1} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <GreenSwitch checked={manageLockerRoom} onChange={(event) => {
                                setManageLockerRoom(!manageLockerRoom);
                                props.changeRightFunction(event, user.id, "manage_locker_room");
                            }
                            } />
                        </Grid>
                        <Grid item xs={0} md={2}></Grid>

                        {/* third line */}
                        <Grid item xs={0} md={2}></Grid>
                        <Grid item xs={6} md={2} style={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
                            <p>Gestion des sinistres</p>
                        </Grid>
                        <Grid item xs={6} md={1} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <GreenSwitch checked={manageSinisters} onChange={(event) => {
                                setManageSinisters(!manageSinisters);
                                props.changeRightFunction(event, user.id, "manage_sinisters");
                            }
                            } />
                        </Grid>
                        <Grid item xs={0} md={2}></Grid>
                        <Grid item xs={6} md={2} style={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
                            <p>Communication générale</p>
                        </Grid>
                        <Grid item xs={6} md={1} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <GreenSwitch checked={manageCommunication} onChange={(event) => {
                                setManageCommunication(!manageCommunication);
                                props.changeRightFunction(event, user.id, "manage_communication");
                            }
                            } />
                        </Grid>
                        <Grid item xs={0} md={2}></Grid>
                    </Grid>
                </div>
            </Popup>

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
        </div>
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
            allRights: []
        }
    }

    componentDidMount = () => {
        getUsers().then((res) => {
            this.setState({ users: res.users }, () => {
                getAllRights().then((res) => {
                    this.setState({ allRights: res.allRights });
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

    changeRight = (event, userId, rightname) => {
        var user = this.state.users.find((user) => user.id == userId);
        var right = this.state.allRights.find((right) => right.name == rightname);
        if (event.target.checked) {
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
                                    changeRightFunction={(event, userId, rightname) => this.changeRight(event, userId, rightname)}
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