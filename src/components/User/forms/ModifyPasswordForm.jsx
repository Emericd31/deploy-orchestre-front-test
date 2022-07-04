import "../../../styles/Form.css";
import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import BriefedTextField from "../../General/TextFields/BriefedTextField";
import LiveBriefedTextField from "../../General/TextFields/LiveBriefedTextField";
import Alert from '@mui/material/Alert';
import { modifyPassword } from "../../../GraphQL/mutations/UserMutations";
import CustomizedSnackbars from "../../General/Popups/CustomizedSnackbar";
import Popup from "../../General/Popups/Popup";
import { GreenButton } from "../../General/StyledComponents/StyledButtons";
import { Navigate } from "react-router-dom";
import PasswordIcon from '@mui/icons-material/Password';
import { IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

class ModifyPasswordForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            oldPassword: { value: "", isValid: false },
            password: { value: "", isValid: false },
            confirmPassword: { value: "", isValid: false },
            openPopupPasswordModified: false,
            disconnect: false,
            oldPasswordVisible: false,
            passwordVisible: false,
            confirmPasswordVisible: false,
            openNotifSamePasswordError: false,
            openNotifOldPasswordError: false,
            openNotifError: false,
            areAllFieldsValid: false,
            errorAlert: null,
            successAlert: null,
            redirect: null,
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

    passwordSyntaxCheck = (password) => {
        var re = {
            'capital': /[A-Z]/,
            'digit': /[0-9]/,
        };

        return re.capital.test(password) &&
            re.digit.test(password) &&
            password.length >= 8 &&
            password.length <= 20;
    };

    confirmPasswordSyntaxCheck = (confirmPassword, password) => {
        return confirmPassword === password;
    };

    checkFormValidity() {
        this.setState({
            areAllFieldsValid:
                this.state.oldPassword.isValid &&
                this.state.password.isValid &&
                this.state.confirmPassword.isValid,
        });
    }

    submitClick = (event) => {
        event.preventDefault();
        modifyPassword(this.state.oldPassword.value, this.state.password.value).then((res) => {
            if (res.modifyPassword.statusCode == 200) {
                this.setState({ openPopupPasswordModified: true });
            } else {
                if (res.modifyPassword.message === "FAILURE: Unable to change password because it is the same as previous password.") {
                    this.setState({ openNotifSamePasswordError: true });
                } else if (res.modifyPassword.message === "FAILURE: The old password is wrong.") {
                    this.setState({ openNotifOldPasswordError: true });
                } else {
                    this.setState({ openNotifError: true });
                }
            }
        })
    };

    resetNotifOpen = () => {
        this.setState({ openNotifError: false, openNotifOldPasswordError: false, openNotifSamePasswordError: false });
    }

    disconnect() {
        localStorage.clear();
        this.setState({ disconnect: true });
    }

    render() {
        const { errorAlert, successAlert } = this.state;
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
                                    <PasswordIcon color="primary" style={{ fontSize: "60" }} />
                                </div>
                                <p style={{ textAlign: "center" }}>La modification du mot de passe entraînera la déconnexion, vous serez automatiquement redirigé vers la page de connexion.</p>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <p style={{ textAlign: "center" }}>Mot de passe actuel : </p>
                            </Grid>
                            <Grid
                                item
                                xs={12} md={9}
                                sx={{ marginTop: { xs: "-20px", md: "10px" }, display: "flex" }}
                            >
                                <div style={{ width: "90%" }}>
                                    <BriefedTextField
                                        id={"old-password-field"}
                                        label="Mot de passe actuel"
                                        type={this.state.oldPasswordVisible ? "text" : "password"}
                                        required={true}
                                        saveField={(input, errorState) =>
                                            this.updateField("oldPassword", input, errorState)
                                        }
                                    />
                                </div>
                                <div style={{ width: "45px", height: "45px" }}>
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={() => this.setState({ oldPasswordVisible: !this.state.oldPasswordVisible })}
                                    >
                                        {
                                            this.state.oldPasswordVisible ? (
                                                <VisibilityIcon />
                                            ) : (
                                                <VisibilityOffIcon />
                                            )
                                        }
                                    </IconButton>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <p style={{ textAlign: "center" }}>Nouveau mot de passe : </p>
                            </Grid>
                            <Grid
                                item
                                xs={12} md={9}
                                sx={{ marginTop: { xs: "-20px", md: "10px" }, display: "flex" }}
                            >
                                <div style={{ width: "90%" }}>
                                    <LiveBriefedTextField
                                        id={"password-field"}
                                        label="Mot de passe"
                                        type={this.state.passwordVisible ? "text" : "password"}
                                        required={true}
                                        helperText="La syntaxe du mot de passe n'est pas valide. Veuillez vous assurer qu'il contienne entre 8 et 20 caractères
                dont un nombre, une minuscule et une majuscule."
                                        saveField={(input, errorState) =>
                                            this.updateField("password", input, errorState)
                                        }
                                        syntaxChecker={this.passwordSyntaxCheck}
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
                                <p style={{ textAlign: "center" }}>Confirmation du nouveau mot de passe : </p>
                            </Grid>
                            <Grid
                                item
                                xs={12} md={9}
                                sx={{ marginTop: { xs: "-20px", md: "20px" }, display: "flex" }}
                            >
                                <div style={{ width: "90%" }}>
                                    <LiveBriefedTextField
                                        id="confirmPassword-field"
                                        label="Vérifier le mot de passe"
                                        type={this.state.confirmPasswordVisible ? "text" : "password"}
                                        required={true}
                                        helperText="Les deux mots de passe ne sont pas identiques."
                                        saveField={(input, errorState) =>
                                            this.updateField("confirmPassword", input, errorState)
                                        }
                                        syntaxChecker={(input) =>
                                            this.confirmPasswordSyntaxCheck(
                                                input,
                                                this.state.password.value
                                            )
                                        }
                                        updateChecker={this.state.password.value}
                                    />
                                </div>
                                <div style={{ width: "45px", height: "45px" }}>
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={() => this.setState({ confirmPasswordVisible: !this.state.confirmPasswordVisible })}
                                    >
                                        {
                                            this.state.confirmPasswordVisible ? (
                                                <VisibilityIcon />
                                            ) : (
                                                <VisibilityOffIcon />
                                            )
                                        }
                                    </IconButton>
                                </div>
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
                                    Modifier le mot de passe
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <div className="alert">
                        {errorAlert && <Alert severity="error"> {errorAlert} </Alert>}
                        {successAlert && <Alert severity="success"> {successAlert} </Alert>}
                    </div>
                    <Popup
                        title="Mot de passe modifié"
                        length="xs"
                        openPopup={this.state.openPopupPasswordModified}
                        closable={"false"}
                        parentCallback={() =>
                            this.setState({ openPopupPasswordModified: false })
                        }
                    >
                        <p style={{ textAlign: "center" }}>Votre mot de passe a été modifié avec succès, appuyer sur le bouton suivant pour vous déconnecter.</p>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <GreenButton onClick={() => this.disconnect()}>Se déconnecter</GreenButton>
                        </div>
                    </Popup>
                    {
                        this.state.openNotifError ? (
                            <CustomizedSnackbars
                                open={true}
                                timer={5000}
                                message={"Une erreur est survenue lors de la modification du mot de passe."}
                                severity={"error"}
                                functionCallback={() => this.resetNotifOpen()}
                            />
                        ) : ""
                    }
                    {
                        this.state.openNotifOldPasswordError ? (
                            <CustomizedSnackbars
                                open={true}
                                timer={5000}
                                message={"Le mot de passe actuel est incorrect."}
                                severity={"error"}
                                functionCallback={() => this.resetNotifOpen()}
                            />
                        ) : ""
                    }
                    {
                        this.state.openNotifSamePasswordError ? (
                            <CustomizedSnackbars
                                open={true}
                                timer={5000}
                                message={"Le nouveau mot de passe saisi est identique au mot de passe actuel."}
                                severity={"error"}
                                functionCallback={() => this.resetNotifOpen()}
                            />
                        ) : ""
                    }
                </div>)
        );
    }
}

export default ModifyPasswordForm;
