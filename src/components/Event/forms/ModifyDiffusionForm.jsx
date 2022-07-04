import React, { Fragment } from "react";
import { Chip, Grid } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
    DateTimePicker
} from '@mui/lab';
import CustomizedSnackbars from "../../General/Popups/CustomizedSnackbar";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { modifyEventDiffusionData } from "../../../GraphQL/mutations/EventMutations";
import frLocale from "date-fns/locale/fr";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

class ModifyDiffusionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifOpen: false,
            illustrationPath: props.event.illustrationPath,
            diffusionPublicDescription: props.event.publicDescription,
            diffusionInformations: props.event.activeMembersInformations,
            diffusionActiveMembers: props.event.diffusionActiveMembers,
            diffusionPublic: props.event.diffusionPublic,
            diffusionAdministration: true,
            diffusionEndInscriptionDate: props.event.endInscriptionDate
        };
    }

    componentDidMount() {
    }

    updateField(field, input, errorState) {
        this.setState({
            [field]: input,
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

    saveEventInfo() {
        let event = {
            illustrationPath: this.state.illustrationPath,
            diffusionPublicDescription: this.state.diffusionPublicDescription,
            diffusionInformations: this.state.diffusionInformations,
            diffusionActiveMembers: this.state.diffusionActiveMembers,
            diffusionPublic: this.state.diffusionPublic,
            diffusionAdministration: this.state.diffusionAdministration,
            diffusionEndInscriptionDate: this.state.diffusionEndInscriptionDate
        };
        modifyEventDiffusionData(this.props.event.id, event.illustrationPath, event.diffusionPublicDescription, event.diffusionInformations,
            event.diffusionActiveMembers, event.diffusionAdministration, event.diffusionPublic, event.diffusionEndInscriptionDate).then((res) => {
                if (res.modifyEventDiffusionData.statusCode == 200) {
                    this.props.functionCallback(event);
                    this.setState({ notifOpen: true });
                }
            })
    }

    resetNotifOpen = () => {
        this.setState({ notifOpen: false });
    }

    render() {
        return (
            <div>
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                    <h1 style={{ fontSize: "20px" }}>Informations de diffusion</h1>
                </div>

                <Grid container spacing={3} style={{ textAlign: "center" }}>
                    <Grid item xs={12} md={3}>
                        <h2 style={{ margin: "0", fontSize: "16px" }}>Ajouter une illustration :</h2>
                    </Grid>
                    <Grid item xs={12} md={3}>
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
                        <p style={{ margin: "0", textAlign: "left", fontSize: "16px", marginLeft: "5px", marginBottom: "-5px" }}>
                            Description publique de l'évènement :
                        </p>
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
                        <p style={{ margin: "0", textAlign: "left", fontSize: "16px", marginLeft: "5px", marginBottom: "10px" }}>
                            Informations diverses à l'attention des membres actifs :
                        </p>
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

                    <Grid item xs={12} md={2}>
                        <h2 style={{ margin: "0", textAlign: "left", fontSize: "16px", paddingTop: "12px" }}>
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
                    <Grid item xs={12} md={4}>
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
                        marginTop: "20px",
                        paddingBottom: "20px"
                    }}
                >
                    <Button
                        disabled={false}
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
                            message={"Informations de diffusion sauvegardées avec succès."}
                            severity={"success"}
                            functionCallback={() => this.resetNotifOpen()}
                        />
                    ) : ""
                }
            </div>
        );
    }
}

export default ModifyDiffusionForm;
