import React from "react";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import BriefedTextField from "../../General/TextFields/BriefedTextField";
import LiveBriefedTextField from "../../General/TextFields/LiveBriefedTextField";
import Popup from "../../General/Popups/Popup";
import OrganisationMemberForm from "./OrganisationMemberForm";
import { PersonsInCharge } from "../../User/Account/PersonsInCharge";
import { OrganisationMembers } from "../Gestion/OrganisationMembers";
import ConfirmPopup from "../../General/Popups/ConfirmPopup";

const emailRegexSafe = require("email-regex-safe");

class ClientContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldsAreValid: false,
            openPopupAddOrganisationMember: false,
            openPopupDeleteConfirm: false,
            openPopupModify: false,
            lastname: props.event.clientLastname,
            firstname: props.event.clientFirstname,
            phoneNumber: props.event.clientPhoneNumber,
            mobileNumber: props.event.clientMobileNumber,
            email: props.event.clientEmail,
            function: props.event.clientFunction,
            address: props.event.clientAddress,
            postalCode: props.event.clientPostalCode,
            city: props.event.clientCity,
            organisationMembers: [],
            openPopupAddOrganisationMember: false
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
            clientCity: this.state.city,
            organisationMembers: this.state.organisationMembers
        };
        this.props.functionCallback(event, plusOrMinus);
    }

    /**
     * Ajoute les données du membre de l'organisation à la liste
     * @param {*} organisationMember : membre de l'organisation
     */
    addOrganisationMember(organisationMember) {
        this.setState(prevState => ({
            organisationMembers: [...prevState.organisationMembers, organisationMember], openPopupAddOrganisationMember: false
        }));
    }

    /**
     * Modifie les données du membre de l'organisation de la liste
     * @param {*} organisationMember : membre de l'organisation
     */
    modifyOrganisationMember = (organisationMember) => {
        var currentOrganisationMembers = this.state.organisationMembers;
        currentOrganisationMembers.map((currentOrganisationMember) => {
            if (currentOrganisationMember.id == organisationMember.id) {
                currentOrganisationMember.firstname = organisationMember.firstname;
                currentOrganisationMember.lastname = organisationMember.lastname;
                currentOrganisationMember.relationship = organisationMember.relationship;
                currentOrganisationMember.mobileNumber = organisationMember.mobileNumber;
                currentOrganisationMember.email = organisationMember.email;
            }
        });
        this.setState({ organisationMembers: currentOrganisationMembers, openPopupModify: false });
    }

    /**
     * Supprime le membre de l'organisation de la liste
     * Réinitialise les identifiants de tous les membres de l'organisation
     * @param {*} idOrganisationMember : identifiant de le membre
     */
    deleteOrganisationMember = (idOrganisationMember) => {
        var organisationMembersTemp = this.state.organisationMembers;
        var filtered = organisationMembersTemp.filter(function (organisationMember) {
            return organisationMember.id !== idOrganisationMember
        });
        filtered.forEach((organisationMember, index) => {
            organisationMember.id = index;
        });
        this.setState({ organisationMembers: filtered, openPopupDeleteConfirm: false });
    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>Contacts client</h1>
                <Grid container spacing={3} style={{ textAlign: "center" }}>
                    <Grid item xs={12} md={6}>
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
                    <Grid item xs={12} md={6}>
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

                    <Grid item xs={12} md={6} lg={3}>
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
                    <Grid item xs={12} md={6} lg={3}>
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
                    <Grid item xs={12} md={6}>
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

                    <Grid item xs={12} md={6} lg={3}>
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
                    <Grid item xs={12} md={6} lg={9}>
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

                    <Grid item xs={12} md={6} lg={3}>
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
                    <Grid item xs={12} md={6} lg={9}>
                        <BriefedTextField
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
                <h1 style={{ textAlign: "center" }}>Membre(s) de l'organisation</h1>
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

                <OrganisationMembers
                    functionEdit={(organisationMember) =>
                        this.setState({ currentOrganisationMember: organisationMember, openPopupModify: true })
                    }
                    functionDelete={(organisationMember) =>
                        this.setState({ currentOrganisationMember: organisationMember, openPopupDeleteConfirm: true })
                    }
                    editable={true}
                    organisationMembers={this.state.organisationMembers}
                />

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

                <Popup
                    title="Ajouter un membre de l'organisation"
                    length="md"
                    openPopup={this.state.openPopupAddOrganisationMember}
                    parentCallback={() =>
                        this.setState({ openPopupAddOrganisationMember: false })
                    }
                >
                    <OrganisationMemberForm
                        parentCallback={(organisationMember) =>
                            this.addOrganisationMember(organisationMember)
                        }
                        isEditable={false}
                        isEventCreated={false}
                        nbOrganisationMember={this.state.organisationMembers.length}
                    />
                </Popup>

                <Popup
                    title="Modifier un membre de l'organisation"
                    length="md"
                    openPopup={this.state.openPopupModify}
                    parentCallback={() =>
                        this.setState({ openPopupModify: false })
                    }
                >
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <OrganisationMemberForm
                            parentCallback={(organisationMember) =>
                                this.modifyOrganisationMember(organisationMember)
                            }
                            organisationMember={this.state.currentOrganisationMember}
                            isEditable={true}
                            isEventCreated={false}
                        />
                    </div>
                </Popup>

                <ConfirmPopup
                    title={"Supprimer un membre d'organisation"}
                    text={"Voulez vous vraiment supprimer " + this.state.currentOrganisationMember?.firstname + " " + this.state.currentOrganisationMember?.lastname + " des membres d'organisation ? "}
                    openPopup={this.state.openPopupDeleteConfirm}
                    parentCallback={() => this.setState({ openPopupDeleteConfirm: false })}
                    confirmButtonId="confirm-delete-organisation-member"
                    confirmButtonFunction={() => this.deleteOrganisationMember(this.state.currentOrganisationMember?.id)}
                    cancelButtonFunction={() => this.setState({ openPopupDeleteConfirm: false })}
                    buttonDisabled={false}
                />
            </div>
        );
    }
}

export default ClientContactForm;
