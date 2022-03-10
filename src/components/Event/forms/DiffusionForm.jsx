import React, { Fragment } from "react";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
    DateTimePicker
} from '@mui/lab';

class DiffusionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldsAreValid: false, 
            diffusionIllustration: props.event.diffusionIllustration,
            diffusionPublicDescription: props.event.diffusionPublicDescription,
            diffusionInformations: props.event.diffusionInformations,
            diffusionActiveMembers: props.event.diffusionActiveMembers, 
            diffusionPublic: props.event.diffusionPublic,
            diffusionAdministration: props.event.diffusionAdministration,
            diffusionEndInscriptionDate: props.event.diffusionEndInscriptionDate
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

    changeCheck(field, input) {
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
        let diffusionPublicDescriptionValid = this.state.diffusionPublicDescription !== "";
        let diffusionModeValid = this.state.diffusionAdministration || this.state.diffusionPublic || this.state.diffusionActiveMembers; 

        let currentFieldsAreValid = this.state.fieldsAreValid;
        let checkValidity =
            diffusionPublicDescriptionValid &&
            diffusionModeValid;

        if ((currentFieldsAreValid && !checkValidity) || (!currentFieldsAreValid && checkValidity)) {
            this.setState({
                fieldsAreValid: checkValidity
            }, () => {
                if ((currentFieldsAreValid === false && this.state.fieldsAreValid === true) ||
                    (currentFieldsAreValid === true && this.state.fieldsAreValid === false)) {
                    this.props.functionCheckCompleted(3, this.state.fieldsAreValid);
                }
            });
        }
    }

    saveEventInfo(plusOrMinus) {
        let event = {
            diffusionIllustration : this.state.diffusionIllustration, 
            diffusionPublicDescription : this.state.diffusionPublicDescription, 
            diffusionInformations : this.state.diffusionInformations, 
            diffusionActiveMembers : this.state.diffusionActiveMembers, 
            diffusionPublic : this.state.diffusionPublic, 
            diffusionAdministration : this.state.diffusionAdministration, 
            diffusionEndInscriptionDate : this.state.diffusionEndInscriptionDate
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
                    <h1>Informations de Diffusion : </h1>
                </div>

                <Grid container spacing={3} style={{ textAlign: "center" }}>
                    <Grid item xs={3}>
                        <h2 style={{ margin: "0" }}>Ajouter une illustration :</h2>
                    </Grid>
                    <Grid item xs={3}>
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

                    <Grid item xs={4}>
                        <h2 style={{ margin: "0", textAlign: "left" }}>
                            Mode de diffusion :
                        </h2>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid item xs={12} style={{ textAlign: "left" }}>
                            <FormControlLabel
                                style={{ marginTop: "5px" }}
                                control={
                                    <Checkbox
                                        checked={this.state.diffusionActiveMembers}
                                        value={this.state.diffusionActiveMembers}
                                        onChange={() =>
                                            this.changeCheck(
                                                "diffusionActiveMembers",
                                                !this.state.diffusionActiveMembers
                                            )
                                        }
                                        name="Calendrier_des_membres_actifs"
                                        color="primary"
                                    />
                                }
                                label="Calendrier des Membres Actifs"
                            />
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: "left" }}>
                            <FormControlLabel
                                style={{ marginTop: "5px" }}
                                control={
                                    <Checkbox
                                        checked={this.state.diffusionPublic}
                                        value={this.state.diffusionPublic}
                                        onChange={() =>
                                            this.changeCheck(
                                                "diffusionPublic",
                                                !this.state.diffusionPublic
                                            )
                                        }
                                        name="Calendrier_public"
                                        color="primary"
                                    />
                                }
                                label="Calendrier Public"
                            />
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: "left" }}>
                            <FormControlLabel
                                style={{ marginTop: "5px" }}
                                control={
                                    <Checkbox
                                        checked={this.state.diffusionAdministration}
                                        value={this.state.diffusionAdministration}
                                        onChange={() =>
                                            this.changeCheck(
                                                "diffusionAdministration",
                                                !this.state.diffusionAdministration
                                            )
                                        }
                                        name="Calendrier_administration"
                                        color="primary"
                                    />
                                }
                                label="Calendrier Administration"
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                    ><LocalizationProvider dateAdapter={AdapterDateFns}>
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
