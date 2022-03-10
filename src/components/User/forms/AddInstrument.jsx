import React from "react";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import BriefedTextField from "../../General/TextFields/BriefedTextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { getInstrumentTypes } from "../../../GraphQL/queries/InstrumentTypeQueries";
import { addInstrument } from "../../../GraphQL/mutations/InstrumentsMutations";

class AddInstrument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areFieldsValid: false,
      currentType: "",
      currentMarque: { value: "", isValid: false },
      currentModel: { value: "", isValid: false },
      currentSerialNumber: { value: "", isValid: false },
      currentMusicalFormation: "",
      types: [],
      formations: [
        { value: 1, texte: "Harmonie" },
        { value: 2, texte: "Banda" },
      ],
    };
  }

  updateField(field, input, errorState) {
    this.setState(
      {
        [field]: {
          value: input,
          isValid: !errorState,
        },
      },
      () => this.checkFormValidity()
    );
  }

  updateSelect(field, input) {
    this.setState({
      [field]: input,
    });
  }

  checkFormValidity() {
    this.setState({
      areFieldsValid:
        this.state.currentMarque.isValid &&
        this.state.currentModel.isValid &&
        this.state.currentSerialNumber.isValid,
    });
  }

  componentDidMount() {
    getInstrumentTypes().then((res) => {
      this.setState({ types: res.instrumentTypes });
    });
  }

  addInstrument = () => {
    var musicalFormation = "";
    this.state.formations.map((formation) => {
      if (formation.value === this.state.currentMusicalFormation) {
        musicalFormation = formation.texte;
      }
      return "";
    });
    
    var currentType = "";
    this.state.types.map((type) => {
      if (type.id === this.state.currentType) {
        currentType = type.type;
      }
      return "";
    });

    addInstrument(
      this.state.currentMarque.value,
      this.state.currentModel.value,
      musicalFormation,
      this.state.currentSerialNumber.value,
      this.state.currentType
    ).then((res) => {
      if (res.addInstrument.statusCode === 200) {
        const instrument = {
          id: res.addInstrument.id,
          marque: this.state.currentMarque.value,
          model: this.state.currentModel.value,
          musicalFormation: musicalFormation,
          serialNumber: this.state.currentSerialNumber.value,
          type : {type: currentType },
        };
        this.props.parentCallback(instrument);
      }
    });
  };

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
          <MusicNoteIcon color="primary" style={{ fontSize: 60 }} />
        </div>

        <Grid
          item
          container
          direction="row"
          spacing={3}
          style={{ marginBottom: "30px" }}
        >
          <Grid item xs={12} md={12} lg={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="type_label">
                Type
              </InputLabel>
              <Select
                id="type"
                labelId="type_label"
                label="Type"
                value={this.state.currentType}
                defaultValue=""
                onChange={(event) =>
                  this.updateSelect("currentType", event.target.value)
                }
              >
                {this.state.types.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <BriefedTextField
              id={"lastname-field"}
              label="Marque"
              type="text"
              name="text"
              value=""
              saveField={(input, errorState) =>
                this.updateField("currentMarque", input, errorState)
              }
            />
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction="row"
          spacing={3}
          style={{ marginBottom: "30px" }}
        >
          <Grid item xs={12} md={12} lg={6}>
            <BriefedTextField
              id={"lastname-field"}
              label="Modèle"
              type="text"
              name="text"
              value=""
              saveField={(input, errorState) =>
                this.updateField("currentModel", input, errorState)
              }
            />
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <BriefedTextField
              id={"lastname-field"}
              label="N° de série"
              type="text"
              name="text"
              value=""
              saveField={(input, errorState) =>
                this.updateField("currentSerialNumber", input, errorState)
              }
            />
          </Grid>
        </Grid>

        <Grid item container direction="row" spacing={3}>
          <Grid item xs={12} md={12} lg={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="formation_label">
                Formation musicale associée
              </InputLabel>
              <Select
                id="formation"
                defaultValue=""
                labelId="formation_label"
                label="Formation musicale associée"
                value={this.state.currentMusicalFormation}
                onChange={(event) =>
                  this.updateSelect(
                    "currentMusicalFormation",
                    event.target.value
                  )
                }
              >
                {this.state.formations.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.texte}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} lg={6}></Grid>
        </Grid>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginRight: "1%",
          }}
        >
          <Button
            style={{ marginTop: "50px", textAlign: "center" }}
            variant="contained"
            disabled={!this.state.areFieldsValid}
            color="primary"
            onClick={() => this.addInstrument()}
          >
            Ajouter
          </Button>
        </div>
      </div>
    );
  }
}

export default AddInstrument;
