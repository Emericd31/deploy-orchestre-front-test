import React from "react";
import { IconButton, Collapse, Grid } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getPersonalData } from "../../../GraphQL/queries/UserQueries";
import { GreenButton } from "../../General/StyledComponents/StyledButtons";
import Popup from "../../General/Popups/Popup";
import ModifyPasswordForm from "../forms/ModifyPasswordForm";
import ModifyEmailForm from "../forms/ModifyEmailForm";

class LoginTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopupEdit: false,
            open: false,
            user: null,
            openPopupEditEmail: false,
            openPopupEditPassword: false,
            loading: true,
        }
    }

    componentDidMount = () => {
        getPersonalData().then((res) => {
            this.setState({ user: res.currentUser }, () => {
                this.setState({ loading: false });
            });
        })
    };

    handleEditClick() {
        this.setState({ openPopupEdit: true }, () => {
            this.props.functionCallback(true);
        });
    }

    render() {
        return (
            !this.state.loading ?
                (<div style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "20px" }}>
                    <div style={{ display: "flex" }}>
                        <p style={{ marginLeft: "20px" }}>Mes identifiants</p>
                        <div style={{ margin: "auto 10px auto auto" }}>
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => this.setState({ open: !this.state.open })}
                            >
                                {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </div>
                    </div>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <Grid container style={{ marginBottom: "20px" }}>
                            <Grid item xs={6} md={3}>
                                <p style={{ paddingLeft: "20px" }}>Email : </p>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <p>{this.state.user.email}</p>
                            </Grid>
                            <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: { xs : "center", md: "left" }, alignItems: "center" }}>
                                <GreenButton onClick={() => this.setState({ openPopupEditEmail: true })}>
                                    Modifier son email
                                </GreenButton>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <p style={{ paddingLeft: "20px" }}>Mot de passe :</p>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <p>**********</p>
                            </Grid>
                            <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: { xs : "center", md: "left" }, alignItems: "center" }}>
                                <GreenButton onClick={() => this.setState({ openPopupEditPassword: true })}>
                                    Modifier son mot de passe
                                </GreenButton>
                            </Grid>
                        </Grid>
                    </Collapse>
                    <Popup
                        title="Modifier son adresse email"
                        length="md"
                        openPopup={this.state.openPopupEditEmail}
                        parentCallback={() =>
                            this.setState({ openPopupEditEmail: false })
                        }
                    >
                        <ModifyEmailForm />
                    </Popup>
                    <Popup
                        title="Modifier son mot de passe"
                        length="md"
                        openPopup={this.state.openPopupEditPassword}
                        parentCallback={() =>
                            this.setState({ openPopupEditPassword: false })
                        }
                    >
                        <ModifyPasswordForm />
                    </Popup>
                </div>) : ""
        );
    }
}

export default LoginTab; 