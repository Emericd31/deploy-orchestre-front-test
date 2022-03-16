import React from "react";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import BriefedTextField from "../../General/TextFields/BriefedTextField";
import LiveBriefedTextField from "../../General/TextFields/LiveBriefedTextField";

const emailRegexSafe = require("email-regex-safe");

class ClientContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldsAreValid: false,
            openPopupAddOrganisationMember: false,
            lastname: props.event.clientLastname,
            firstname: props.event.clientFirstname,
            phoneNumber: props.event.clientPhoneNumber,
            mobileNumber: props.event.clientMobileNumber,
            email: props.event.clientEmail,
            function: props.event.clientFunction,
            address: props.event.clientAddress,
            postalCode: props.event.clientPostalCode,
            city: props.event.clientCity,
        };
    }

    componentDidMount() {
        this.checkRequiredFields();
    }

    updateField(field, input, errorState) {
        this.setState({
            [field]: input,
        }, () => {
            this.checkRequiredFields();
        });
    }

    checkRequiredFields() {
        let lastnameValid = this.state.lastname !== "";
        let firstnameValid = this.state.firstname !== "";
        let postalCodeValid = this.state.postalCode === "" || this.postalCodeSyntaxCheck(this.state.postalCode);
        let phoneNumberValid = this.state.phoneNumber === "" || this.phoneSyntaxCheck(this.state.phoneNumber);
        let mobileNumberValid = this.state.mobileNumber !== "" && this.phoneSyntaxCheck(this.state.mobileNumber);
        let emailValid = this.state.email !== "" && this.emailSyntaxCheck(this.state.email);

        let currentFieldsAreValid = this.state.fieldsAreValid;
        let checkValidity = lastnameValid &&
            firstnameValid &&
            phoneNumberValid &&
            mobileNumberValid &&
            emailValid &&
            postalCodeValid;

        if ((currentFieldsAreValid && !checkValidity) || (!currentFieldsAreValid && checkValidity)) {
            this.setState({
                fieldsAreValid: checkValidity
            }, () => {
                if ((currentFieldsAreValid === false && this.state.fieldsAreValid === true) ||
                    (currentFieldsAreValid === true && this.state.fieldsAreValid === false)) {
                    this.props.functionCheckCompleted(1, this.state.fieldsAreValid);
                }
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

    saveEventInfo(plusOrMinus) {
        let event = {
            clientLastname: this.state.lastname,
            clientFirstname: this.state.firstname,
            clientPhoneNumber: this.state.phoneNumber,
            clientMobileNumber: this.state.mobileNumber,
            clientEmail: this.state.email,
            clientFunction: this.state.function,
            clientAddress: this.state.address,
            clientPostalCode: this.state.postalCode,
            clientCity: this.state.city
        };
        this.props.functionCallback(event, plusOrMinus);
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
                        marginTop: "1%",
                        paddingBottom: "1%",
                    }}
                >
                    <h1>Contacts client : </h1>
                </div>

                <Grid container spacing={3} style={{ textAlign: "center" }}>
                    <Grid item xs={6}>
                        <BriefedTextField
                            id={"lastname-field"}
                            label="Nom"
                            type="text"
                            name="text"
                            required={true}
                            value={this.state.lastname}
                            saveField={(input, errorState) =>
                                this.updateField("lastname", input, errorState)
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <BriefedTextField
                            id={"firstname-field"}
                            label="Prénom"
                            type="text"
                            name="text"
                            required={true}
                            value={this.state.firstname}
                            saveField={(input, errorState) =>
                                this.updateField("firstname", input, errorState)
                            }
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <LiveBriefedTextField
                            id={"phoneNumber-field"}
                            label="Téléphone Fixe"
                            type="text"
                            required={false}
                            value={this.state.phoneNumber}
                            helperText="La syntaxe du numéro de téléphone n'est pas valide."
                            saveField={(input, errorState) =>
                                this.updateField("phoneNumber", input, errorState)
                            }
                            syntaxChecker={this.phoneSyntaxCheck}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <LiveBriefedTextField
                            id={"mobileNumber-field"}
                            label="Téléphone Mobile"
                            type="text"
                            required={true}
                            value={this.state.mobileNumber}
                            helperText="La syntaxe du numéro de téléphone n'est pas valide."
                            saveField={(input, errorState) =>
                                this.updateField("mobileNumber", input, errorState)
                            }
                            syntaxChecker={this.phoneSyntaxCheck}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LiveBriefedTextField
                            id={"email-field"}
                            label="Adresse e-mail"
                            type="email"
                            required={true}
                            value={this.state.email}
                            helperText="La syntaxe de l'e-mail n'est pas valide."
                            saveField={(input, errorState) =>
                                this.updateField("email", input, errorState)
                            }
                            syntaxChecker={this.emailSyntaxCheck}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <BriefedTextField
                            id={"function-field"}
                            label="Fonction"
                            type="text"
                            name="text"
                            required={false}
                            value={this.state.function}
                            saveField={(input, errorState) =>
                                this.updateField("function", input, errorState)
                            }
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <BriefedTextField
                            id={"address-field"}
                            label="Adresse"
                            type="text"
                            name="text"
                            required={false}
                            value={this.state.address}
                            saveField={(input, errorState) =>
                                this.updateField("address", input, errorState)
                            }
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <LiveBriefedTextField
                            id={"postalCode-field"}
                            label="Code Postal"
                            type="text"
                            required={false}
                            value={this.state.postalCode}
                            helperText="La syntaxe du code postal n'est pas valide."
                            saveField={(input, errorState) =>
                                this.updateField("postalCode", input, errorState)
                            }
                            syntaxChecker={this.postalCodeSyntaxCheck}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={9}
                    ><BriefedTextField
                            id={"city-field"}
                            label="Ville"
                            type="text"
                            name="text"
                            required={false}
                            value={this.state.city}
                            saveField={(input, errorState) =>
                                this.updateField("city", input, errorState)
                            }
                        /></Grid>
                </Grid>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        marginRight: "1%",
                        marginTop: "1%",
                        paddingBottom: "1%",
                    }}
                >
                    <h1>Membre(s) de l'organisation : </h1>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        marginRight: "1%",
                    }}
                >
                    <Button
                        disabled={false}
                        variant="contained"
                        color="primary"
                        style={{
                            marginBottom: "30px",
                        }}
                        onClick={() =>
                            this.setState({ openPopupAddOrganisationMember: true })
                        }
                    >
                        Ajouter
                    </Button>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        paddingBottom: "20px"
                    }}
                >
                    <Button
                        disabled={false}
                        onClick={() => this.saveEventInfo(-1)}
                        variant="contained"
                        sx={{
                            backgroundColor: "#1D70B7"
                        }}
                    >
                        Retour
                    </Button>
                    <Button
                        disabled={!this.state.fieldsAreValid}
                        onClick={() => this.saveEventInfo(1)}
                        variant="contained"
                        sx={{
                            ml: 2,
                            backgroundColor: "#1D70B7"
                        }}
                    >
                        Suivant
                    </Button>
                </div>
            </div>
        );
    }
}

export default ClientContactForm;
