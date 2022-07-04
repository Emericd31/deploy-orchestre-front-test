import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import EditIcon from '@mui/icons-material/Edit';
import BriefedTextField from "../../General/TextFields/BriefedTextField";
import { addInstrument, modifyInstrument } from "../../../GraphQL/mutations/InstrumentsMutations";
import { getInstrumentTypes } from "../../../GraphQL/queries/InstrumentTypeQueries";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

class InstrumentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditable: this.props.isEditable ?? false,
            type: this.props.isEditable ? this.props.instrument.type.type : "",
            currentTypeId: "",
            marque: this.props.isEditable ? this.props.instrument.marque : "",
            modele: this.props.isEditable ? this.props.instrument.model : "",
            serialNumber: this.props.isEditable ? this.props.instrument.serialNumber : "",
            musicalFormation: this.props.isEditable ? this.props.instrument.musicalFormation : "",
            currentMusicalFormationId: "",
            areFieldsValid: false,
            types: [],
            formations: this.props.musicalFormations
        };
    }

    componentDidMount = () => {
        getInstrumentTypes().then((res) => {
            this.setState({ types: res.instrumentTypes }, () => {
                if (this.state.isEditable) {
                    var currentTypeId = "";
                    this.state.types.map((type) => {
                        if (type.type === this.state.type) {
                            currentTypeId = type.id;
                        }
                    });
                    var currentMusicalFormationId = "";
                    this.state.formations.map((formation) => {
                        if (formation.value === this.state.musicalFormation) {
                            currentMusicalFormationId = formation.id;
                        }
                    });
                    this.setState({ currentTypeId: currentTypeId, currentMusicalFormationId: currentMusicalFormationId }, () => {
                        this.checkRequiredFields();
                    })
                }
            });
        });
    }

    checkRequiredFields() {
        let typeValid = this.state.currentTypeId !== "";
        let marqueValid = this.state.marque !== "";
        let modeleValid = this.state.modele !== "";
        let serialNumberValid = this.state.serialNumber !== "";
        let musicalFormationValid = this.state.currentMusicalFormationId !== "";

        let currentFieldsAreValid = this.state.areFieldsValid;
        let checkValidity =
            typeValid &&
            marqueValid &&
            modeleValid &&
            serialNumberValid &&
            musicalFormationValid;

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

    updateSelect(field, input) {
        this.setState({
            [field]: input,
        }, () => this.checkRequiredFields());
    }

    addInstrument = () => {
        var musicalFormation = "";
        this.state.formations.map((formation) => {
            if (formation.id === this.state.currentMusicalFormationId) {
                musicalFormation = formation.value;
            }
            return "";
        });

        var currentType = "";
        this.state.types.map((type) => {
            if (type.id === this.state.currentTypeId) {
                currentType = type.type;
            }
            return "";
        });

        addInstrument(
            this.state.marque,
            this.state.modele,
            musicalFormation,
            this.state.serialNumber,
            this.state.currentTypeId
        ).then((res) => {
            if (res.addInstrument.statusCode === 200) {
                const instrument = {
                    id: res.addInstrument.id,
                    marque: this.state.marque,
                    model: this.state.modele,
                    musicalFormation: musicalFormation,
                    serialNumber: this.state.serialNumber,
                    type: { type: currentType },
                };
                this.props.parentCallback(instrument);
            }
        });
    };

    modifyInstrument = () => {
        var musicalFormation = "";
        this.state.formations.map((formation) => {
            if (formation.id === this.state.currentMusicalFormationId) {
                musicalFormation = formation.value;
            }
            return "";
        });

        var currentType = "";
        this.state.types.map((type) => {
            if (type.id === this.state.currentTypeId) {
                currentType = type;
            }
            return "";
        });

        modifyInstrument(
            this.props.instrument.id,
            this.state.marque,
            this.state.modele,
            musicalFormation,
            this.state.serialNumber,
            this.state.currentTypeId
        ).then((res) => {
            if (res.modifyInstrument.statusCode === 200) {
                const instrument = {
                    id: this.props.instrument.id,
                    model: this.state.modele,
                    marque: this.state.marque,
                    musicalFormation: musicalFormation,
                    serialNumber: this.state.serialNumber,
                    type: currentType
                }
                this.props.parentCallback(instrument);
            }
        })
    }

    sortArray = (x, y) => {
        if (x.type < y.type) {return -1;}
        if (x.type > y.type) {return 1;}
        return 0;
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
                            <MusicNoteIcon color="primary" style={{ fontSize: 60 }} />
                        )
                    }
                </div>

                <Grid item container direction="row" spacing={3} style={{ marginBottom: "20px" }}>
                    <Grid item xs={12} md={12} lg={6}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="type_label">
                                Type
                            </InputLabel>
                            <Select
                                id="type"
                                labelId="type_label"
                                label="Type"
                                value={this.state.currentTypeId}
                                defaultValue=""
                                onChange={(event) =>
                                    this.updateSelect("currentTypeId", event.target.value)
                                }
                            >
                                {this.state.types.sort(this.sortArray).map((type) => (
                                    <MenuItem key={type.id} value={type.id}>
                                        {type.type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6}>
                        <BriefedTextField
                            id={"instrument-marque-field"}
                            required={true}
                            label="Marque"
                            type="text"
                            name="text"
                            value={this.state.marque}
                            saveField={(input, errorState) =>
                                this.updateField("marque", input, errorState)
                            }
                        />
                    </Grid>
                </Grid>

                <Grid item container direction="row" spacing={3} style={{ marginBottom: "20px" }}>
                    <Grid item xs={12} md={12} lg={6}>
                        <BriefedTextField
                            id={"instrument-modele-field"}
                            required={true}
                            label="Modèle"
                            type="text"
                            name="text"
                            value={this.state.modele}
                            saveField={(input, errorState) =>
                                this.updateField("modele", input, errorState)
                            }
                        />
                    </Grid>
                    <Grid item xs={12} md={12} lg={6}>
                        <BriefedTextField
                            id={"instrument-serial-number-field"}
                            required={true}
                            label="N° de série"
                            type="text"
                            name="text"
                            value={this.state.serialNumber}
                            saveField={(input, errorState) =>
                                this.updateField("serialNumber", input, errorState)
                            }
                        />
                    </Grid>
                </Grid>

                <Grid item container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="formation_label">
                                Formation musicale associée
                            </InputLabel>
                            <Select
                                id="formation"
                                defaultValue=""
                                labelId="formation_label"
                                label="Formation musicale associée"
                                value={this.state.currentMusicalFormationId}
                                onChange={(event) =>
                                    this.updateSelect(
                                        "currentMusicalFormationId",
                                        event.target.value
                                    )
                                }
                            >
                                {this.state.formations.map((type) => (
                                    <MenuItem key={type.id} value={type.id}>
                                        {type.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                                onClick={(instrument) => this.modifyInstrument(instrument)}
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
                                onClick={(instrument) => this.addInstrument(instrument)}
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

export default InstrumentForm;
