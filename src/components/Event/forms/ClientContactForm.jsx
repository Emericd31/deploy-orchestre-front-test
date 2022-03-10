import React from "react";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import BriefedTextField from "../../General/TextFields/BriefedTextField";

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
        let mobileNumberValid = this.state.mobileNumber !== "";
        let emailValid = this.state.email !== "";
        let functionValid = this.state.function !== "";
        let addressValid = this.state.address !== "";
        let postalCodeValid = this.state.postalCode !== "";
        let cityValid = this.state.city !== "";

        let currentFieldsAreValid = this.state.fieldsAreValid;
        let checkValidity = lastnameValid &&
            firstnameValid &&
            mobileNumberValid &&
            emailValid &&
            functionValid &&
            addressValid &&
            postalCodeValid &&
            cityValid;

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
                        <BriefedTextField
                            id={"phoneNumber-field"}
                            label="Téléphone Fixe"
                            type="text"
                            name="text"
                            value={this.state.phoneNumber}
                            saveField={(input, errorState) =>
                                this.updateField("phoneNumber", input, errorState)
                            }
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <BriefedTextField
                            id={"mobileNumber-field"}
                            label="Téléphone Mobile"
                            type="text"
                            name="text"
                            required={true}
                            value={this.state.mobileNumber}
                            saveField={(input, errorState) =>
                                this.updateField("mobileNumber", input, errorState)
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <BriefedTextField
                            id={"email-field"}
                            label="Adresse e-mail"
                            type="text"
                            name="text"
                            required={true}
                            value={this.state.email}
                            saveField={(input, errorState) =>
                                this.updateField("email", input, errorState)
                            }
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <BriefedTextField
                            id={"function-field"}
                            label="Fonction"
                            type="text"
                            name="text"
                            required={true}
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
                            required={true}
                            value={this.state.address}
                            saveField={(input, errorState) =>
                                this.updateField("address", input, errorState)
                            }
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <BriefedTextField
                            id={"postalCode-field"}
                            label="Code Postal"
                            type="text"
                            name="text"
                            required={true}
                            value={this.state.postalCode}
                            saveField={(input, errorState) =>
                                this.updateField("postalCode", input, errorState)
                            }
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
                            required={true}
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
