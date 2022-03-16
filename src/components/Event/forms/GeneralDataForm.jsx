import React from "react";
import { Grid } from "@mui/material";
import BriefedTextField from "../../General/TextFields/BriefedTextField";
import LiveBriefedTextField from "../../General/TextFields/LiveBriefedTextField";
import { TextField } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
    DateTimePicker
} from '@mui/lab';
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Button } from "@mui/material";
import { getMusicalFormations } from "../../../GraphQL/queries/EventQueries";

const emailRegexSafe = require("email-regex-safe");

class GeneralData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldsAreValid: false,
            startDate: props.event.eventStartDate,
            endDate: props.event.eventEndDate,
            intitule: props.event.intitule,
            address: props.event.eventAddress,
            addressComplement: props.event.eventAddressComplement,
            postalCode: props.event.eventPostalCode,
            city: props.event.eventCity,
            phoneNumber: props.event.eventPhoneNumber,
            mobileNumber: props.event.eventMobileNumber,
            email: props.event.eventEmail,
            tempMusicalFormation: props.event.musicalFormation,
            musicalFormation: "",
            eventType: props.event.eventType,
            musicalFormations: [],
            eventTypes: [{ id: 0, value: "Mariage" }, { id: 1, value: "Anniversaire" }],
        };
    }

    componentDidMount() {
        getMusicalFormations().then((res) => {
            this.setState({ musicalFormations: res.musicalFormations, musicalFormation: this.state.tempMusicalFormation }, () => {
                this.checkRequiredFields();
            });
        });
    }

    updateField(field, input, errorState) {
        this.setState({
            [field]: input,
        }, () => {
            this.checkRequiredFields();
        });
    }

    updateSelect(field, input) {
        this.setState({
            [field]: input,
        }, () => {
            this.checkRequiredFields();
        });
    }

    handleDateChange = (itemName, date) => {
        this.setState({ [itemName]: date });
    };

    checkRequiredFields() {
        let intituleValid = this.state.intitule !== "";
        let addressValid = this.state.address !== "";
        let postalCodeValid = this.state.postalCode !== "" && this.postalCodeSyntaxCheck(this.state.postalCode);
        let cityValid = this.state.city !== "";
        let eventTypeValid = this.state.eventType !== "";
        let musicalFormationValid = this.state.musicalFormation !== "";
        let phoneNumberValid = this.state.phoneNumber === "" || this.phoneSyntaxCheck(this.state.phoneNumber);
        let mobileNumberValid = this.state.mobileNumber === "" || this.phoneSyntaxCheck(this.state.mobileNumber);
        let emailValid = this.state.email === "" || (this.state.email !== "" && this.emailSyntaxCheck(this.state.email));

        let currentFieldsAreValid = this.state.fieldsAreValid;
        let checkValidity =
            intituleValid &&
            addressValid &&
            postalCodeValid &&
            cityValid &&
            phoneNumberValid &&
            mobileNumberValid &&
            emailValid &&
            eventTypeValid &&
            musicalFormationValid;

        if ((currentFieldsAreValid && !checkValidity) || (!currentFieldsAreValid && checkValidity)) {
            this.setState({
                fieldsAreValid: checkValidity
            }, () => {
                if ((currentFieldsAreValid === false && this.state.fieldsAreValid === true) ||
                    (currentFieldsAreValid === true && this.state.fieldsAreValid === false)) {
                    this.props.functionCheckCompleted(0, this.state.fieldsAreValid);
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

    saveEventInfo() {
        let event = {
            eventStartDate: this.state.startDate,
            eventEndDate: this.state.endDate,
            intitule: this.state.intitule,
            eventAddress: this.state.address,
            eventAddressComplement: this.state.addressComplement,
            eventPostalCode: this.state.postalCode,
            eventCity: this.state.city,
            eventPhoneNumber: this.state.phoneNumber,
            eventMobileNumber: this.state.mobileNumber,
            eventEmail: this.state.email,
            musicalFormation: this.state.musicalFormation,
            eventType: this.state.eventType
        };
        this.props.functionCallback(event);
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
                    <h1>Informations Générales : </h1>
                </div>
                <p>* champs obligatoires</p>

                <Grid container spacing={3} style={{ textAlign: "center" }}>
                    <Grid item xs={12}>
                        <BriefedTextField
                            id={"intitule-field"}
                            label="Intitulé"
                            type="text"
                            name="text"
                            required={true}
                            value={this.state.intitule}
                            saveField={(input, errorState) =>
                                this.updateField("intitule", input, errorState)
                            }
                        />
                    </Grid>

                    <Grid
                        item
                        xs={6}
                    >
                        <FormControl fullWidth size="small">
                            <InputLabel id="musical_formation_label">
                                Formation musicale concernée *
                            </InputLabel>
                            <Select
                                id="type"
                                labelId="musical_formation_label"
                                label="Formation musicale concernée *"
                                value={this.state.musicalFormation}
                                onChange={(event) =>
                                    this.updateSelect("musicalFormation", event.target.value)
                                }
                            >
                                {this.state.musicalFormations.map((musicalFormation) => (
                                    <MenuItem key={musicalFormation.id} value={musicalFormation.id}>
                                        {musicalFormation.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <FormControl fullWidth size="small">
                            <InputLabel id="event_type_label">
                                Type d'évènement *
                            </InputLabel>
                            <Select
                                id="type"
                                labelId="event_type_label"
                                label="Type d'évènement *"
                                value={this.state.eventType}
                                onChange={(event) =>
                                    this.updateSelect("eventType", event.target.value)
                                }
                            >
                                {this.state.eventTypes.map((type) => (
                                    <MenuItem key={type.id} value={type.id}>
                                        {type.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <TextField size="small" {...props} style={{ width: "100%" }} />}
                                label="Date et heure de début"
                                value={this.state.startDate}
                                onChange={(event) => this.handleDateChange("startDate", event)}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <TextField size="small" {...props} style={{ width: "100%" }} />}
                                label="Date et heure de fin"
                                value={this.state.endDate}
                                onChange={(event) => this.handleDateChange("endDate", event)}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={6}>
                        <BriefedTextField
                            id={"address-field"}
                            label="Adresse de l'évènement"
                            type="text"
                            name="text"
                            required={true}
                            value={this.state.address}
                            saveField={(input, errorState) =>
                                this.updateField("address", input, errorState)
                            }
                        />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <BriefedTextField
                            id={"addressComplement-field"}
                            label="Complément"
                            type="text"
                            name="text"
                            value={this.state.addressComplement}
                            saveField={(input, errorState) =>
                                this.updateField("addressComplement", input, errorState)
                            }
                        />
                    </Grid>

                    <Grid
                        item
                        xs={3}
                    >
                        <LiveBriefedTextField
                            id={"postalCode-field"}
                            label="Code Postal"
                            type="text"
                            required={true}
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
                    >
                        <BriefedTextField
                            id={"city-field"}
                            label="Ville"
                            type="text"
                            name="text"
                            required={true}
                            value={this.state.city}
                            saveField={(input, errorState) =>
                                this.updateField("city", input, errorState)
                            }
                        />
                    </Grid>

                    <Grid
                        item
                        xs={3}
                    >
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
                    <Grid
                        item
                        xs={3}
                    >
                        <LiveBriefedTextField
                            id={"mobileNumber-field"}
                            label="Téléphone Mobile"
                            type="text"
                            required={false}
                            value={this.state.mobileNumber}
                            helperText="La syntaxe du numéro de téléphone n'est pas valide."
                            saveField={(input, errorState) =>
                                this.updateField("mobileNumber", input, errorState)
                            }
                            syntaxChecker={this.phoneSyntaxCheck}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <LiveBriefedTextField
                            id={"email-field"}
                            label="Adresse mail"
                            type="email"
                            required={false}
                            value={this.state.email}
                            helperText="La syntaxe de l'e-mail n'est pas valide."
                            saveField={(input, errorState) =>
                                this.updateField("email", input, errorState)
                            }
                            syntaxChecker={this.emailSyntaxCheck}
                        />
                    </Grid>
                </Grid>
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
                        onClick={() => this.saveEventInfo()}
                        variant="contained"
                        sx={{
                            backgroundColor: "#1876D2"
                        }}
                    >
                        Suivant
                    </Button>
                </div>
            </div>
        );
    }
}

export default GeneralData;