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
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CustomizedSnackbars from "../../General/Popups/CustomizedSnackbar";
import { modifyEventGeneralData } from "../../../GraphQL/mutations/EventMutations";
import frLocale from "date-fns/locale/fr";

const emailRegexSafe = require("email-regex-safe");

class ModifyGeneralDataForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifOpen: false,
            notifDateOpen: false,
            fieldsAreValid: false,
            startDate: props.event.startDate,
            endDate: props.event.endDate,
            intitule: props.event.entitled,
            address: props.event.address,
            addressComplement: props.event.addressComplement,
            postalCode: props.event.postalCode,
            city: props.event.city,
            phoneNumber: props.event.phoneNumber,
            mobileNumber: props.event.mobileNumber,
            email: props.event.email,
            musicalFormation: props.event.musicalFormation.id,
            eventType: props.eventType,
            valueEventType: props.eventType === "Autres" ? props.event.eventType : "",
            musicalFormations: props.musicalFormations,
            eventTypes: props.eventTypes,
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

    updateSelect(field, input) {
        this.setState({
            [field]: input,
        }, () => {
            this.checkRequiredFields();
        });
    }

    handleDateChange = (itemName, date) => {
        this.setState({ [itemName]: date });
        if (itemName == "startDate")
            this.setState({ notifDateOpen: true });
    };

    checkRequiredFields() {
        let intituleValid = this.state.intitule !== "";
        let addressValid = this.state.address !== "";
        let postalCodeValid = this.state.postalCode !== "" && this.postalCodeSyntaxCheck(this.state.postalCode);
        let cityValid = this.state.city !== "";
        let eventTypeValid = this.state.eventType !== "Autres" || (this.state.eventType === "Autres" && this.state.valueEventType !== "");
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
        var event = this.returnEvent();
        modifyEventGeneralData(this.props.event.id, event.musicalFormation, event.startDate, event.endDate, event.intitule, event.address, event.addressComplement,
            event.postalCode, event.city, event.phoneNumber, event.mobileNumber, event.email, event.eventType).then((res) => {
                if (res.modifyEventGeneralData.statusCode == 200) {
                    this.props.functionCallback(event);
                    this.setState({ notifOpen: true });
                }
            })
    }

    resetNotifOpen = () => {
        this.setState({ notifOpen: false });
    }

    resetNotifOpen = () => {
        this.setState({ notifDateOpen: false });
    }

    returnEvent = () => {
        return {
            intitule: this.state.intitule,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            address: this.state.address,
            addressComplement: this.state.addressComplement,
            postalCode: this.state.postalCode,
            city: this.state.city,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            mobileNumber: this.state.mobileNumber,
            musicalFormation: this.state.musicalFormation,
            eventType: this.state.eventType === "Autres" ? this.state.valueEventType : this.state.eventType
        };
    }

    render() {
        return (
            <div>
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                    <h1 style={{ fontSize: "20px" }}>Informations générales</h1>
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
                        lg={6}
                        xs={12}
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
                        lg={this.state.eventType === "Autres" ? 3 : 6}
                        xs={12}
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
                                    <MenuItem key={type.value} value={type.value}>
                                        {type.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {
                        this.state.eventType === "Autres" ? (
                            <Grid item
                                lg={3}
                                xs={12}>
                                <BriefedTextField
                                    id={"address-field"}
                                    label="Type d'évènement"
                                    type="text"
                                    name="text"
                                    required={true}
                                    value={this.state.valueEventType}
                                    saveField={(input, errorState) =>
                                        this.updateField("valueEventType", input, errorState)
                                    }
                                />
                            </Grid>
                        ) : ""
                    }

                    <Grid item
                        lg={6}
                        xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
                            <DateTimePicker
                                renderInput={(props) => <TextField size="small" {...props} style={{ width: "100%" }} />}
                                label="Date et heure de début"
                                value={this.state.startDate}
                                onChange={() => ""}
                                onAccept={(event) => this.handleDateChange("startDate", event)}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item
                        lg={6}
                        xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
                            <DateTimePicker
                                renderInput={(props) => <TextField size="small" {...props} style={{ width: "100%" }} />}
                                label="Date et heure de fin"
                                value={this.state.endDate}
                                onChange={(event) => this.handleDateChange("endDate", event)}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item
                        lg={6}
                        xs={12}>
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
                        lg={6}
                        xs={12}
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
                        lg={3}
                        xs={12}
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
                        lg={9}
                        xs={12}
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
                        lg={3}
                        xs={12}
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
                        lg={3}
                        xs={12}
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
                        lg={6}
                        xs={12}
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
                        <SaveOutlinedIcon />
                    </Button>
                </div>
                {
                    this.state.notifOpen ? (
                        <CustomizedSnackbars
                            open={true}
                            timer={3000}
                            message={"Informations générales sauvegardées avec succès."}
                            severity={"success"}
                            functionCallback={() => this.resetNotifOpen()}
                        />
                    ) : ""
                }
                {
                    this.state.notifDateOpen ? (
                        <CustomizedSnackbars
                            open={true}
                            timer={3000}
                            message={"Pensez à modifier la date de rendez-vous."}
                            severity={"success"}
                            functionCallback={() => this.resetNotifOpen()}
                        />
                    ) : ""
                }
            </div>
        );
    }
}

export default ModifyGeneralDataForm;