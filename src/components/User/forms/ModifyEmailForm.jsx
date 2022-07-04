import "../../../styles/Form.css";
import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import BriefedTextField from "../../General/TextFields/BriefedTextField";
import LiveBriefedTextField from "../../General/TextFields/LiveBriefedTextField";
import CustomizedSnackbars from "../../General/Popups/CustomizedSnackbar";
import Popup from "../../General/Popups/Popup";
import { GreenButton } from "../../General/StyledComponents/StyledButtons";
import { Navigate } from "react-router-dom";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { modifyCurrentUserEmail } from "../../../GraphQL/mutations/UserMutations";

const emailRegexSafe = require("email-regex-safe");

class ModifyEmailForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: { value: "", isValid: false },
            passwordVisible: false,
            email: { value: "", isValid: false },
            confirmEmail: { value: "", isValid: false },
            openPopupEmailModified: false,
            disconnect: false,
            openNotifError: false,
            openNotifExistingEmailError: false,
            openNotifIncorrectPasswordError: false,
            openNotifSameEmailError: false,
            areAllFieldsValid: false,
            isLoading: false,
        };
    }
    updateField(field, input, errorState) {
        this.setState(
            {
                [field]: {
                    value: input,
                    isValid: !errorState,
                },
            },
            () => this.checkFormValidity()
        );
    }

    confirmEmailSyntaxCheck = (confirmEmail, email) => {
        return confirmEmail.match(emailRegexSafe()) && confirmEmail === email;
    };

    checkFormValidity() {
        this.setState({
            areAllFieldsValid:
                this.state.password.isValid &&
                this.state.email.isValid &&
                this.state.confirmEmail.isValid
        });
    }

    submitClick = (event) => {
        event.preventDefault();
        modifyCurrentUserEmail(this.state.email.value, this.state.password.value).then((res) => {
            if (res.modifyCurrentUserEmail.statusCode == 200) {
                this.setState({ openPopupEmailModified: true });
            } else if (res.modifyCurrentUserEmail.statusCode == 400) {
                this.setState({ openNotifExistingEmailError: true });
            } else {
                if (res.modifyCurrentUserEmail.message === "FAILURE: Wrong password.") {
                    this.setState({ openNotifIncorrectPasswordError: true });
                } else if (res.modifyCurrentUserEmail.message === "FAILURE: Unable to change email address because it is the same as the previous one.") {
                    this.setState({ openNotifSameEmailError: true });
                } else {
                    this.setState({ openNotifError: true });
                }
            }
        })
    };

    emailSyntaxCheck = (email) => {
        return email.match(emailRegexSafe());
    };

    resetNotifOpen = () => {
        this.setState({ openNotifError: false, openNotifExistingEmailError: false, openNotifIncorrectPasswordError: false, openNotifSameEmailError: false });
    }

    disconnect() {
        localStorage.clear();
        this.setState({ disconnect: true });
    }

    render() {
        return (
            this.state.disconnect ? (
                <Navigate to="/signin" />
            ) : (
                <div>
                    <form onSubmit={this.submitClick}>
                        <Grid
                            container
                            spacing={3}
                        >

                            <Grid item xs={12}>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <AlternateEmailIcon color="primary" style={{ fontSize: "60" }} />
                                </div>
                                <p style={{ textAlign: "center" }}>
                                    La modification de l'email entraînera la déconnexion, vous serez automatiquement redirigé vers la page de connexion.
                                    <br />Vous recevrez un mail sur votre nouvelle adresse email vous demandant de confirmer de nouveau  votre compte.
                                    <br />Il sera nécessaire de le valider de nouveau afin de vous reconnecter.
                                </p>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <p style={{ textAlign: "center" }}>Votre mot de passe : </p>
                            </Grid>
                            <Grid
                                item
                                xs={12} md={9}
                                sx={{ marginTop: { xs: "-20px", md: "10px" }, display: "flex" }}
                            >
                                <div style={{ width: "90%" }}>
                                    <BriefedTextField
                                        id={"password-field"}
                                        label="Mot de passe"
                                        type={this.state.passwordVisible ? "text" : "password"}
                                        required={true}
                                        saveField={(input, errorState) =>
                                            this.updateField("password", input, errorState)
                                        }
                                    />
                                </div>
                                <div style={{ width: "45px", height: "45px" }}>
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={() => this.setState({ passwordVisible: !this.state.passwordVisible })}
                                    >
                                        {
                                            this.state.passwordVisible ? (
                                                <VisibilityIcon />
                                            ) : (
                                                <VisibilityOffIcon />
                                            )
                                        }
                                    </IconButton>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <p style={{ textAlign: "center" }}>Nouvelle adresse email : </p>
                            </Grid>
                            <Grid
                                item
                                xs={12} md={9}
                                sx={{ marginTop: { xs: "-20px", md: "10px" } }}
                            >
                                <LiveBriefedTextField
                                    id={"email-field"}
                                    label="Email"
                                    type="email"
                                    required={true}
                                    helperText="La syntaxe de l'e-mail n'est pas valide."
                                    saveField={(input, errorState) =>
                                        this.updateField("email", input, errorState)
                                    }
                                    syntaxChecker={this.emailSyntaxCheck}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <p style={{ textAlign: "center" }}>Confirmation de la nouvelle adresse email : </p>
                            </Grid>
                            <Grid
                                item
                                xs={12} md={9}
                                sx={{ marginTop: { xs: "-20px", md: "20px" } }}
                            >
                                <LiveBriefedTextField
                                    id={"confirm-email-field"}
                                    label="Email"
                                    type="email"
                                    required={true}
                                    helperText="La syntaxe de l'e-mail n'est pas valide ou les deux emails ne sont pas identiques."
                                    saveField={(input, errorState) =>
                                        this.updateField("confirmEmail", input, errorState)
                                    }
                                    syntaxChecker={(input) => this.confirmEmailSyntaxCheck(input, this.state.email.value)}
                                    updateChecker={this.state.email.value}
                                />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                            >
                                <Button
                                    style={{
                                        width: "60%",
                                        marginLeft: "20%",
                                        marginrigth: "20%",
                                    }}
                                    id={"sign-up-button"}
                                    type="submit"
                                    disabled={!this.state.areAllFieldsValid}
                                    variant="contained"
                                    color="primary"
                                    fullWidth={true}
                                >
                                    Modifier l'adresse email'
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <Popup
                        title="Adresse email modifiée"
                        length="xs"
                        openPopup={this.state.openPopupEmailModified}
                        closable={"false"}
                        parentCallback={() =>
                            this.setState({ openPopupEmailModified: false })
                        }
                    >
                        <p style={{ textAlign: "center" }}>Votre adresse email a été modifiée avec succès et un mail vous a été envoyé, appuyer sur le bouton suivant pour vous déconnecter.</p>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <GreenButton onClick={() => this.disconnect()}>Se déconnecter</GreenButton>
                        </div>
                    </Popup>
                    {
                        this.state.openNotifError ? (
                            <CustomizedSnackbars
                                open={true}
                                timer={5000}
                                message={"Une erreur est survenue lors de la modification de l'adresse email."}
                                severity={"error"}
                                functionCallback={() => this.resetNotifOpen()}
                            />
                        ) : ""
                    }
                    {
                        this.state.openNotifExistingEmailError ? (
                            <CustomizedSnackbars
                                open={true}
                                timer={5000}
                                message={"La nouvelle adresse email saisie est déjà associée à un compte existant."}
                                severity={"error"}
                                functionCallback={() => this.resetNotifOpen()}
                            />
                        ) : ""
                    }
                    {
                        this.state.openNotifIncorrectPasswordError ? (
                            <CustomizedSnackbars
                                open={true}
                                timer={5000}
                                message={"Le mot de passe saisi est incorrect."}
                                severity={"error"}
                                functionCallback={() => this.resetNotifOpen()}
                            />
                        ) : ""
                    }
                    {
                        this.state.openNotifSameEmailError ? (
                            <CustomizedSnackbars
                                open={true}
                                timer={5000}
                                message={"La nouvelle adresse email saisie est identique à l'adresse email actuelle."}
                                severity={"error"}
                                functionCallback={() => this.resetNotifOpen()}
                            />
                        ) : ""
                    }
                </div>)
        );
    }
}

export default ModifyEmailForm;
