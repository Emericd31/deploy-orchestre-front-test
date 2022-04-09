import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EditIcon from '@mui/icons-material/Edit';
import BriefedTextField from "../../General/TextFields/BriefedTextField";
import { addVehicle, modifyVehicle } from "../../../GraphQL/mutations/VehicleMutation";
import LiveBriefedTextField from "../../General/TextFields/LiveBriefedTextField";

const emailRegexSafe = require("email-regex-safe");

class VehicleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditable: this.props.isEditable ?? false,
            marque: this.props.isEditable ? this.props.vehicle.marque : "",
            modele: this.props.isEditable ? this.props.vehicle.modele : "",
            puissance: this.props.isEditable ? this.props.vehicle.puissance : "",
            immatriculation: this.props.isEditable ? this.props.vehicle.immatriculation : "",
            areFieldsValid: false,
        };
    }

    componentDidMount = () => {
        this.checkRequiredFields();
    }

    immatriculationSyntaxCheck = (immatriculation) => {
        const regex = /^[A-Z]{2}[-][0-9]{3}[-][A-Z]{2}$/;
        return immatriculation.match(regex);
    };

    puissanceSyntaxCheck = (puissance) => {
        const regex = /^[0-9]{1,3}$/;
        return puissance.match(regex);
    }

    checkRequiredFields() {
        let marqueValid = this.state.marque !== "";
        let modeleValid = this.state.modele !== "";
        let puissanceValid = this.state.puissance !== "" && this.puissanceSyntaxCheck(this.state.puissance);
        let immatriculationValid = this.state.immatriculation !== "" && this.immatriculationSyntaxCheck(this.state.immatriculation);

        let currentFieldsAreValid = this.state.areFieldsValid;
        let checkValidity =
            marqueValid &&
            modeleValid &&
            puissanceValid &&
            immatriculationValid;

        if ((currentFieldsAreValid && !checkValidity) || (!currentFieldsAreValid && checkValidity)) {
            this.setState({
                areFieldsValid: checkValidity
            });
        }
    }

    updateField(field, input, errorState) {
        this.setState(
            {
                [field]: input
            },
            () => this.checkRequiredFields()
        );
    }

    addVehicle = () => {
        addVehicle(
            this.state.marque,
            this.state.modele,
            this.state.puissance,
            this.state.immatriculation
        ).then((res) => {
            if (res.addVehicle.statusCode === 200) {
                const vehicle = {
                    id: res.addVehicle.id,
                    marque: this.state.marque,
                    modele: this.state.modele,
                    puissance: this.state.puissance,
                    immatriculation: this.state.immatriculation
                };
                this.props.parentCallback(vehicle);
            }
        });
    };

    modifyVehicle = () => {
        modifyVehicle(
            this.props.vehicle.id,
            this.state.marque,
            this.state.modele,
            this.state.puissance,
            this.state.immatriculation
        ).then((res) => {
            if (res.modifyVehicle.statusCode === 200) {
                const vehicle = {
                    id: this.props.vehicle.id,
                    marque: this.state.marque,
                    modele: this.state.modele,
                    puissance: this.state.puissance,
                    immatriculation: this.state.immatriculation
                };
                this.props.parentCallback(vehicle);
            }
        })
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
                        marginBottom: "3%",
                    }}
                >
                    {
                        this.props.isEditable ? (
                            <EditIcon color="primary" style={{ fontSize: 60 }} />
                        ) : (
                            <DirectionsCarIcon color="primary" style={{ fontSize: 60 }} />
                        )
                    }
                </div>
                <Grid item container direction="row" spacing={3} style={{ marginBottom: "20px" }}>
                    <Grid item xs={12} md={12} lg={6}>
                        <BriefedTextField
                            id={"vehicle-marque-field"}
                            required={true}
                            label="Marque"
                            type="text"
                            name="marque"
                            value={this.state.marque}
                            saveField={(input, errorState) =>
                                this.updateField("marque", input, errorState)
                            }
                        />
                    </Grid>
                    <Grid item xs={12} md={12} lg={6}>
                        <BriefedTextField
                            id={"vehicle-modele-field"}
                            required={true}
                            label="Modèle"
                            type="text"
                            name="modele"
                            value={this.state.modele}
                            saveField={(input, errorState) =>
                                this.updateField("modele", input, errorState)
                            }
                        />
                    </Grid>
                </Grid>
                <Grid item container direction="row" spacing={3}>
                    <Grid item xs={12} md={12} lg={6}>
                        <LiveBriefedTextField
                            id={"vehicle-puissance-field"}
                            required={true}
                            label="Puissance Fiscale (CV)"
                            type="text"
                            value={this.state.puissance}
                            helperText="La syntaxe des chevaux fiscaux n'est pas valide (exemple : 12)."
                            saveField={(input, errorState) =>
                                this.updateField("puissance", input, errorState)
                            }
                            syntaxChecker={this.puissanceSyntaxCheck}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} lg={6}>
                        <LiveBriefedTextField
                            id={"vehicle-immatriculation-field"}
                            required={true}
                            label="Immatriculation"
                            type="text"
                            value={this.state.immatriculation}
                            helperText="La syntaxe d'immatriculation n'est pas valide (exemple : AA-123-AA)."
                            saveField={(input, errorState) =>
                                this.updateField("immatriculation", input, errorState)
                            }
                            syntaxChecker={this.immatriculationSyntaxCheck}
                        />
                    </Grid>
                </Grid>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        marginRight: "1%",
                    }}
                >
                    {
                        this.props.isEditable ? (
                            <Button
                                disabled={!this.state.areFieldsValid}
                                style={{ marginTop: "50px", textAlign: "center" }}
                                variant="contained"
                                color="primary"
                                onClick={(vehicle) => this.modifyVehicle(vehicle)}
                                type="submit"
                            >
                                Modifier
                            </Button>
                        ) : (
                            <Button
                                disabled={!this.state.areFieldsValid}
                                style={{ marginTop: "50px", textAlign: "center" }}
                                variant="contained"
                                color="primary"
                                onClick={(vehicle) => this.addVehicle(vehicle)}
                                type="submit"
                            >
                                Ajouter
                            </Button>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default VehicleForm;
