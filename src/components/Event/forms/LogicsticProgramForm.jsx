import React from "react";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { TextField } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
    DateTimePicker
} from '@mui/lab';
import BriefedTextField from "../../General/TextFields/BriefedTextField";
import LiveBriefedTextField from "../../General/TextFields/LiveBriefedTextField";
import frLocale from "date-fns/locale/fr";
import { getTransportTypes } from "../../../GraphQL/queries/EventQueries";

class LogisticProgramForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldsAreValid: false,
            address: props.event.programAddress,
            postalCode: props.event.programPostalCode,
            city: props.event.programCity,
            transportMode: props.event.programTransportMode,
            transportModes: [],
            tenueVestimentaire: props.event.programTenueVestimentaire,
            tenuesVestimentaires: [
                { id: 0, value: "Tenue 1" },
                { id: 1, value: "Tenue 2" },
                { id: 2, value: "Tenue 3" },
            ],
            musicalProgram: props.event.programMusicalProgram,
            musicalPrograms: [
                { id: 0, value: "Programme 1" },
                { id: 1, value: "Programme 2" },
                { id: 2, value: "Programme 3" },
            ],
            rendezvousDate: props.event.programRendezvousDate,
            isLoading: true
        };
    }

    componentDidMount() {
        getTransportTypes().then((res) => {
            this.setState({ transportModes: res.transportTypes, isLoading: false });
        })
        this.checkRequiredFields();
    }

    updateSelect(field, input) {
        this.setState({
            [field]: input,
        }, () => {
            this.checkRequiredFields();
        });
    }

    updateField(field, input, errorState) {
        this.setState({
            [field]: input,
        }, () => {
            this.checkRequiredFields();
        });
    }

    handleDateChange = (date) => {
        this.setState({ rendezvousDate: date });
    };

    checkRequiredFields() {
        let postalCodeValid = this.state.postalCode === "" || this.postalCodeSyntaxCheck(this.state.postalCode);

        let currentFieldsAreValid = this.state.fieldsAreValid;
        let checkValidity = postalCodeValid;

        if ((currentFieldsAreValid && !checkValidity) || (!currentFieldsAreValid && checkValidity)) {
            this.setState({
                fieldsAreValid: checkValidity
            }, () => {
                if ((currentFieldsAreValid === false && this.state.fieldsAreValid === true) ||
                    (currentFieldsAreValid === true && this.state.fieldsAreValid === false)) {
                    this.props.functionCheckCompleted(2, this.state.fieldsAreValid);
                }
            });
        }
    }

    postalCodeSyntaxCheck = (postalCode) => {
        const regex = /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/;
        return postalCode.match(regex);
    }

    saveEventInfo(plusOrMinus) {
        let event = {
            programAddress: this.state.address,
            programPostalCode: this.state.postalCode,
            programCity: this.state.city,
            programTransportMode: this.state.transportMode,
            programTenueVestimentaire: this.state.tenueVestimentaire,
            programMusicalProgram: this.state.musicalProgram,
            programRendezvousDate: this.state.rendezvousDate
        };
        this.props.functionCallback(event, plusOrMinus);
    }

    render() {
        return (
            !this.state.isLoading ? (
                <div>
                    <h1 style={{ textAlign: "center" }}>Programme & Logistique</h1>
                    <Grid container spacing={3} style={{ textAlign: "center" }}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="clothes_label">
                                    Tenue vestimentaire
                                </InputLabel>
                                <Select
                                    id="type"
                                    labelId="clothes_label"
                                    label="Tenue vestimentaire *"
                                    value={this.state.tenueVestimentaire}
                                    onChange={(event) =>
                                        this.updateSelect("tenueVestimentaire", event.target.value)
                                    }
                                >
                                    {this.state.tenuesVestimentaires.map((tenueVestimentaire) => (
                                        <MenuItem
                                            key={tenueVestimentaire.id}
                                            value={tenueVestimentaire.id}
                                        >
                                            {tenueVestimentaire.value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="transport_mode_label">
                                    Mode de transport
                                </InputLabel>
                                <Select
                                    id="type"
                                    labelId="transport_mode_label"
                                    label="Mode de transport *"
                                    value={this.state.transportMode}
                                    onChange={(event) =>
                                        this.updateSelect("transportMode", event.target.value)
                                    }
                                >
                                    {this.state.transportModes.map((transportMode) => (
                                        <MenuItem key={transportMode.id} value={transportMode.type}>
                                            {transportMode.type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
                                <DateTimePicker
                                    renderInput={(props) => <TextField size="small" {...props} style={{ width: "100%" }} />}
                                    label="Date et heure de rendez-vous"
                                    value={this.state.rendezvousDate}
                                    onChange={this.handleDateChange}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <BriefedTextField
                                id={"address-field"}
                                label="Adresse de rendez-vous"
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
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="programme_musical_label">
                                    Programme musical
                                </InputLabel>
                                <Select
                                    id="type"
                                    labelId="programme_musical_label"
                                    label="Programme musical *"
                                    value={this.state.musicalProgram}
                                    onChange={(event) =>
                                        this.updateSelect("musicalProgram", event.target.value)
                                    }
                                >
                                    {this.state.musicalPrograms.map((musicalProgram) => (
                                        <MenuItem key={musicalProgram.id} value={musicalProgram.id}>
                                            {musicalProgram.value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <h1 style={{ textAlign: "center" }}>Programme musical</h1>

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
                </div>) : ""
        );
    }
}

export default LogisticProgramForm;
