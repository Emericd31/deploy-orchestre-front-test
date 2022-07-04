import React, { Fragment } from "react";
import { Grid, Chip, Button, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import frLocale from "date-fns/locale/fr";
import {
    DateTimePicker
} from '@mui/lab';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

class DiffusionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            diffusionIllustration: props.event.diffusionIllustration,
            diffusionPublicDescription: props.event.diffusionPublicDescription,
            diffusionInformations: props.event.diffusionInformations,
            diffusionActiveMembers: props.event.diffusionActiveMembers,
            diffusionPublic: props.event.diffusionPublic,
            diffusionAdministration: true,
            diffusionEndInscriptionDate: props.event.diffusionEndInscriptionDate
        };
    }

    componentDidMount() {
        this.props.functionCheckCompleted(3, true);
    }

    updateField(field, input, errorState) {
        this.setState({
            [field]: input,
        }, () => {
            this.checkRequiredFields();
        });
    }

    changeCheck(field, input) {
        this.setState({
            [field]: input,
        });
    }

    handleDateChange = (itemName, date) => {
        this.setState({ [itemName]: date });
    };

    saveEventInfo(plusOrMinus) {
        let event = {
            diffusionIllustration: this.state.diffusionIllustration,
            diffusionPublicDescription: this.state.diffusionPublicDescription,
            diffusionInformations: this.state.diffusionInformations,
            diffusionActiveMembers: this.state.diffusionActiveMembers,
            diffusionPublic: this.state.diffusionPublic,
            diffusionAdministration: this.state.diffusionAdministration,
            diffusionEndInscriptionDate: this.state.diffusionEndInscriptionDate
        };
        this.props.functionCallback(event, plusOrMinus);
    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>Informations de Diffusion</h1>

                <Grid container spacing={3} style={{ textAlign: "center" }}>
                    <Grid item xs={12} md={6} lg={3}>
                        <h2 style={{ margin: "0" }}>Ajouter une illustration :</h2>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ backgroundColor: "#1D70B7" }}
                        >
                            Télécharger
                        </Button>
                    </Grid>

                    <Grid item xs={6}></Grid>

                    <Grid item xs={12}>
                        <TextField
                            style={{ width: "100%", marginTop: "20px" }}
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            variant="outlined"
                            placeholder="Description publique de l'évènement."
                            value={this.state.diffusionPublicDescription}
                            onChange={(event, errorState) =>
                                this.updateField(
                                    "diffusionPublicDescription",
                                    event.target.value,
                                    errorState
                                )
                            }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            style={{ width: "100%" }}
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            variant="outlined"
                            placeholder="Informations diverses à l'attention des membres actifs."
                            value={this.state.diffusionInformations}
                            onChange={(event, errorState) =>
                                this.updateField(
                                    "diffusionInformations",
                                    event.target.value,
                                    errorState
                                )
                            }
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <h2 style={{ margin: "0", textAlign: "left" }}>
                            Mode de diffusion :
                        </h2>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Grid item xs={12} style={{ textAlign: "left" }}>
                            {
                                this.state.diffusionActiveMembers ? (
                                    <Chip
                                        onClick={() => {
                                            this.setState({ diffusionActiveMembers: !this.state.diffusionActiveMembers })
                                        }}
                                        avatar={<DoneIcon style={{ color: "white" }} />} label="Calendrier des Membres Actifs" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#00AF06", color: "white" }} />
                                ) : (
                                    <Chip
                                        onClick={() => {
                                            this.setState({ diffusionActiveMembers: !this.state.diffusionActiveMembers })
                                        }}
                                        avatar={<CloseIcon style={{ color: "white" }} />} label="Calendrier des Membres Actifs" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#FF0000", color: "white" }} />
                                )
                            }
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: "left" }}>
                            {
                                this.state.diffusionPublic ? (
                                    <Chip
                                        onClick={() => {
                                            this.setState({ diffusionPublic: !this.state.diffusionPublic })
                                        }}
                                        avatar={<DoneIcon style={{ color: "white" }} />} label="Calendrier Public" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#00AF06", color: "white" }} />
                                ) : (
                                    <Chip
                                        onClick={() => {
                                            this.setState({ diffusionPublic: !this.state.diffusionPublic })
                                        }}
                                        avatar={<CloseIcon style={{ color: "white" }} />} label="Calendrier Public" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#FF0000", color: "white" }} />
                                )
                            }
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: "left" }}>
                            {
                                this.state.diffusionAdministration ? (
                                    <Chip
                                        avatar={<DoneIcon style={{ color: "white" }} />} label="Calendrier Administration" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#00AF06", color: "white" }} />
                                ) : (
                                    <Chip
                                        avatar={<CloseIcon style={{ color: "white" }} />} label="Calendrier Administration" style={{ marginRight: "10px", marginBottom: "10px", backgroundColor: "#FF0000", color: "white" }} />
                                )
                            }
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
                            <DateTimePicker
                                renderInput={(props) => <TextField size="small" {...props} style={{ width: "100%" }} />}
                                label="Date limite d'inscription"
                                value={this.state.diffusionEndInscriptionDate}
                                onChange={(event) => this.handleDateChange("diffusionEndInscriptionDate", event)}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        paddingBottom: "20px", 
                        marginTop: "20px"
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
                        disabled={false}
                        onClick={() => this.saveEventInfo(0)}
                        variant="contained"
                        sx={{
                            ml: 2,
                            backgroundColor: "#1D70B7"
                        }}
                    >
                        Terminer
                    </Button>
                </div>
            </div>
        );
    }
}

export default DiffusionForm;
