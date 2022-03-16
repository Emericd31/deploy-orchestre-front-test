import React from "react";
import { GreenButton, RedButton } from "../../components/General/StyledComponents/StyledComponents";
import { Link as LinkRouter } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { Collapse, Grid } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import "../../App.css";
import "../../styles/membersAdmin.css";
import { getUsers } from "../../GraphQL/queries/UserQueries";

function Row(props) {
    const { user } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Grid container key={user.id} style={{ border: "1px solid #E0E0E0", borderRadius: "2px", backgroundColor: "white" }}>
                <Grid item lg={2} md={6} xs={12}>
                    <p className="contentTab">{user.lastName}</p>
                </Grid>
                <Grid item lg={2} md={6} xs={12}>
                    <p className="contentTab">{user.firstName}</p>
                </Grid>
                <Grid item lg={1} md={6} xs={12}>
                    <p className="contentTab">{user.isRegistered ? <CheckCircleIcon style={{ color: "green" }} /> : <CancelIcon style={{ color: "red" }} />}</p>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <p className="contentTab">{user.email}</p>
                </Grid>
                <Grid item lg={2} md={12} xs={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div className="actionButtons">
                        <GreenButton className="button"><EditIcon /></GreenButton>
                        <RedButton className="button"><DeleteIcon /></RedButton>
                    </div>
                </Grid>
                <Grid item lg={1} md={12} xs={12} className="arrow" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                        style={{ float: "right" }}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </Grid>
            </Grid>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <div style={{ height: "50px", width: "100%", backgroundColor: "gray" }}>
                </div>
            </Collapse>
        </>
    );
}

class MembersAdministrationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            users: []
        }
    }

    componentDidMount = () => {
        getUsers().then((res) => {
            this.setState({ users: res.users });
        });
    }

    render() {
        return (
            <div className="body">
                <div style={{ marginBottom: "20px" }}>
                    <h2 style={{ marginBottom: "20px", display: "inline" }}>Gestion des membres</h2>
                    <LinkRouter to="/add/user" style={{ textDecoration: "none" }}>
                        <GreenButton variant="contained" style={{ display: "inline", right: "10%", position: "absolute" }}>
                            <AddIcon style={{ marginRight: "20px" }} />Ajouter un membre
                        </GreenButton>
                    </LinkRouter>
                </div>
                <div className="usersTab">
                    <Grid container className="tabHeader">
                        <Grid item lg={2} md={6} xs={12}>
                            <p className="contentTab">Nom</p>
                        </Grid>
                        <Grid item lg={2} md={6} xs={12}>
                            <p className="contentTab">Prénom</p>
                        </Grid>
                        <Grid item lg={1} md={6} xs={12}>
                            <p className="contentTab">Compte validé</p>
                        </Grid>
                        <Grid item lg={4} md={6} xs={12}>
                            <p className="contentTab">Email</p>
                        </Grid>
                        <Grid item lg={2} md={6} xs={12}>
                            <p className="contentTab">Actions</p>
                        </Grid>
                    </Grid>
                    {
                        this.state.users.map(user => {
                            return (
                                <Row user={user} key={user.id} />
                            );
                        })
                    }
                </div>
                {/* <EventTabGestion /> */}
            </div>
        )
    }
}

export default MembersAdministrationPage;