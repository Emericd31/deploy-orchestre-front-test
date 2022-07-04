import React from "react";
import { Autocomplete, Checkbox, Grid } from "@mui/material";
import { Button } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { TextField } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
    DateTimePicker
} from '@mui/lab';
import BriefedTextField from "../../General/TextFields/BriefedTextField";
import LiveBriefedTextField from "../../General/TextFields/LiveBriefedTextField";
import CustomizedSnackbars from "../../General/Popups/CustomizedSnackbar";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { modifyEventLogisticProgram } from "../../../GraphQL/mutations/EventMutations";
import frLocale from "date-fns/locale/fr";
import { getTransportTypes } from "../../../GraphQL/queries/EventQueries";
import { getDresses } from "../../../GraphQL/queries/DressQueries";

class ModifyLogisticProgramForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifOpen: false,
            fieldsAreValid: false,
            address: props.event.appointmentAddress ?? "",
            postalCode: props.event.appointmentPostalCode ?? "",
            city: props.event.appointmentCity ?? "",
            transportMode: props.event.transportMode ?? "",
            rendezvousDate: props.event.appointmentTime ?? "",
            transportModes: [],
            tenueVestimentaire: props.event.programTenueVestimentaire ?? "",
            tenuesVestimentaires: [],
            musicalProgram: props.event.programMusicalProgram ?? "",
            musicalPrograms: [
                { id: 0, value: "Programme 1" },
                { id: 1, value: "Programme 2" },
                { id: 2, value: "Programme 3" },
            ],
            isLoading: true
        };
    }

    componentDidMount() {
        getTransportTypes().then((res) => {
            getDresses().then((res2) => {
                this.setState({ transportModes: res.transportTypes, tenuesVestimentaires: res2.dresses, isLoading: false });
            })
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
            });
        }
    }

    postalCodeSyntaxCheck = (postalCode) => {
        const regex = /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/;
        return postalCode.match(regex);
    }

    saveEventInfo() {
        let event = {
            programAddress: this.state.address,
            programPostalCode: this.state.postalCode,
            programCity: this.state.city,
            programTransportMode: this.state.transportMode,
            programDresses: this.state.tenueVestimentaire,
            programTenueVestimentaire: this.state.tenueVestimentaire,
            programMusicalProgram: this.state.musicalProgram,
            programRendezvousDate: this.state.rendezvousDate
        };
        modifyEventLogisticProgram(this.props.event.id, event.programAddress, event.programCity, event.programPostalCode, event.programRendezvousDate, event.programTransportMode, event.programDresses).then((res) => {
            if (res.modifyEventLogisticProgram.statusCode == 200) {
                this.props.functionCallback(event);
                this.setState({ notifOpen: true });
            }
        });
    }

    resetNotifOpen = () => {
        this.setState({ notifOpen: false });
    }

    handleDressesChange = (values) => {
        var result = "";
        values.map((value, i, {length}) => {
            if (length - 1 === i)
                result += value.name;
            else 
                result += value.name + ", ";
        });
        this.setState({ tenueVestimentaire: result });
    }

    render() {
        return (
            !this.state.isLoading ? (
                <div>
                    <div style={{ textAlign: "center", marginBottom: "30px" }}>
                        <h1 style={{ fontSize: "20px" }}>Programme & Logistique</h1>
                    </div>

                    <Grid container spacing={3} style={{ textAlign: "center" }}>
                        <Grid item xs={12} md={6}>
                            {/* <FormControl fullWidth size="small">
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
                            </FormControl> */}
                            <Autocomplete
                                multiple
                                id="checkboxes-tags-demo"
                                options={this.state.tenuesVestimentaires}
                                size="small"
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.name}
                                onChange={(event, value) => this.handleDressesChange(value)}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}
                                        key={option.id}>
                                        <Checkbox
                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option.name}
                                    </li>
                                )}
                                renderInput={(params) => (
                                    <TextField {...params} label="Tenues vestimentaires" placeholder="" />
                                )}
                            />
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

                        <Grid item xs={12} md={3}>
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
                        <Grid item xs={12} md={9}>
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

                    <div style={{ textAlign: "center", marginTop: "30px" }}>
                        <h1 style={{ fontSize: "20px" }}>Programme musical</h1>
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
                                message={"Programme logistique sauvegardé avec succès."}
                                severity={"success"}
                                functionCallback={() => this.resetNotifOpen()}
                            />
                        ) : ""
                    }
                </div>) : ""
        );
    }
}

export default ModifyLogisticProgramForm;
