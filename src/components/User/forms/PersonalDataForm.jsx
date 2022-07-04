import React, { Component } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button"
import EditIcon from '@mui/icons-material/Edit';
import BriefedTextField from "../../General/TextFields/BriefedTextField";
import LiveBriefedTextField from "../../General/TextFields/LiveBriefedTextField";
import { modifyCurrentUserInfo } from "../../../GraphQL/mutations/UserMutations";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CustomizedSnackbars from "../../General/Popups/CustomizedSnackbar";

const emailRegexSafe = require("email-regex-safe");

class PersonalDataForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notifOpen: false,
            isAdmin: this.props.isAdmin,
            firstname: this.props.user.firstname,
            lastname: this.props.user.lastname,
            birthday: this.props.user.birthday,
            birthplace: this.props.user.birthplace,
            address: this.props.user.address,
            addressComplement: this.props.user.addressComplement,
            postalCode: this.props.user.postalCode,
            city: this.props.user.city,
            phoneNumber: this.props.user.phoneNumber,
            mobileNumber: this.props.user.mobileNumber,
            areFieldsValid: false
        }
    }

    componentDidMount = () => {
        this.checkRequiredFields();
    }

    updateField(field, input, errorState) {
        this.setState(
            {
                [field]: input
            },
            () => this.checkRequiredFields()
        );
    }

    checkRequiredFields() {
        let firstnameValid = this.state.firstname !== "";
        let lastnameValid = this.state.lastname !== "";
        let birthdayValid = this.state.birthday !== "";
        let birthPlaceValid = this.state.birthplace !== "";
        let addressValid = this.state.address !== "";
        let postalCodeValid = this.state.postalCode !== "" && this.postalCodeSyntaxCheck(this.state.postalCode);
        let cityValid = this.state.city !== "";
        let mobileNumberValid = this.state.mobileNumber !== "" && this.phoneSyntaxCheck(this.state.mobileNumber);
        let phoneNumberValid = this.state.phoneNumber === "" || (this.state.phoneNumber !== "" && this.phoneSyntaxCheck(this.state.phoneNumber));

        let currentFieldsAreValid = this.state.areFieldsValid;
        let checkValidity =
            firstnameValid &&
            lastnameValid &&
            birthdayValid &&
            birthPlaceValid &&
            addressValid &&
            postalCodeValid &&
            cityValid &&
            mobileNumberValid &&
            phoneNumberValid;

        if ((currentFieldsAreValid && !checkValidity) || (!currentFieldsAreValid && checkValidity)) {
            this.setState({
                areFieldsValid: checkValidity
            });
        }
    }

    emailSyntaxCheck = (email) => {
        return email.match(emailRegexSafe());
    };

    postalCodeSyntaxCheck = (postalCode) => {
        const regex = /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/;
        return postalCode.match(regex);
    }

    phoneSyntaxCheck = (phone) => {
        const regex = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
        return phone.match(regex);
    }

    savePersonalData() {
        var user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            birthday: this.state.birthday,
            birthplace: this.state.birthplace,
            address: this.state.address,
            addressComplement: this.state.addressComplement,
            city: this.state.city,
            postalCode: this.state.postalCode,
            phoneNumber: this.state.phoneNumber,
            mobileNumber: this.state.mobileNumber
        }
        modifyCurrentUserInfo(
            this.state.firstname,
            this.state.lastname,
            this.state.birthday,
            this.state.birthplace,
            this.state.address,
            this.state.addressComplement,
            this.state.city,
            this.state.postalCode,
            this.state.phoneNumber,
            this.state.mobileNumber
        ).then((res) => {
            if (res.modifyCurrentUserInfo.statusCode == 200) {
                this.props.functionCallback(user);
            }
        });
    }

    render() {
        return (
            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        marginRight: "1%",
                        marginBottom: "3%",
                    }}
                >
                    <EditIcon color="primary" style={{ fontSize: 60 }} />
                </div>
                <Grid container direction="column" spacing={3}>
                    <Grid item container direction="row" spacing={3}>
                        <Grid item xs={12} md={12} lg={6}>
                            <BriefedTextField
                                id={"lastname-field"}
                                required={true}
                                label="Nom"
                                type="text"
                                name="text"
                                value={this.state.lastname}
                                saveField={(input, errorState) =>
                                    this.updateField("lastname", input, errorState)
                                }
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={6}>
                            <BriefedTextField
                                id={"firstname-field"}
                                required={true}
                                label="Prénom"
                                type="text"
                                value={this.state.firstname}
                                saveField={(input, errorState) =>
                                    this.updateField("firstname", input, errorState)
                                }
                            />
                        </Grid>
                    </Grid>

                    <Grid item container direction="row" spacing={3}>
                        <Grid item xs={12} md={12} lg={6}>
                            <BriefedTextField
                                id={"birthday-field"}
                                required={true}
                                label="Date de naissance"
                                type="date"
                                name="date"
                                value={
                                    this.state.birthday !== ""
                                        ? this.state.birthday
                                        : "2000-01-01"
                                }
                                saveField={(input, errorState) =>
                                    this.updateField("birthday", input, errorState)
                                }
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={6}>
                            <BriefedTextField
                                id={"birthplace-field"}
                                required={true}
                                label="Lieu de naissance"
                                type="text"
                                value={this.state.birthplace}
                                saveField={(input, errorState) =>
                                    this.updateField("birthplace", input, errorState)
                                }
                            />
                        </Grid>
                    </Grid>

                    <Grid item container direction="row" spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <BriefedTextField
                                id={"address-field"}
                                required={true}
                                label="Adresse"
                                type="text"
                                name="text"
                                value={this.state.address}
                                saveField={(input, errorState) =>
                                    this.updateField("address", input, errorState)
                                }
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <BriefedTextField
                                id={"addressComplement-field"}
                                label="Complément d'adresse"
                                type="text"
                                value={this.state.addressComplement}
                                saveField={(input, errorState) =>
                                    this.updateField("addressComplement", input, errorState)
                                }
                            />
                        </Grid>
                    </Grid>

                    <Grid item container direction="row" spacing={3}>
                        <Grid item xs={12} md={12} lg={4}>
                            <LiveBriefedTextField
                                id={"postalCode-field"}
                                required={true}
                                label="Code Postal"
                                type="text"
                                value={this.state.postalCode}
                                helperText="La syntaxe du code postal n'est pas valide."
                                saveField={(input, errorState) =>
                                    this.updateField("postalCode", input, errorState)
                                }
                                syntaxChecker={this.postalCodeSyntaxCheck}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={8}>
                            <BriefedTextField
                                id={"city-field"}
                                required={true}
                                label="Ville"
                                type="text"
                                value={this.state.city}
                                saveField={(input, errorState) =>
                                    this.updateField("city", input, errorState)
                                }
                            />
                        </Grid>
                    </Grid>

                    <Grid item container direction="row" spacing={3}>
                        <Grid item xs={12} md={12} lg={6}>
                            <LiveBriefedTextField
                                id={"phoneNumber-field"}
                                required={false}
                                label="Téléphone Fixe"
                                type="tel"
                                name="phoneNumber"
                                value={this.state.phoneNumber}
                                helperText="La syntaxe du numéro de téléphone n'est pas valide."
                                saveField={(input, errorState) =>
                                    this.updateField("phoneNumber", input, errorState)
                                }
                                syntaxChecker={this.phoneSyntaxCheck}
                            />
                        </Grid>

                        <Grid item xs={12} md={12} lg={6}>
                            <LiveBriefedTextField
                                id={"mobileNumber-field"}
                                required={true}
                                label="Téléphone Mobile"
                                type="tel"
                                value={this.state.mobileNumber}
                                helperText="La syntaxe du numéro de téléphone n'est pas valide."
                                saveField={(input, errorState) =>
                                    this.updateField("mobileNumber", input, errorState)
                                }
                                syntaxChecker={this.phoneSyntaxCheck}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                {
                    !this.state.isAdmin ? (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                width: "100%",
                                marginRight: "1%",
                            }}
                        >
                            <Button
                                disabled={!this.state.areFieldsValid}
                                style={{ marginTop: "50px", textAlign: "center" }}
                                variant="contained"
                                color="primary"
                                onClick={() => this.savePersonalData()}
                                type="submit"
                            >
                                Modifier
                            </Button>
                        </div>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginTop: "20px",
                                paddingBottom: "20px"
                            }}
                        >
                            <Button
                                disabled={!this.state.fieldsAreValid}
                                onClick={() => this.saveUserInfo()}
                                variant="contained"
                                sx={{
                                    backgroundColor: "#1876D2"
                                }}
                            >
                                <SaveOutlinedIcon />
                            </Button>
                        </div>
                    )
                }
                {
                    this.state.notifOpen ? (
                        <CustomizedSnackbars
                            open={true}
                            timer={3000}
                            message={"Informations personnelles sauvegardés avec succès."}
                            severity={"success"}
                            functionCallback={() => this.resetNotifOpen()}
                        />
                    ) : ""
                }
            </div>
        );
    }
}

export default PersonalDataForm;